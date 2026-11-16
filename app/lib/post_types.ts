export type PostMeta = {
	title: string;
	date: string;
	summary: string;
	tags: string[];
	accent: string;
	words: number;
	minutes: number;
};

export type Section = {
	id: string;
	text: string;
	level: 2 | 3 | 4 | 5;
};
