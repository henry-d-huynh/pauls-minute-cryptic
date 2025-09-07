import styles from "./modal.module.scss";
import type { ReactElement } from "react";

type Props = {
  toggleModal: (isVisible?: boolean) => void;
};

export const Modal = ({ toggleModal }: Props): ReactElement => {
  return (
    <div className={styles.modal}>
      <div
        className={styles.modalOverlay}
        onClick={() => {
          toggleModal(false);
        }}
      ></div>
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
                    <span
                      className={
                        styles.modalDialogBoxRendererContentBoxButtonsButtonWrapper
                      }
                    >
                      <span
                        className={`${styles.modalDialogBoxRendererContentBoxButtonsButtonWrapperHighlight} ${styles.highlightIndicator} ${styles.highlightScale}`}
                      ></span>
                      <span
                        className={
                          styles.modalDialogBoxRendererContentBoxButtonsButtonWrapperText
                        }
                      >
                        show indicator
                      </span>
                    </span>
                  </button>
                  <button
                    className={
                      styles.modalDialogBoxRendererContentBoxButtonsButton
                    }
                  >
                    <span
                      className={
                        styles.modalDialogBoxRendererContentBoxButtonsButtonWrapper
                      }
                    >
                      <span
                        className={`${styles.modalDialogBoxRendererContentBoxButtonsButtonWrapperHighlight} ${styles.highlightFodder} ${styles.highlightScale}`}
                      ></span>
                      <span
                        className={
                          styles.modalDialogBoxRendererContentBoxButtonsButtonWrapperText
                        }
                      >
                        show fodder
                      </span>
                    </span>
                  </button>
                  <button
                    className={
                      styles.modalDialogBoxRendererContentBoxButtonsButton
                    }
                  >
                    <span
                      className={
                        styles.modalDialogBoxRendererContentBoxButtonsButtonWrapper
                      }
                    >
                      <span
                        className={`${styles.modalDialogBoxRendererContentBoxButtonsButtonWrapperHighlight} ${styles.highlightDefinition} ${styles.highlightScale}`}
                      ></span>
                      <span
                        className={
                          styles.modalDialogBoxRendererContentBoxButtonsButtonWrapperText
                        }
                      >
                        show definition
                      </span>
                    </span>
                  </button>
                </div>
                <div className={styles.modalDialogBoxRendererContentBoxButtons}>
                  <button
                    className={
                      styles.modalDialogBoxRendererContentBoxButtonsButton
                    }
                  >
                    <span
                      className={
                        styles.modalDialogBoxRendererContentBoxButtonsButtonWrapper
                      }
                    >
                      <span
                        className={`${styles.modalDialogBoxRendererContentBoxButtonsButtonWrapperHighlight} ${styles.highlightShowLetter} ${styles.highlightScale}`}
                      ></span>
                      <span
                        className={
                          styles.modalDialogBoxRendererContentBoxButtonsButtonWrapperText
                        }
                      >
                        show letter
                      </span>
                    </span>
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
