import { GameScreen } from "./components/game-screen/game-screen.tsx";
import { Modal } from "./components/modal/modal.tsx";
import { type ReactElement, useCallback, useEffect, useState } from "react";
import { GameOverScreen } from "./components/game-over-screen/game-over-screen.tsx";
import { StartScreen } from "./components/start-screen/start-screen.tsx";

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

export type StoryPoint = {
  par: boolean;
  state: "initial" | "revealed" | "hinted";
};

const initialStoryPoints: StoryPoint[] = [
  {
    par: false,
    state: "initial",
  },
  {
    par: true,
    state: "initial",
  },
  {
    par: false,
    state: "initial",
  },
  {
    par: false,
    state: "initial",
  },
  {
    par: false,
    state: "initial",
  },
  {
    par: false,
    state: "initial",
  },
  {
    par: false,
    state: "initial",
  },
  {
    par: false,
    state: "initial",
  },
  {
    par: false,
    state: "initial",
  },
  {
    par: false,
    state: "initial",
  },
  {
    par: false,
    state: "initial",
  },
];

export type AppState = "start" | "play" | "over";

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
  const [storyPointState, setStoryPointState] = useState(initialStoryPoints);
  const [appState, setAppState] = useState<AppState>("start");

  const canCheckAnswer = answerState.every(
    (character) => character.input !== "" || character.isRevealed,
  );

  const setStoryPoint = useCallback(
    (state: "revealed" | "hinted") => {
      const storyPointStateClone = structuredClone(storyPointState);

      for (let index = 0; index < storyPointStateClone.length; index++) {
        if (storyPointStateClone[index].state === "initial") {
          storyPointStateClone[index].state = state;
          break;
        }
      }

      setStoryPointState(storyPointStateClone);
    },
    [storyPointState],
  );

  const checkAnswer = useCallback(() => {
    const isAnswerCorrect = answerState.every(
      (character) =>
        character.input === character.expectedLetter || character.isRevealed,
    );
    setIsGameOver([...isGameOver, isAnswerCorrect]);
    if (isAnswerCorrect) {
      setAppState("over");
    }
  }, [answerState, isGameOver]);

  const getNextEditableCursorPosition = useCallback(() => {
    for (
      let targetPosition = cursor + 1;
      targetPosition < answerState.length;
      targetPosition++
    ) {
      if (!answerState[targetPosition].isRevealed) {
        return targetPosition;
      }
    }
    return cursor;
  }, [answerState, cursor]);

  const getPreviousEditableCursorPosition = useCallback(() => {
    for (
      let targetPosition = cursor - 1;
      targetPosition >= 0;
      targetPosition--
    ) {
      if (!answerState[targetPosition].isRevealed) {
        return targetPosition;
      }
    }
    return cursor;
  }, [answerState, cursor]);

  const moveCursor = useCallback(
    (direction: "back" | "forward") => {
      switch (direction) {
        case "forward": {
          const targetPosition = getNextEditableCursorPosition();
          setCursor(targetPosition);
          break;
        }
        case "back": {
          const targetPosition = getPreviousEditableCursorPosition();
          setCursor(targetPosition);
          break;
        }
      }
    },
    [getNextEditableCursorPosition, getPreviousEditableCursorPosition],
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

    const targetPosition = getPreviousEditableCursorPosition();
    const newAnswerState = clearCharacter(targetPosition);
    moveCursor("back");
    return setAnswerState(newAnswerState);
  }, [
    answerState,
    clearCharacter,
    cursor,
    getPreviousEditableCursorPosition,
    moveCursor,
  ]);

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

    const noLettersRevealed = currentLetterRevealed === undefined;
    const indexToReveal = noLettersRevealed ? 0 : currentLetterRevealed + 1;

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

    const cursorOnReveal = revealOrder[indexToReveal] === cursor;

    if (cursorOnReveal) {
      const initialTargetPosition = getNextEditableCursorPosition();
      const noNewNextPosition = initialTargetPosition === cursor;
      const finalTargetPosition = noNewNextPosition
        ? getPreviousEditableCursorPosition()
        : initialTargetPosition;

      setCursor(finalTargetPosition);
    }

    setStoryPoint("revealed");
    setAnswerState(newAnswerState);
    setCurrentLetterRevealed(indexToReveal);
  }, [
    answerState,
    currentLetterRevealed,
    cursor,
    getNextEditableCursorPosition,
    getPreviousEditableCursorPosition,
    isGameOver,
    setStoryPoint,
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isGameOver[isGameOver.length - 1]) return;
      setCharacter(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setCharacter, isGameOver]);

  const toggleModal = (isVisible?: boolean) => {
    setIsModalVisible(isVisible || !isModalVisible);
  };

  const onKeyTap = (key: string) => {
    setCharacter(key);
  };

  const handleSetIndicatorState = (state: HintState) => {
    setIndicatorState(state);
    setStoryPoint("hinted");
  };

  const handleSetFodderState = (state: HintState) => {
    setFodderState(state);
    setStoryPoint("hinted");
  };

  const handleSetDefinitionState = (state: HintState) => {
    setDefinitionState(state);
    setStoryPoint("hinted");
  };

  const startScreen = <StartScreen setAppState={setAppState} />;

  const gameScreen = (
    <>
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
        storyPointState={storyPointState}
        setAppState={setAppState}
      />
      <Modal
        toggleModal={toggleModal}
        setIndicatorState={handleSetIndicatorState}
        setFodderState={handleSetFodderState}
        setDefinitionState={handleSetDefinitionState}
        revealLetter={revealLetter}
        isModalVisible={isModalVisible}
      />
    </>
  );

  const gameOverScreen = (
    <GameOverScreen
      indicatorState={indicatorState}
      fodderState={fodderState}
      definitionState={definitionState}
      answerState={answerState}
      storyPointState={storyPointState}
      isGameOver={isGameOver}
      setAppState={setAppState}
    />
  );

  const renderScreen = (() => {
    switch (appState) {
      case "start": {
        return startScreen;
      }
      case "play": {
        if (isGameOver[isGameOver.length - 1]) {
          return gameOverScreen;
        }
        return gameScreen;
      }
      case "over": {
        return gameOverScreen;
      }
    }
  })();

  return <main>{renderScreen}</main>;
};

export default App;
