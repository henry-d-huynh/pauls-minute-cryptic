import styles from "./crypt.module.scss";
import { type ReactElement } from "react";
import { Story } from "./story/story.tsx";
import { Actions } from "./action/actions.tsx";
import type { Answer, Character } from "../../../App.tsx";
import clsx from "clsx";

type Props = {
  toggleModal: (isVisible?: boolean) => void;
  answerState: Answer;
  cursor: number;
  setCursor: (index: number) => void;
};

export const GameCrypt = ({
  answerState,
  toggleModal,
  setCursor,
  cursor,
}: Props): ReactElement => {
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
      <div className={styles.cryptInput}>{renderButtons}</div>
      <Story />
      <Actions toggleModal={toggleModal} />
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
  const { expected, input, isRevealed } = character;
  const renderCharacter = isRevealed ? expected : input;

  const handleClick = () => {
    setCursor(index);
  };

  return (
    <button
      className={clsx(styles.cryptInputButton, {
        [styles.cryptInputButtonActive]: isActive,
      })}
      onClick={handleClick}
    >
      <span className={styles.cryptInputButtonText}>{renderCharacter}</span>
    </button>
  );
};
