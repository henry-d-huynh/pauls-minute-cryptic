import type { ReactElement } from "react";
import styles from "./keyboard.module.scss";

type Keys = {
  id: string;
  value: string;
  display: string;
};

const row1: Keys[] = [
  {
    id: "key-Q",
    value: "Q",
    display: "Q",
  },
  {
    id: "key-W",
    value: "W",
    display: "W",
  },
  {
    id: "key-E",
    value: "E",
    display: "E",
  },
  {
    id: "key-R",
    value: "R",
    display: "R",
  },
  {
    id: "key-T",
    value: "T",
    display: "T",
  },
  {
    id: "key-Y",
    value: "Y",
    display: "Y",
  },
  {
    id: "key-U",
    value: "U",
    display: "U",
  },
  {
    id: "key-I",
    value: "I",
    display: "I",
  },
  {
    id: "key-O",
    value: "O",
    display: "O",
  },
  {
    id: "key-P",
    value: "P",
    display: "P",
  },
];

const row2: Keys[] = [
  {
    id: "key-A",
    value: "A",
    display: "A",
  },
  {
    id: "key-S",
    value: "S",
    display: "S",
  },
  {
    id: "key-D",
    value: "D",
    display: "D",
  },
  {
    id: "key-F",
    value: "F",
    display: "F",
  },
  {
    id: "key-G",
    value: "G",
    display: "G",
  },
  {
    id: "key-H",
    value: "H",
    display: "H",
  },
  {
    id: "key-J",
    value: "J",
    display: "J",
  },
  {
    id: "key-K",
    value: "K",
    display: "K",
  },
  {
    id: "key-L",
    value: "L",
    display: "L",
  },
];

const row3: Keys[] = [
  {
    id: "key-Z",
    value: "Z",
    display: "Z",
  },
  {
    id: "key-X",
    value: "X",
    display: "X",
  },
  {
    id: "key-C",
    value: "C",
    display: "C",
  },
  {
    id: "key-V",
    value: "V",
    display: "V",
  },
  {
    id: "key-B",
    value: "B",
    display: "B",
  },
  {
    id: "key-N",
    value: "N",
    display: "N",
  },
  {
    id: "key-M",
    value: "M",
    display: "M",
  },
  {
    id: "key-backspace",
    value: "backspace",
    display: "⌫",
  },
];

const rows: Keys[][] = [row1, row2, row3];

export const Keyboard = (): ReactElement => {
  const renderKeyboard = rows.map((row, index) => {
    const renderKeys = row.map((key) => (
      <div className={styles.keyboardRowKey} key={key.id}>
        {key.display}
      </div>
    ));
    return (
      <div className={styles.keyboardRow} key={`keyboard-row-${index}`}>
        {renderKeys}
      </div>
    );
  });

  return <div className={styles.keyboard}>{renderKeyboard}</div>;
};
