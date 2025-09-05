import { GameScreen } from "./components/game-screen/game-screen.tsx";
import { Modal } from "./components/modal/modal.tsx";
import { useState } from "react";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = (isVisible?: boolean) => {
    setIsModalVisible(isVisible || !isModalVisible);
  };

  const renderModal = isModalVisible ? (
    <Modal toggleModal={toggleModal} />
  ) : (
    <></>
  );

  return (
    <>
      <GameScreen toggleModal={toggleModal} />
      {renderModal}
    </>
  );
}

export default App;
