import styles from "./crypt.module.scss";
import type { ReactElement } from "react";

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
    </div>
  );
};
