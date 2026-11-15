import type { LucideIcon } from "lucide-react";
import {
	CodeXml,
	GitFork,
	Mail,
	MessageCircle,
	MessageSquareCode,
	Video,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
	code: GitFork,
	github: CodeXml,
	mastodon: MessageCircle,
	matrix: MessageSquareCode,
	twitch: Video,
	mail: Mail,
};

export function socialIcon(name: string): LucideIcon {
	return ICONS[name] ?? CodeXml;
}
