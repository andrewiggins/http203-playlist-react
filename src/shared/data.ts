import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

import data from "./data.json";

export const cohosts: PageData[string]["cohost"][] = [
	"Bramus",
	"Cassie",
	"Ada",
	"Surma",
	"Paul",
];

let transformedData: PageData | undefined;
export function getPageData(): PageData {
	if (!transformedData) {
		transformedData = transformData(data);
	}

	return transformedData;
}

function transformData(data: typeof import("./data.json")): PageData {
	const entries: Array<[string, PageData[string]]> = data.map((dataItem) => {
		const title = dataItem.snippet.title
			.replace(/ [-|] HTTP ?203( Advent)?$/, "")
			.replace(/^HTTP 203: /, "")
			.replace(/ \(S\d, Ep\d\)$/, "");

		return [
			title
				.replace(/[^a-z0-9 ]/gi, "")
				.replace(/\s+/gi, "-")
				.toLowerCase(),
			{
				id: dataItem.snippet.resourceId.videoId,
				title,
				description: DOMPurify.sanitize(
					marked.parse(dataItem.snippet.description, {
						async: false,
						gfm: true,
						breaks: true,
					}),
				),
				published: dataItem.snippet.publishedAt,
				cohost: null as any,
			},
		];
	});

	// Name, then first video ID (empty video ID means first)
	const hosts = [
		["Bramus", ""],
		["Cassie", "_iq1fPjeqMQ"],
		["Ada", "F-rZOIBGIaQ"],
		["Surma", "PYSOnC2CrD8"],
		["Paul", "k2DRz0KIZAU"],
	];

	let hostIndex = 0;
	let nextHostVideoId = hosts[hostIndex + 1][1];

	for (const [index, [title, data]] of entries.entries()) {
		if (data.id === nextHostVideoId) {
			hostIndex++;
			nextHostVideoId = hosts[hostIndex + 1]?.[1];
		}
		data.cohost = hosts[hostIndex][0] as PageData[string]["cohost"];
	}

	const processedData = Object.fromEntries(entries);
	return processedData;
}
