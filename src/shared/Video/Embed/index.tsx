import type { FunctionComponent } from "react";
import { useEffect, useState } from "react";
import { ytSrcset } from "shared/utils";

import styles from "./styles.module.css";
// import "add-css:./styles.module.css";

interface Props {
	video: (typeof import("video-data").default)[string];
}

const Embed: FunctionComponent<Props> = ({ video }) => {
	const [renderIframe, setRenderIframe] = useState<boolean>(
		!globalThis.ongoingTransition,
	);
	const [iframeReady, setIframeReady] = useState<boolean>(false);

	useEffect(() => {
		if (!globalThis.ongoingTransition) return;

		globalThis.ongoingTransition.finished
			.then(() => {
				setRenderIframe(true);
			})
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			.catch(() => {});
	}, []);

	return (
		<div className={styles.embedContainer}>
			{renderIframe && (
				<iframe
					onLoad={() => setIframeReady(true)}
					className={styles.embed}
					width="560"
					height="315"
					src={`https://www.youtube-nocookie.com/embed/${video.id}`}
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			)}
			<img
				className={styles.videoImg}
				style={{ opacity: iframeReady ? "0" : "1" }}
				srcSet={ytSrcset(video.id)}
				alt={video.title}
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				fetchpriority="high"
			/>
		</div>
	);
};

export default Embed;
