import type { FunctionComponent } from "react";
import { useEffect } from "react";
import HeaderLayout from "shared/general/HeaderLayout";
import VideoList from "shared/general/VideoList";
import { formatDate } from "shared/utils";

import styles from "./styles.module.css";
// import "add-css:./styles.module.css";
import Embed from "./Embed";

interface Props {
	videos: PageData;
	video: PageData[string];
}

const Video: FunctionComponent<Props> = ({ video, videos }) => {
	useEffect(() => {
		document.title = `${video.title} - HTTP 203`;
	}, [video]);

	return (
		<HeaderLayout showBackIcon>
			<div className={styles.videoLayout}>
				<div className={styles.videoAndDetails}>
					<Embed video={video} key={video.id} />

					<div className={styles.videoDetails}>
						<h1 className={styles.videoTitle}>{video.title}</h1>
						<time>{formatDate(new Date(video.published))}</time>
						<div
							className={styles.description}
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{ __html: video.description }}
						/>
					</div>
				</div>
				<div className={styles.scroller}>
					<VideoList videos={videos} />
				</div>
			</div>
		</HeaderLayout>
	);
};

export default Video;
