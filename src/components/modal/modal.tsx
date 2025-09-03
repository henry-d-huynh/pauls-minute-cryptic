import styles from "./modal.module.scss";
import type { ReactElement } from "react";

export const Modal = (): ReactElement => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalOverlay}></div>
      <div className={styles.modalDialog}>
        <div></div>
        <div>
          <div>Select a hint</div>
        </div>
      </div>
    </div>
  );
};
