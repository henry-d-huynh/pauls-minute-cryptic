import styles from "./crypt.module.scss";
import type { ReactElement } from "react";
import { Story } from "./story/story.tsx";
import { Actions } from "./action/actions.tsx";

export const GameCrypt = (): ReactElement => {
  return (
    <div className={styles.crypt}>
      <div className={styles.cryptInput}>
        <button className={styles.cryptInputButton}>
          <span className={styles.cryptInputButtonText}></span>
        </button>
        <button className={styles.cryptInputButton}>
          <span className={styles.cryptInputButtonText}></span>
        </button>
        <button className={styles.cryptInputButton}>
          <span className={styles.cryptInputButtonText}></span>
        </button>
        <button className={styles.cryptInputButton}>
          <span className={styles.cryptInputButtonText}></span>
        </button>
        <button className={styles.cryptInputButton}>
          <span className={styles.cryptInputButtonText}></span>
        </button>
        <button className={styles.cryptInputButton}>
          <span className={styles.cryptInputButtonText}></span>
        </button>
        <button className={styles.cryptInputButton}>
          <span className={styles.cryptInputButtonText}></span>
        </button>
        <button className={styles.cryptInputButton}>
          <span className={styles.cryptInputButtonText}></span>
        </button>
      </div>
      <Story />
      <Actions />
    </div>
  );
};
