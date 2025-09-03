import type { ReactElement } from "react";
import styles from "./story.module.scss";

export const Story = (): ReactElement => {
  return (
    <div className={styles.story}>
      <div className={styles.storyContainer}>
        <div className={styles.storyContainerPoint}>
          <div className={styles.storyContainerPointCircle}></div>
        </div>
        <div className={styles.storyContainerPoint}>
          <div
            className={`${styles.storyContainerPointCircle} ${styles.storyContainerPointCircleBorder}`}
          ></div>
          <div className={styles.storyContainerPointPar}>par</div>
        </div>
        <div className={styles.storyContainerPoint}>
          <div className={styles.storyContainerPointCircle}></div>
        </div>
        <div className={styles.storyContainerPoint}>
          <div className={styles.storyContainerPointCircle}></div>
        </div>
        <div className={styles.storyContainerPoint}>
          <div className={styles.storyContainerPointCircle}></div>
        </div>
        <div className={styles.storyContainerPoint}>
          <div className={styles.storyContainerPointCircle}></div>
        </div>
        <div className={styles.storyContainerPoint}>
          <div className={styles.storyContainerPointCircle}></div>
        </div>
        <div className={styles.storyContainerPoint}>
          <div className={styles.storyContainerPointCircle}></div>
        </div>
        <div className={styles.storyContainerPoint}>
          <div className={styles.storyContainerPointCircle}></div>
        </div>
        <div className={styles.storyContainerPoint}>
          <div className={styles.storyContainerPointCircle}></div>
        </div>
        <div className={styles.storyContainerPoint}>
          <div className={styles.storyContainerPointCircle}></div>
        </div>
      </div>
    </div>
  );
};
