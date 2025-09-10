import type { ReactElement } from "react";
import styles from "./game-screen.module.scss";
import { Keyboard } from "../keyboard/keyboard.tsx";
import { GameScreenNav } from "./nav/nav.tsx";
import { GameClue } from "./clue/clue.tsx";
import { GameCrypt } from "./crypt/crypt.tsx";
import type { Answer, HintState } from "../../App.tsx";

type Props = {
  indicatorState: HintState;
  fodderState: HintState;
  definitionState: HintState;
  answerState: Answer;
  cursor: number;
  canCheckAnswer: boolean;
  toggleModal: (isVisible?: boolean) => void;
  setCursor: (index: number) => void;
  onKeyTap: (key: string) => void;
};

export const GameScreen = ({
  toggleModal,
  indicatorState,
  fodderState,
  definitionState,
  answerState,
  cursor,
  setCursor,
  onKeyTap,
  canCheckAnswer,
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
        <GameCrypt
          toggleModal={toggleModal}
          answerState={answerState}
          cursor={cursor}
          setCursor={setCursor}
          canCheckAnswer={canCheckAnswer}
        />
        <Keyboard onKeyTap={onKeyTap} />
      </div>
    </div>
  );
};
