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
        <div className={styles.modalDialogBackground}></div>
        <div className={styles.modalDialogBox}>
          <div className={styles.modalDialogBoxRenderer}>
            <div className={styles.modalDialogBoxRendererContent}>
              <div className={styles.modalDialogBoxRendererContentHeader}>
                <div
                  className={styles.modalDialogBoxRendererContentHeaderTitle}
                >
                  Select a hint
                </div>
                <div className={styles.modalDialogBoxRendererContentHeaderNav}>
                  <button
                    className={
                      styles.modalDialogBoxRendererContentHeaderNavButton
                    }
                    onClick={() => {
                      toggleModal(false);
                    }}
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      data-sentry-element="CgClose"
                      data-sentry-source-file="ModalContentRenderer.tsx"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>
                </div>
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
