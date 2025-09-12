import styles from "./modal.module.scss";
import { type ReactElement, useEffect, useState } from "react";
import clsx from "clsx";
import type { HintState } from "../../App.tsx";

type Props = {
  isModalVisible: boolean;
  toggleModal: (isVisible?: boolean) => void;
  setIndicatorState: (hintState: HintState) => void;
  setFodderState: (state: HintState) => void;
  setDefinitionState: (state: HintState) => void;
  revealLetter: () => void;
};

type ModalState = "actions" | "indicator" | "fodder" | "definition";

export const Modal = ({
  toggleModal,
  setIndicatorState,
  setFodderState,
  setDefinitionState,
  revealLetter,
  isModalVisible,
}: Props): ReactElement => {
  const [modalState, setModalState] = useState<ModalState>("actions");

  useEffect(() => {
    if (isModalVisible) return;
    setTimeout(() => {
      setModalState("actions");
    }, 600);
  }, [isModalVisible]);

  const getModalContent = () => {
    switch (modalState) {
      case "actions":
        return (
          <ModalActions
            toggleModal={toggleModal}
            setModalState={setModalState}
            setIndicatorState={setIndicatorState}
            setFodderState={setFodderState}
            setDefinitionState={setDefinitionState}
            revealLetter={revealLetter}
          />
        );
      case "indicator":
        return (
          <ModalIndicator
            toggleModal={toggleModal}
            setModalState={setModalState}
          />
        );
      case "fodder":
        return (
          <ModalFodder
            toggleModal={toggleModal}
            setModalState={setModalState}
          />
        );
      case "definition":
        return (
          <ModalDefinition
            toggleModal={toggleModal}
            setModalState={setModalState}
          />
        );
    }
  };

  const renderModalContent = getModalContent();

  return (
    <div className={styles.modal}>
      <div
        className={clsx(styles.modalOverlay, {
          [styles.modalOverlayHide]: !isModalVisible,
        })}
        onClick={() => {
          toggleModal(false);
        }}
      ></div>
      <div
        className={clsx(styles.modalDialog, {
          [styles.modalDialogHide]: !isModalVisible,
        })}
      >
        <div className={styles.modalDialogBackground}></div>
        <div className={styles.modalDialogBox}>
          <div className={styles.modalDialogBoxRenderer}>
            <div className={styles.modalDialogBoxRendererContent}>
              {renderModalContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type ActionProps = {
  toggleModal: (isVisible?: boolean) => void;
  setModalState: (modalState: ModalState) => void;
};

const ModalNavBar = ({
  toggleModal,
  setModalState,
}: ActionProps): ReactElement => {
  return (
    <div
      className={clsx(
        styles.modalDialogBoxRendererContentHeaderNav,
        styles.modalDialogBoxRendererContentHeaderNavAlt,
      )}
    >
      <button
        className={styles.modalDialogBoxRendererContentHeaderNavButton}
        onClick={() => {
          setModalState("actions");
        }}
      >
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-sentry-element="svg"
          data-sentry-component="BackIcon"
          data-sentry-source-file="BackIcon.tsx"
        >
          <path
            d="M24.2904 13.5026H2.70703M2.70703 13.5026L13.4987 24.2943M2.70703 13.5026L13.4987 2.71094"
            stroke="#1E1E1E"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            data-sentry-element="path"
            data-sentry-source-file="BackIcon.tsx"
          ></path>
        </svg>
      </button>
      <button
        className={styles.modalDialogBoxRendererContentHeaderNavButton}
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
  );
};

const ModalIndicator = ({
  toggleModal,
  setModalState,
}: ActionProps): ReactElement => {
  return (
    <>
      <div className={styles.modalDialogBoxRendererContentHeader}>
        <ModalNavBar setModalState={setModalState} toggleModal={toggleModal} />
      </div>
      <div className={styles.modalDialogBoxRendererContentBox}>
        <p className={styles.modalDialogBoxRendererContentBoxText}>
          “Initially” is our indicator! Pay attention to particular parts of the
          fodder.
        </p>
      </div>
    </>
  );
};

const ModalFodder = ({
  toggleModal,
  setModalState,
}: ActionProps): ReactElement => {
  return (
    <>
      <div className={styles.modalDialogBoxRendererContentHeader}>
        <ModalNavBar setModalState={setModalState} toggleModal={toggleModal} />
      </div>
      <div className={styles.modalDialogBoxRendererContentBox}>
        <p className={styles.modalDialogBoxRendererContentBoxText}>
          Our fodder is “Baby eats at The Ritz in Carlton’s East” we’ll need to
          use this material as directed by the indicator.
        </p>
      </div>
    </>
  );
};

const ModalDefinition = ({
  toggleModal,
  setModalState,
}: ActionProps): ReactElement => {
  return (
    <>
      <div className={styles.modalDialogBoxRendererContentHeader}>
        <ModalNavBar setModalState={setModalState} toggleModal={toggleModal} />
      </div>
      <div className={styles.modalDialogBoxRendererContentBox}>
        <p className={styles.modalDialogBoxRendererContentBoxText}>
          “Childhood home” is this clue’s definition.
        </p>
      </div>
    </>
  );
};

const ModalActions = ({
  toggleModal,
  setModalState,
  setIndicatorState,
  setFodderState,
  setDefinitionState,
  revealLetter,
}: ActionProps & {
  setIndicatorState: (hintState: HintState) => void;
  setFodderState: (state: HintState) => void;
  setDefinitionState: (state: HintState) => void;
  revealLetter: () => void;
}): ReactElement => {
  return (
    <>
      <div className={styles.modalDialogBoxRendererContentHeader}>
        <div className={styles.modalDialogBoxRendererContentHeaderTitle}>
          Select a hint
        </div>
        <div className={styles.modalDialogBoxRendererContentHeaderNav}>
          <button
            className={styles.modalDialogBoxRendererContentHeaderNavButton}
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
            className={styles.modalDialogBoxRendererContentBoxButtonsButton}
            onClick={() => {
              setModalState("indicator");
              setIndicatorState("show");
            }}
          >
            <span
              className={
                styles.modalDialogBoxRendererContentBoxButtonsButtonWrapper
              }
            >
              <span
                className={clsx(
                  styles.modalDialogBoxRendererContentBoxButtonsButtonWrapperHighlight,
                  styles.highlightIndicator,
                  styles.highlightScale,
                )}
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
            className={styles.modalDialogBoxRendererContentBoxButtonsButton}
            onClick={() => {
              setModalState("fodder");
              setFodderState("show");
            }}
          >
            <span
              className={
                styles.modalDialogBoxRendererContentBoxButtonsButtonWrapper
              }
            >
              <span
                className={clsx(
                  styles.modalDialogBoxRendererContentBoxButtonsButtonWrapperHighlight,
                  styles.highlightFodder,
                  styles.highlightScale,
                )}
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
            className={styles.modalDialogBoxRendererContentBoxButtonsButton}
            onClick={() => {
              setModalState("definition");
              setDefinitionState("show");
            }}
          >
            <span
              className={
                styles.modalDialogBoxRendererContentBoxButtonsButtonWrapper
              }
            >
              <span
                className={clsx(
                  styles.modalDialogBoxRendererContentBoxButtonsButtonWrapperHighlight,
                  styles.highlightDefinition,
                  styles.highlightScale,
                )}
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
            className={styles.modalDialogBoxRendererContentBoxButtonsButton}
            onClick={revealLetter}
          >
            <span
              className={
                styles.modalDialogBoxRendererContentBoxButtonsButtonWrapper
              }
            >
              <span
                className={clsx(
                  styles.modalDialogBoxRendererContentBoxButtonsButtonWrapperHighlight,
                  styles.highlightShowLetter,
                  styles.highlightScale,
                )}
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
    </>
  );
};
