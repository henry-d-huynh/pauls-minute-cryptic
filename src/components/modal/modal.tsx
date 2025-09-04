import styles from "./modal.module.scss";
import type { ReactElement } from "react";

export const Modal = (): ReactElement => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalOverlay}></div>
      <div className={styles.modalDialog}>
        <div></div>
        <div className={styles.modalDialogBox}>
          <div className={styles.modalDialogBoxRenderer}>
            <div className={styles.modalDialogBoxRendererContent}>
              <div className={styles.modalDialogBoxRendererContentTitle}>
                Select a hint
              </div>
              <div className={styles.modalDialogBoxRendererContentBox}>
                <div className={styles.modalDialogBoxRendererContentBoxButtons}>
                  <button
                    className={
                      styles.modalDialogBoxRendererContentBoxButtonsButton
                    }
                  >
                    show indicator
                  </button>
                  <button
                    className={
                      styles.modalDialogBoxRendererContentBoxButtonsButton
                    }
                  >
                    show fodder
                  </button>
                  <button
                    className={
                      styles.modalDialogBoxRendererContentBoxButtonsButton
                    }
                  >
                    show definition
                  </button>
                </div>
                <div className={styles.modalDialogBoxRendererContentBoxButtons}>
                  <button
                    className={
                      styles.modalDialogBoxRendererContentBoxButtonsButton
                    }
                  >
                    show letter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
