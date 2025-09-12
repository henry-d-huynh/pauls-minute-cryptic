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

// LocalStorage
const STORAGE_KEY = "minute-crypt-v1";
type PersistedState = {
  indicatorState: HintState;
  fodderState: HintState;
  definitionState: HintState;
  answerState: Answer;
  isGameOver: boolean[];
  storyPointState: StoryPoint[];
};

const DEFAULTS: PersistedState = {
  indicatorState: "hide",
  fodderState: "hide",
  definitionState: "hide",
  answerState: answer,
  isGameOver: [],
  storyPointState: initialStoryPoints,
};

function isValidPersistedState(value: unknown): value is PersistedState {
  if (!value) return false;
  if (typeof value !== "object") return false;

  const hasIndicatorState = "indicatorState" in value;
  const hasFodderState = "fodderState" in value;
  const hasDefinitionState = "definitionState" in value;
  const hasAnswerState = "answerState" in value;
  const hasIsGameOver = "isGameOver" in value;
  const hasStoryPointState = "storyPointState" in value;

  if (
    !hasIndicatorState ||
    !hasFodderState ||
    !hasDefinitionState ||
    !hasAnswerState ||
    !hasIsGameOver ||
    !hasStoryPointState
  ) {
    return false;
  }

  const isIndicatorState =
    typeof value.indicatorState === "string" &&
    (value.indicatorState === "show" || value.indicatorState === "hide");

  const isFodderState =
    typeof value.fodderState === "string" &&
    (value.fodderState === "show" || value.fodderState === "hide");

  const isDefinitionState =
    typeof value.definitionState === "string" &&
    (value.definitionState === "show" || value.definitionState === "hide");

  const isAnswerState = Array.isArray(value.answerState);

  const isIsGameOver = Array.isArray(value.isGameOver);

  const isStoryPointState = Array.isArray(value.storyPointState);

  return (
    isIndicatorState &&
    isFodderState &&
    isDefinitionState &&
    isAnswerState &&
    isIsGameOver &&
    isStoryPointState
  );
}

const App = (): ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [indicatorState, setIndicatorState] = useState<HintState>(
    DEFAULTS.indicatorState,
  );
  const [fodderState, setFodderState] = useState<HintState>(
    DEFAULTS.fodderState,
  );
  const [definitionState, setDefinitionState] = useState<HintState>(
    DEFAULTS.definitionState,
  );
  const [answerState, setAnswerState] = useState(DEFAULTS.answerState);
  const [cursor, setCursor] = useState(0);
  const [isGameOver, setIsGameOver] = useState<boolean[]>(DEFAULTS.isGameOver);
  const [currentLetterRevealed, setCurrentLetterRevealed] = useState<
    undefined | number
  >(undefined);
  const [storyPointState, setStoryPointState] = useState(
    DEFAULTS.storyPointState,
  );
  const [appState, setAppState] = useState<AppState>("start");
  const [isHydratedFromStorage, setIsHydratedFromStorage] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const resultParse = isValidPersistedState(parsed);
        if (resultParse) {
          setIndicatorState(parsed.indicatorState);
          setFodderState(parsed.fodderState);
          setDefinitionState(parsed.definitionState);
          setAnswerState(parsed.answerState);
          setIsGameOver(parsed.isGameOver);
          setStoryPointState(parsed.storyPointState);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsHydratedFromStorage(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydratedFromStorage) return;

    const payload: PersistedState = {
      indicatorState,
      fodderState,
      definitionState,
      answerState,
      isGameOver,
      storyPointState,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.error(error);
    }
  }, [
    answerState,
    definitionState,
    fodderState,
    indicatorState,
    isGameOver,
    isHydratedFromStorage,
    storyPointState,
  ]);

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
