import styles from "./clue.module.scss";
import type { ReactElement } from "react";

export const GameClue = (): ReactElement => {
  return (
    <div className={styles.clue}>
      Baby eats at The Ritz in Carlton’s East initially but nothing beats a
      childhood home (8)
    </div>
  );
};
