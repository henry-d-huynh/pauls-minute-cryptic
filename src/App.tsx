import { GameScreen } from "./components/game-screen/game-screen.tsx";
import { Modal } from "./components/modal/modal.tsx";
import { type ReactElement, useState } from "react";

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

  const toggleModal = (isVisible?: boolean) => {
    setIsModalVisible(isVisible || !isModalVisible);
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
    <>
      <GameScreen
        toggleModal={toggleModal}
        indicatorState={indicatorState}
        fodderState={fodderState}
        definitionState={definitionState}
        answerState={answerState}
      />
      {renderModal}
    </>
  );
};

export default App;
