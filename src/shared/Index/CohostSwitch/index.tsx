import type { FunctionComponent } from "react";
import { cohosts } from "shared/data";

import styles from "./styles.module.css";
import { cohostPath, homePath } from "../../routes";
// import "add-css:./styles.module.css";

interface Props {
	selectedCohost?: (typeof cohosts)[number];
}

const CohostSwitch: FunctionComponent<Props> = ({ selectedCohost }) => {
	return (
		<div className={styles.cohostSwitchWrapper}>
			<ol className={[styles.cohostSwitch, "cohost-switch"].join(" ")}>
				<li className={selectedCohost ? "" : styles.currentCohost}>
					<a href={homePath()}>All</a>
				</li>
				{cohosts.map((cohost) => (
					<li
						key={cohost}
						className={selectedCohost === cohost ? styles.currentCohost : ""}
					>
						<a href={cohostPath(cohost)}>{cohost}</a>
					</li>
				))}
			</ol>
		</div>
	);
};

export default CohostSwitch;
