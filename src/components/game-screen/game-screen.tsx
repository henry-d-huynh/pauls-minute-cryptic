import type { ReactElement } from "react";
import styles from "./game-screen.module.scss";
import { Keyboard } from "../keyboard/keyboard.tsx";
import { GameScreenNav } from "./nav/nav.tsx";
import { GameClue } from "./clue/clue.tsx";
import { GameCrypt } from "./crypt/crypt.tsx";
import type { HintState } from "../../App.tsx";

type Props = {
  toggleModal: (isVisible?: boolean) => void;
  indicatorState: HintState;
  fodderState: HintState;
  definitionState: HintState;
};

export const GameScreen = ({
  toggleModal,
  indicatorState,
  fodderState,
  definitionState,
}: Props): ReactElement => {
  return (
    <div className={styles.gameScreen}>
      <div className={styles.gameScreenContainer}>
        <GameScreenNav />
        <GameClue
          indicatorState={indicatorState}
          fodderState={fodderState}
          definitionState={definitionState}
        />
        <GameCrypt toggleModal={toggleModal} />
        <Keyboard />
      </div>
    </div>
  );
};
