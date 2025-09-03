import styles from "./crypt.module.scss";
import type { ReactElement } from "react";

export const GameCrypt = (): ReactElement => {
  return (
    <div className={styles.crypt}>
      <div className={styles.cryptInput}>
        <button className={styles.cryptInputButton}>
          <span className={styles.cryptInputButtonText}>b</span>
        </button>
        <button className={styles.cryptInputButton}>
          <span className={styles.cryptInputButtonText}>e</span>
        </button>
        <button className={styles.cryptInputButton}>
          <span className={styles.cryptInputButtonText}>a</span>
        </button>
        <button className={styles.cryptInputButton}>
          <span className={styles.cryptInputButtonText}>t</span>
        </button>
        <button className={styles.cryptInputButton}>
          <span className={styles.cryptInputButtonText}>r</span>
        </button>
        <button className={styles.cryptInputButton}>
          <span className={styles.cryptInputButtonText}>i</span>
        </button>
        <button className={styles.cryptInputButton}>
          <span className={styles.cryptInputButtonText}>c</span>
        </button>
        <button className={styles.cryptInputButton}>
          <span className={styles.cryptInputButtonText}>e</span>
        </button>
      </div>
    </div>
  );
};
