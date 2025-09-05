import type { ReactElement } from "react";
import styles from "./game-screen.module.scss";
import { Keyboard } from "../keyboard/keyboard.tsx";
import { GameScreenNav } from "./nav/nav.tsx";
import { GameClue } from "./clue/clue.tsx";
import { GameCrypt } from "./crypt/crypt.tsx";

type Props = {
  toggleModal: (isVisible?: boolean) => void;
};

export const GameScreen = ({ toggleModal }: Props): ReactElement => {
  return (
    <div className={styles.gameScreen}>
      <div className={styles.gameScreenContainer}>
        <GameScreenNav />
        <GameClue />
        <GameCrypt toggleModal={toggleModal} />
        <Keyboard />
      </div>
    </div>
  );
};
