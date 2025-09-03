import styles from "./actions.module.scss";
import type { ReactElement } from "react";

export const Actions = (): ReactElement => {
  return (
    <div className={styles.actions}>
      <button
        className={`${styles.actionsButton} ${styles.actionsButtonYellow}`}
      >
        <p className={styles.actionsButtonText}>hints</p>
      </button>
      <button className={`${styles.actionsButton} ${styles.actionsButtonPink}`}>
        <p className={styles.actionsButtonText}>check</p>
      </button>
    </div>
  );
};
