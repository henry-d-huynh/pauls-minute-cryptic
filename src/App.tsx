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

  const setCharacter = useCallback(
    (key: string) => {
      if (/^[a-zA-Z]$/.test(key)) {
        const newAnswerState = answerState.map((character, index) => {
          if (cursor === index) {
            if (cursor < answerState.length - 1) {
              setCursor(cursor + 1);
            }
            return {
              ...character,
              input: key.toLowerCase(),
            };
          }

          return character;
        });

        setAnswerState(newAnswerState);
      }

      if (key === "Backspace") {
        const newAnswerState = answerState.map((character, index) => {
          if (cursor === index) {
            if (cursor > 0) {
              setCursor(cursor - 1);
            }

            return {
              ...character,
              input: "",
            };
          }
          return character;
        });

        setAnswerState(newAnswerState);
      }
    },
    [cursor, answerState],
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
      />
      {renderModal}
    </main>
  );
};

export default App;
