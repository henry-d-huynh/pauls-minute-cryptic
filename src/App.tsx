import { GameScreen } from "./components/game-screen/game-screen.tsx";
import { Modal } from "./components/modal/modal.tsx";
import { type ReactElement, useCallback, useEffect, useState } from "react";

export type HintState = "show" | "hide";

export type Character = {
  isRevealed: boolean;
  expectedLetter: string;
  input: string;
};

export type Answer = Character[];

const revealOrder = [2, 4, 6, 1, 3, 5, 7, 0];

const answer: Answer = [
  {
    expectedLetter: "b",
    isRevealed: false,
    input: "",
  },
  {
    expectedLetter: "e",
    isRevealed: false,
    input: "",
  },
  {
    expectedLetter: "a",
    isRevealed: false,
    input: "",
  },
  {
    expectedLetter: "t",
    isRevealed: false,
    input: "",
  },
  {
    expectedLetter: "r",
    isRevealed: false,
    input: "",
  },
  {
    expectedLetter: "i",
    isRevealed: false,
    input: "",
  },
  {
    expectedLetter: "c",
    isRevealed: false,
    input: "",
  },
  {
    expectedLetter: "e",
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
  const [isGameOver, setIsGameOver] = useState<boolean[]>([]);
  const [currentLetterRevealed, setCurrentLetterRevealed] = useState<
    undefined | number
  >(undefined);

  const canCheckAnswer = answerState.every(
    (character) => character.input !== "",
  );

  const checkAnswer = useCallback(() => {
    const isAnswerCorrect = answerState.every(
      (character) => character.input === character.expectedLetter,
    );
    setIsGameOver([...isGameOver, isAnswerCorrect]);
  }, [answerState, isGameOver]);

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

  const revealLetter = useCallback(() => {
    const allRevealed = answerState.every((character) => character.isRevealed);
    if (allRevealed) {
      return setIsGameOver([...isGameOver, true]);
    }

    if (currentLetterRevealed === undefined) {
      const newAnswerState = answerState.map((character, index) => {
        if (index === revealOrder[0]) {
          return {
            ...character,
            isRevealed: true,
            input: character.expectedLetter,
          };
        }
        return character;
      });

      setAnswerState(newAnswerState);
      setCurrentLetterRevealed(0);
    } else {
      const indexToReveal = currentLetterRevealed + 1;

      const newAnswerState = answerState.map((character, index) => {
        if (index === revealOrder[indexToReveal]) {
          return {
            ...character,
            isRevealed: true,
            input: character.expectedLetter,
          };
        }
        return character;
      });

      setAnswerState(newAnswerState);
      setCurrentLetterRevealed(indexToReveal);
    }
  }, [answerState, currentLetterRevealed, isGameOver]);

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
      revealLetter={revealLetter}
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
        checkAnswer={checkAnswer}
        isGameOver={isGameOver}
      />
      {renderModal}
    </main>
  );
};

export default App;
