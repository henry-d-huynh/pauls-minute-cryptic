import styles from "./actions.module.scss";
import type { ReactElement } from "react";
import clsx from "clsx";

type Props = {
  canCheckAnswer: boolean;
  toggleModal: (isVisible?: boolean) => void;
};

export const Actions = ({
  toggleModal,
  canCheckAnswer,
}: Props): ReactElement => {
  return (
    <div className={styles.actions}>
      <button
        className={clsx(styles.actionsButton, styles.actionsButtonYellow)}
        onClick={() => {
          toggleModal(true);
        }}
      >
        <p className={styles.actionsButtonText}>hints</p>
      </button>
      <button
        className={clsx(styles.actionsButton, styles.actionsButtonPink)}
        disabled={!canCheckAnswer}
        onClick={() => {
          console.log("clicked");
        }}
      >
        <p className={styles.actionsButtonText}>check</p>
      </button>
    </div>
  );
};
