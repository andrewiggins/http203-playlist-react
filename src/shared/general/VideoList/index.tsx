import type { FunctionComponent } from "react";

import styles from "./styles.module.css";
// import "add-css:./styles.module.css";
import { formatDate, ytSrcset } from "shared/utils";

interface Props {
	videos: PageData;
}

const VideoList: FunctionComponent<Props> = ({ videos }: Props) => {
	return (
		<ol className={styles.videoList}>
			{Object.entries(videos).map(([slug, video]) => (
				<li key={slug}>
					<a className={styles.videoLink} href={`/videos/${slug}/`}>
						<img
							className={[styles.videoThumb, "video-thumb"].join(" ")}
							srcSet={ytSrcset(video.id)}
							alt={video.title}
						/>
						<p className={styles.videoMeta}>
							<time>{formatDate(new Date(video.published))}</time>
						</p>
					</a>
				</li>
			))}
		</ol>
	);
};

export default VideoList;
