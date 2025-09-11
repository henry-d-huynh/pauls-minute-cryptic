import { type ReactElement, useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./input-buttons.module.scss";
import type { Answer, Character } from "../../../../App.tsx";

type Props = {
  answerState: Answer;
  cursor?: number;
  isGameOver: boolean[];
  setCursor?: (index: number) => void;
};

export const InputButtons = ({
  answerState,
  setCursor,
  cursor,
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
    <div
      className={clsx(styles.cryptInput, {
        [styles.animateShake]: animateShake,
      })}
    >
      {renderButtons}
    </div>
  );
};

type InputButtonProps = {
  character: Character;
  isActive: boolean;
  index: number;
  setCursor?: (index: number) => void;
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
    if (!isRevealed && setCursor) {
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
