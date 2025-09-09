import styles from "./crypt.module.scss";
import { type ReactElement, useState } from "react";
import { Story } from "./story/story.tsx";
import { Actions } from "./action/actions.tsx";
import type { Answer, Character } from "../../../App.tsx";
import clsx from "clsx";

type Props = {
  toggleModal: (isVisible?: boolean) => void;
  answerState: Answer;
};

export const GameCrypt = ({
  answerState,
  toggleModal,
}: Props): ReactElement => {
  const [cursor, setCursor] = useState(0);

  const renderButtons = answerState.map((character, index) => {
    const isActive = index === cursor;
    return (
      <InputButton
        character={character}
        isActive={isActive}
        key={`character-${index}`}
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
};

const InputButton = ({
  character,
  isActive,
}: InputButtonProps): ReactElement => {
  const { expected, input, isRevealed } = character;

  const renderCharacter = isRevealed ? expected : input;

  return (
    <button
      className={clsx(styles.cryptInputButton, {
        [styles.cryptInputButtonActive]: isActive,
      })}
    >
      <span className={styles.cryptInputButtonText}>{renderCharacter}</span>
    </button>
  );
};
