import styles from "./crypt.module.scss";
import { type ReactElement } from "react";
import { Story } from "./story/story.tsx";
import { Actions } from "./action/actions.tsx";
import type { Answer, StoryPoint } from "../../../App.tsx";
import { InputButtons } from "./input-buttons/input-buttons.tsx";

type Props = {
  answerState: Answer;
  cursor?: number;
  canCheckAnswer: boolean;
  isGameOver: boolean[];
  storyPointState: StoryPoint[];
  toggleModal: (isVisible?: boolean) => void;
  setCursor?: (index: number) => void;
  checkAnswer: () => void;
};

export const GameCrypt = ({
  answerState,
  toggleModal,
  setCursor,
  cursor,
  canCheckAnswer,
  checkAnswer,
  isGameOver,
  storyPointState,
}: Props): ReactElement => {
  return (
    <div className={styles.crypt}>
      <InputButtons
        answerState={answerState}
        isGameOver={isGameOver}
        cursor={cursor}
        setCursor={setCursor}
      />
      <Story storyPointState={storyPointState} />
      <Actions
        toggleModal={toggleModal}
        canCheckAnswer={canCheckAnswer}
        checkAnswer={checkAnswer}
      />
    </div>
  );
};
