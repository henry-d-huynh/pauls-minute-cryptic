import styles from "./crypt.module.scss";
import { type ReactElement, useEffect, useState } from "react";
import { Story } from "./story/story.tsx";
import { Actions } from "./action/actions.tsx";
import type { Answer, Character } from "../../../App.tsx";
import clsx from "clsx";

type Props = {
  answerState: Answer;
  cursor: number;
  canCheckAnswer: boolean;
  isGameOver: boolean[];
  toggleModal: (isVisible?: boolean) => void;
  setCursor: (index: number) => void;
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
}: Props): ReactElement => {
  const [animateShake, setAnimateShake] = useState<boolean>(false);

  useEffect(() => {
    if (isGameOver.length === 0) return;
    if (isGameOver[isGameOver.length - 1]) return;

    setAnimateShake(true);
    setTimeout(() => {
      setAnimateShake(false);
    }, 500);
  }, [isGameOver]);

  const renderButtons = answerState.map((character, index) => {
    const isActive = index === cursor;
    return (
      <InputButton
        character={character}
        isActive={isActive}
        key={`character-${index}`}
        index={index}
        setCursor={setCursor}
      />
    );
  });

  return (
    <div className={styles.crypt}>
      <div
        className={clsx(styles.cryptInput, {
          [styles.animateShake]: animateShake,
        })}
      >
        {renderButtons}
      </div>
      <Story />
      <Actions
        toggleModal={toggleModal}
        canCheckAnswer={canCheckAnswer}
        checkAnswer={checkAnswer}
      />
    </div>
  );
};

type InputButtonProps = {
  character: Character;
  isActive: boolean;
  index: number;
  setCursor: (index: number) => void;
};

const InputButton = ({
  character,
  isActive,
  index,
  setCursor,
}: InputButtonProps): ReactElement => {
  const { expectedLetter, input, isRevealed } = character;
  const renderCharacter = isRevealed ? expectedLetter : input;

  const handleClick = () => {
    if (!isRevealed) {
      setCursor(index);
    }
  };

  return (
    <button
      className={clsx(styles.cryptInputButton, {
        [styles.cryptInputButtonActive]: isActive,
        [styles.cryptInputButtonRevealed]: isRevealed,
      })}
      onClick={handleClick}
    >
      <span className={styles.cryptInputButtonText}>{renderCharacter}</span>
    </button>
  );
};
