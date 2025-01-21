import type { FunctionComponent } from "react";
import { useEffect } from "react";
import HeaderLayout from "shared/general/HeaderLayout";
import VideoList from "shared/general/VideoList";
import CohostSwitch from "./CohostSwitch/index.tsx";

//import * as styles from './styles.module.css';

interface Props {
	videos: PageData;
	cohost?: PageData[string]["cohost"];
}

const Index: FunctionComponent<Props> = ({ videos, cohost }) => {
	let filteredVideos = videos;

	useEffect(() => {
		document.title = "HTTP 203";
	}, []);

	if (cohost) {
		filteredVideos = Object.fromEntries(
			Object.entries(videos).filter(([_, data]) => data.cohost === cohost),
		);
	}

	return (
		<HeaderLayout>
			<div>
				<CohostSwitch selectedCohost={cohost} />
				<VideoList videos={filteredVideos} />
			</div>
		</HeaderLayout>
	);
};

export default Index;
