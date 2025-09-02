import type { ReactElement } from "react";
import styles from "./game-screen.module.scss";
import { Keyboard } from "../keyboard/keyboard.tsx";

export const GameScreen = (): ReactElement => {
  return (
    <div className={styles.gameScreen}>
      <div className={styles.gameScreenContainer}>
        <Keyboard />
      </div>
    </div>
  );
};
