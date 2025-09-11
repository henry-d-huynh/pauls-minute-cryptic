import type { ReactElement } from "react";
import styles from "./game-over-screen.module.scss";
import type { Answer, AppState, HintState, StoryPoint } from "../../App.tsx";
import { GameScreenNav } from "../game-screen/nav/nav.tsx";
import { GameClue } from "../game-screen/clue/clue.tsx";
import { InputButtons } from "../game-screen/crypt/input-buttons/input-buttons.tsx";
import clsx from "clsx";

type Props = {
  indicatorState: HintState;
  fodderState: HintState;
  definitionState: HintState;
  answerState: Answer;
  storyPointState: StoryPoint[];
  isGameOver: boolean[];
  setAppState: (state: AppState) => void;
};

export const GameOverScreen = ({
  answerState,
  isGameOver,
  indicatorState,
  fodderState,
  definitionState,
  storyPointState,
  setAppState,
}: Props): ReactElement => {
  return (
    <div className={styles.gameScreen}>
      <div className={styles.gameScreenContainer}>
        <GameScreenNav setAppState={setAppState} />
        <GameClue
          indicatorState={indicatorState}
          fodderState={fodderState}
          definitionState={definitionState}
        />
        <div className={styles.crypt}>
          <InputButtons answerState={answerState} isGameOver={isGameOver} />
        </div>
        <Window storyPointState={storyPointState} />
        <Support />
      </div>
    </div>
  );
};

type WindowProps = {
  storyPointState: StoryPoint[];
};

const Window = ({ storyPointState }: WindowProps): ReactElement => {
  const renderStoryPoints = storyPointState.map((storyPoint) => (
    <div
      className={clsx(styles.points, {
        [styles.pointsHinted]: storyPoint.state === "hinted",
        [styles.pointsRevealed]: storyPoint.state === "revealed",
      })}
    ></div>
  ));

  return (
    <div className={styles.window}>
      <div className={styles.windowPoints}>{renderStoryPoints}</div>
      <div className={styles.windowTitle}>You got it!</div>
      <div className={styles.windowMessage}>
        <div className={styles.windowMessageSolve}>
          You solved today's clue in
        </div>
        <div className={styles.windowMessagePar}>
          I didn't have the fucking time to program this par calculation
        </div>
      </div>
      <div className={styles.windowIntruction}>
        Submit a screenshot of your victory to the game master for your next
        instruction
      </div>
    </div>
  );
};

const Support = (): ReactElement => {
  return (
    <div className={styles.support}>
      <a
        className={styles.supportButton}
        href="https://www.youtube.com/watch?v=H58vbez_m4E"
        target="_blank"
      >
        <img
          className={styles.supportButtonImage}
          src="./nlu.jpg"
          alt="not like us"
        />
        <div className={styles.supportButtonIcon}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 576 512"
            className="h-9 w-9 opacity-90"
            color="red"
            style={{ color: "red" }}
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
          </svg>
        </div>
      </a>
      <p className={styles.supportText}>
        Support this project by watching Not Like Us by Kendrick Lamar. Leave a
        comment and see no one else's thoughts!
      </p>
    </div>
  );
};
