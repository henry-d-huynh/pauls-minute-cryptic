import { GameScreen } from "./components/game-screen/game-screen.tsx";
import { Modal } from "./components/modal/modal.tsx";
import { type ReactElement, useCallback, useEffect, useState } from "react";

export type HintState = "show" | "hide";

export type Character = {
  isRevealed: boolean;
  expected: string;
  input: string;
};

export type Answer = Character[];

const answer: Answer = [
  {
    expected: "b",
    isRevealed: false,
    input: "",
  },
  {
    expected: "e",
    isRevealed: false,
    input: "",
  },
  {
    expected: "a",
    isRevealed: false,
    input: "",
  },
  {
    expected: "t",
    isRevealed: false,
    input: "",
  },
  {
    expected: "r",
    isRevealed: false,
    input: "",
  },
  {
    expected: "i",
    isRevealed: false,
    input: "",
  },
  {
    expected: "c",
    isRevealed: false,
    input: "",
  },
  {
    expected: "e",
    isRevealed: false,
    input: "",
  },
];

const App = (): ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [indicatorState, setIndicatorState] = useState<HintState>("hide");
  const [fodderState, setFodderState] = useState<HintState>("hide");
  const [definitionState, setDefinitionState] = useState<HintState>("hide");
  const [answerState, setAnswerState] = useState(answer);
  const [cursor, setCursor] = useState(0);

  const canCheckAnswer = answerState.every(
    (character) => character.input !== "",
  );

  const moveCursor = useCallback(
    (direction: "back" | "forward") => {
      switch (direction) {
        case "forward":
          if (cursor < answerState.length - 1) {
            setCursor(cursor + 1);
          }
          break;
        case "back":
          if (cursor > 0) {
            setCursor(cursor - 1);
          }
          break;
      }
    },
    [answerState.length, cursor],
  );

  const inputCharacterKey = useCallback(
    (key: string) => {
      const newAnswerState = answerState.map((character, index) => {
        if (cursor === index) {
          moveCursor("forward");
          return {
            ...character,
            input: key.toLowerCase(),
          };
        }

        return character;
      });

      setAnswerState(newAnswerState);
    },
    [answerState, cursor, moveCursor],
  );

  const clearCharacter = useCallback(
    (characterIndex: number) => {
      return answerState.map((character, index) => {
        if (characterIndex === index) {
          return {
            ...character,
            input: "",
          };
        }
        return character;
      });
    },
    [answerState],
  );

  const deleteInput = useCallback(() => {
    const cursorIsEmpty = answerState[cursor].input === "";
    if (!cursorIsEmpty) {
      const newAnswerState = clearCharacter(cursor);
      return setAnswerState(newAnswerState);
    }

    const newAnswerState = clearCharacter(cursor - 1);
    moveCursor("back");
    return setAnswerState(newAnswerState);
  }, [answerState, clearCharacter, cursor, moveCursor]);

  const setCharacter = useCallback(
    (key: string) => {
      if (/^[a-zA-Z]$/.test(key)) {
        inputCharacterKey(key);
      }

      if (key === "Backspace") {
        deleteInput();
      }
    },
    [deleteInput, inputCharacterKey],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setCharacter(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setCharacter]);

  const toggleModal = (isVisible?: boolean) => {
    setIsModalVisible(isVisible || !isModalVisible);
  };

  const onKeyTap = (key: string) => {
    setCharacter(key);
  };

  const renderModal = isModalVisible ? (
    <Modal
      toggleModal={toggleModal}
      setIndicatorState={setIndicatorState}
      setFodderState={setFodderState}
      setDefinitionState={setDefinitionState}
    />
  ) : (
    <></>
  );

  return (
    <main>
      <GameScreen
        toggleModal={toggleModal}
        indicatorState={indicatorState}
        fodderState={fodderState}
        definitionState={definitionState}
        answerState={answerState}
        cursor={cursor}
        setCursor={setCursor}
        onKeyTap={onKeyTap}
        canCheckAnswer={canCheckAnswer}
      />
      {renderModal}
    </main>
  );
};

export default App;
