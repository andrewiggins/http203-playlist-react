import type { FunctionComponent } from "react";
import { useState, useMemo, useCallback, startTransition } from "react";
import Index from "shared/Index/index.tsx";
import { cohosts } from "shared/data";
import Video from "shared/Video/index.tsx";
import { useRouter } from "./router";
import { homePath, isCohostPath, isVideoPath } from "shared/routes";

interface Props {
	videos: PageData;
}

function getCohostFromURL(path = location.pathname) {
	if (!isCohostPath(path)) return undefined;
	const cohost = /\/with-([^/]+)/.exec(path);
	if (!cohost) return undefined;
	return cohosts.find((name) => name.toLowerCase() === cohost[1]);
}

const App: FunctionComponent<Props> = ({ videos }) => {
	const getVideoFromURL = useCallback(
		(path = location.pathname): (typeof videos)[string] | undefined => {
			const videoPrefix = "/videos/";
			let video: undefined | (typeof videos)[string];

			if (isVideoPath(path)) {
				const startIndex = path.indexOf(videoPrefix) + videoPrefix.length;
				const slug = path.slice(startIndex, -1);
				video = videos[slug];
			}

			return video;
		},
		[videos],
	);

	const setStateFromURL = useCallback(
		(path = homePath()) => {
			startTransition(() => {
				setVideo(getVideoFromURL(path));
				setCohost(getCohostFromURL(path));
			});
		},
		[getVideoFromURL],
	);

	useRouter(setStateFromURL);

	const initialVideo = useMemo(() => getVideoFromURL(), [getVideoFromURL]);
	const initialCohost = useMemo(() => getCohostFromURL(), []);

	const [video, setVideo] = useState<undefined | PageData[string]>(
		initialVideo,
	);

	const [cohost, setCohost] = useState<
		undefined | (typeof import("shared/data").cohosts)[number]
	>(initialCohost);

	if (video) {
		return <Video video={video} videos={videos} />;
	}

	return <Index videos={videos} cohost={cohost} />;
};

export default App;
