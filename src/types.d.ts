interface PageData {
	[slug: string]: {
		id: string;
		title: string;
		description: string;
		published: string;
		cohost: "Bramus" | "Cassie" | "Ada" | "Surma" | "Paul";
	};
}

declare module "video-data" {
	const data: PageData;
	export default data;
}

declare var ongoingTransition: ViewTransition | undefined;
