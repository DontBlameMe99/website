#!/usr/bin/env python3
"""Require two embedded images in the description of a code-changing PR."""

import os
import re
import sys
from pathlib import Path

CODE_SUFFIXES = {
    ".c", ".cc", ".cpp", ".cs", ".css", ".go", ".h", ".hpp", ".html",
    ".java", ".js", ".jsx", ".kt", ".lua", ".nix", ".php", ".py", ".rb",
    ".rs", ".scala", ".sh", ".sql", ".svelte", ".swift", ".ts", ".tsx",
    ".vue", ".yaml", ".yml", ".zig",
}
CODE_NAMES = {"Dockerfile", "Justfile", "Makefile"}

HTML_COMMENT = re.compile(r"<!--.*?-->", re.DOTALL)
CODE_SPAN = re.compile(r"(`+)(?!`).*?(?<!`)\1(?!`)", re.DOTALL)
FENCE = re.compile(r"(`{3,}|~{3,})(.*)")
BLOCKQUOTE = re.compile(r"^\s*(?:>\s?)+")
LIST_ITEM = re.compile(r"^( *)(?:[-*+]|\d+[.)])\s+")
MARKDOWN_IMAGE = re.compile(
    r"""!\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+(?:"[^"]*"|'[^']*'|\([^)]*\)))?\s*\)"""
)
HTML_IMAGE = re.compile(
    r"<img\b[^>]*?(?<![\w-])src\s*=\s*(?:\"([^\"]+)\"|'([^']+)|([^\s>]+))",
    re.IGNORECASE,
)
REFERENCE_IMAGE = re.compile(r"!\[([^\]]*)\]\[([^\]]*)\]")
SHORTCUT_IMAGE = re.compile(r"!\[([^\]]+)\](?![ \t]*\()(?![ \t]*\[)")
LINK_DEFINITION = re.compile(
    r"^\s{0,3}\[([^\]]+)\]:\s*(?:<([^>]+)>|(\S+))",
    re.MULTILINE,
)


def visible_lines(body):
    """Drop comments and code that GitHub does not render as images."""
    body = HTML_COMMENT.sub("", body)
    fence = None
    paragraph = False
    list_indent = None
    kept = []
    for line in body.splitlines():
        content = BLOCKQUOTE.sub("", line)
        marker = FENCE.match(content.lstrip())
        if fence is None:
            if marker:
                fence = marker.group(1)
                paragraph = False
                list_indent = None
                continue
            item = LIST_ITEM.match(content)
            if item:
                list_indent = len(item.group(0))
                paragraph = True
                kept.append(line)
                continue
            if not content.strip():
                paragraph = False
                list_indent = None
                kept.append(line)
                continue
            indent = 4 if content.startswith("\t") else len(content) - len(content.lstrip(" "))
            if list_indent is not None and indent >= list_indent + 4:
                continue
            if indent >= 4 and not paragraph and list_indent is None:
                continue
            kept.append(line)
            paragraph = True
            continue
        if (
            marker
            and marker.group(1)[0] == fence[0]
            and len(marker.group(1)) >= len(fence)
            and not marker.group(2).strip()
        ):
            fence = None
    return CODE_SPAN.sub("", "\n".join(kept))


def normalized_label(label):
    return " ".join(label.strip().lower().split())


def embedded_images(body):
    body = visible_lines(body)
    sources = []
    for pattern in (MARKDOWN_IMAGE, HTML_IMAGE):
        for match in pattern.finditer(body):
            source = next((group for group in match.groups() if group), "").strip()
            if source and source not in sources:
                sources.append(source)

    definitions = {}
    for match in LINK_DEFINITION.finditer(body):
        source = next((group for group in match.groups()[1:] if group), "").strip()
        if source:
            label = normalized_label(match.group(1))
            if label not in definitions:
                definitions[label] = source

    labels = []
    for match in REFERENCE_IMAGE.finditer(body):
        labels.append(match.group(2) or match.group(1))
    for match in SHORTCUT_IMAGE.finditer(body):
        labels.append(match.group(1))
    for label in labels:
        source = definitions.get(normalized_label(label))
        if source and source not in sources:
            sources.append(source)
    return sources


def changed_code_files(path):
    files = [line.strip() for line in Path(path).read_text(encoding="utf-8").splitlines()]
    files = [name for name in files if name]
    return [name for name in files if Path(name).suffix.lower() in CODE_SUFFIXES or Path(name).name in CODE_NAMES]


def main():
    if len(sys.argv) != 2:
        print("usage: check_pr_screenshots.py <changed-files.txt>", file=sys.stderr)
        return 2

    code_files = changed_code_files(sys.argv[1])
    if not code_files:
        print("No source files changed; screenshot check skipped.")
        return 0

    images = embedded_images(os.environ.get("PR_BODY", ""))
    if len(images) >= 2:
        print(f"Found {len(images)} embedded images in the PR description.")
        return 0

    print("::error::Code-changing PR needs two embedded images in the PR description.")
    print(f"Found {len(images)}. Embed a Before screenshot and an After screenshot.")
    print("Source files changed:")
    for name in code_files:
        print(f"  {name}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
