import styles from "./actions.module.scss";
import type { ReactElement } from "react";

type Props = {
  toggleModal: (isVisible?: boolean) => void;
};

export const Actions = ({ toggleModal }: Props): ReactElement => {
  return (
    <div className={styles.actions}>
      <button
        className={`${styles.actionsButton} ${styles.actionsButtonYellow}`}
        onClick={() => {
          toggleModal(true);
        }}
      >
        <p className={styles.actionsButtonText}>hints</p>
      </button>
      <button className={`${styles.actionsButton} ${styles.actionsButtonPink}`}>
        <p className={styles.actionsButtonText}>check</p>
      </button>
    </div>
  );
};
