export type PostMeta = {
	title: string;
	date: string;
	tags: string[];
	minutes: number;
};

export type Section = {
	id: string;
	text: string;
	level: 2 | 3 | 4 | 5;
};
