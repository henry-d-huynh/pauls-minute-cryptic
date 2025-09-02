import styles from "./clue.module.scss";
import type { ReactElement } from "react";

export const GameClue = (): ReactElement => {
  return (
    <div className={styles.clue}>
      Baby Eats At The Ritz In Carlton’s East Initially but nothing beats a
      childhood home (8)
    </div>
  );
};
