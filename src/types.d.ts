declare module "video-data" {
	interface PageData {
		[slug: string]: {
			id: string;
			title: string;
			description: string;
			published: string;
			cohost: "Bramus" | "Cassie" | "Ada" | "Surma" | "Paul";
		};
	}
	const data: PageData;
	export default data;
}

declare var ongoingTransition: ViewTransition | undefined;
