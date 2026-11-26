#!/usr/bin/env python3
"""Focused tests for the PR screenshot check."""

import contextlib
import io
import os
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parent))

import check_pr_screenshots as checker


class EmbeddedImagesTests(unittest.TestCase):
    def test_inline_images(self):
        body = "Before: ![before](before.png)\nAfter: ![after](after.png)\n"
        self.assertEqual(checker.embedded_images(body), ["before.png", "after.png"])

    def test_markdown_titles_and_angle_sources(self):
        body = (
            '![before](<before image.png> "Before")\n'
            "![after](/tmp/after.png 'After')\n"
        )
        self.assertEqual(
            checker.embedded_images(body), ["before image.png", "/tmp/after.png"]
        )

    def test_html_images(self):
        body = '<img src="before.png">\n<IMG ALT="after" SRC=after.png>\n'
        self.assertEqual(checker.embedded_images(body), ["before.png", "after.png"])

    def test_reference_images(self):
        body = (
            "![before][Before Ref]\n"
            "![after][]\n\n"
            "[Before Ref]: <before.png>\n"
            "[after]: after.png\n"
        )
        self.assertEqual(checker.embedded_images(body), ["before.png", "after.png"])

    def test_shortcut_images(self):
        body = "![before]\n\n[before]: before.png\n"
        self.assertEqual(checker.embedded_images(body), ["before.png"])

    def test_duplicate_sources_count_once(self):
        body = '![a](same.png)\n<img src="same.png">\n'
        self.assertEqual(checker.embedded_images(body), ["same.png"])

    def test_html_comments_are_ignored(self):
        body = "<!-- ![a](a.png)\n![b](b.png) -->\n![c](c.png)\n"
        self.assertEqual(checker.embedded_images(body), ["c.png"])

    def test_inline_code_spans_are_ignored(self):
        body = "`![a](a.png)`\n![b](b.png)\n![c](c.png)\n"
        self.assertEqual(checker.embedded_images(body), ["b.png", "c.png"])

    def test_fenced_code_is_ignored(self):
        for fence in ("```", "~~~"):
            with self.subTest(fence=fence):
                body = f"{fence}\n![a](a.png)\n![b](b.png)\n{fence}\n![c](c.png)\n"
                self.assertEqual(checker.embedded_images(body), ["c.png"])

    def test_indented_code_is_ignored(self):
        body = "    ![a](a.png)\n    ![b](b.png)\n![c](c.png)\n"
        self.assertEqual(checker.embedded_images(body), ["c.png"])

    def test_blockquote_images_remain_visible(self):
        body = "> ![a](a.png)\n> ![b](b.png)\n![c](c.png)\n"
        self.assertEqual(
            checker.embedded_images(body), ["a.png", "b.png", "c.png"]
        )


class MainTests(unittest.TestCase):
    def run_check(self, changed, body=""):
        with tempfile.TemporaryDirectory() as tmp:
            changed_file = Path(tmp) / "changed-files.txt"
            changed_file.write_text("\n".join(changed) + "\n", encoding="utf-8")
            stdout, stderr = io.StringIO(), io.StringIO()
            with (
                patch.object(
                    sys, "argv", ["check_pr_screenshots.py", str(changed_file)]
                ),
                patch.dict(os.environ, {"PR_BODY": body}, clear=True),
                contextlib.redirect_stdout(stdout),
                contextlib.redirect_stderr(stderr),
            ):
                code = checker.main()
        return code, stdout.getvalue(), stderr.getvalue()

    def test_two_images_pass(self):
        body = "![before](before.png)\n![after](after.png)\n"
        code, stdout, stderr = self.run_check(["app/a.ts"], body)
        self.assertEqual(code, 0)
        self.assertEqual(stdout, "Found 2 embedded images in the PR description.\n")
        self.assertEqual(stderr, "")

    def test_missing_images_fail_with_exact_output(self):
        code, stdout, stderr = self.run_check(["app/a.ts", "app/b.ts"], "![a](a.png)\n")
        self.assertEqual(code, 1)
        self.assertEqual(
            stdout,
            "::error::Code-changing PR needs two embedded images in the PR description.\n"
            "Found 1. Embed a Before screenshot and an After screenshot.\n"
            "Source files changed:\n"
            "  app/a.ts\n"
            "  app/b.ts\n",
        )
        self.assertEqual(stderr, "")

    def test_deleted_code_file_requires_images(self):
        code, stdout, _ = self.run_check(["deleted/app/old.ts"])
        self.assertEqual(code, 1)
        self.assertIn("  deleted/app/old.ts\n", stdout)

    def test_docs_only_change_skips(self):
        code, stdout, stderr = self.run_check(
            ["README.md", "docs/guide.txt"],
            "![before](before.png)\n![after](after.png)\n",
        )
        self.assertEqual(code, 0)
        self.assertEqual(stdout, "No source files changed; screenshot check skipped.\n")
        self.assertEqual(stderr, "")

    def test_wrong_arg_count_returns_two(self):
        for argv in (["check_pr_screenshots.py"], ["check_pr_screenshots.py", "a", "b"]):
            with self.subTest(argv=argv):
                stdout, stderr = io.StringIO(), io.StringIO()
                with (
                    patch.object(sys, "argv", argv),
                    contextlib.redirect_stdout(stdout),
                    contextlib.redirect_stderr(stderr),
                ):
                    code = checker.main()
                self.assertEqual(code, 2)
                self.assertEqual(stdout.getvalue(), "")
                self.assertEqual(
                    stderr.getvalue(),
                    "usage: check_pr_screenshots.py <changed-files.txt>\n",
                )


if __name__ == "__main__":
    unittest.main()
