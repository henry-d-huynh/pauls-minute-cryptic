import styles from "./crypt.module.scss";
import type { ReactElement } from "react";
import { Story } from "./story/story.tsx";
import { Actions } from "./action/actions.tsx";

type Props = {
  toggleModal: (isVisible?: boolean) => void;
};

export const GameCrypt = ({ toggleModal }: Props): ReactElement => {
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
      <Story />
      <Actions toggleModal={toggleModal} />
    </div>
  );
};
