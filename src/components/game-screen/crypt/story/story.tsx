import type { ReactElement } from "react";
import styles from "./story.module.scss";
import clsx from "clsx";
import type { StoryPoint } from "../../../../App.tsx";

type Props = {
  storyPointState: StoryPoint[];
};

export const Story = ({ storyPointState }: Props): ReactElement => {
  const renderStoryPoints = storyPointState.map((storyPoint, index) => {
    const renderPar = storyPoint.par ? (
      <div className={styles.storyContainerPointPar}>par</div>
    ) : (
      <></>
    );

    return (
      <div className={styles.storyContainerPoint} key={`story-point-${index}`}>
        <div
          className={clsx(styles.storyContainerPointCircle, {
            [styles.storyContainerPointCircleBorder]: storyPoint.par,
            [styles.storyContainerPointCircleHinted]:
              storyPoint.state === "hinted",
            [styles.storyContainerPointCircleRevealed]:
              storyPoint.state === "revealed",
          })}
        ></div>
        {renderPar}
      </div>
    );
  });

  return (
    <div className={styles.story}>
      <div className={styles.storyContainer}>{renderStoryPoints}</div>
    </div>
  );
};
