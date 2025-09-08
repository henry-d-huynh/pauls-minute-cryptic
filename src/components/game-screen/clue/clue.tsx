import styles from "./clue.module.scss";
import { type ReactElement } from "react";
import type { HintState } from "../../../App.tsx";

type Props = {
  indicatorState: HintState;
  fodderState: HintState;
  definitionState: HintState;
};

export const GameClue = ({
  indicatorState,
  fodderState,
  definitionState,
}: Props): ReactElement => {
  const getIndicatorElement = () => {
    switch (indicatorState) {
      case "hide":
        return <>initially</>;
      case "show":
        return <span className={styles.clueIndicator}>initially</span>;
    }
  };

  const renderIndicatorElement = getIndicatorElement();

  const getFodderElement = () => {
    switch (fodderState) {
      case "hide":
        return <>Baby eats at The Ritz in Carlton’s East</>;
      case "show":
        return (
          <span className={styles.clueFodder}>
            Baby eats at The Ritz in Carlton’s East
          </span>
        );
    }
  };

  const renderFodderElement = getFodderElement();

  const getDefinitionElement = () => {
    switch (definitionState) {
      case "hide":
        return <>childhood home</>;
      case "show":
        return <span className={styles.clueDefinition}>childhood home</span>;
    }
  };

  const renderDefinitionElement = getDefinitionElement();

  const renderClue = (
    <>
      {renderFodderElement} {renderIndicatorElement} but nothing beats a{" "}
      {renderDefinitionElement}
    </>
  );

  return (
    <div className={styles.clue}>
      <span>{renderClue}</span> (8)
    </div>
  );
};
