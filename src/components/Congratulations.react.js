import Button from "./Button.react";
import { css } from "emotion";
import { useGlobalState } from "../GameGlobalState";
import React from "react";

const Congratulations = () => {
  const [, setGame] = useGlobalState("game");

  return (
    <div className={styles.root}>
      <h1>Congratulations!</h1>
      <Button className={styles.button} onClick={() => setGame(null)}>
        Hooray
      </Button>
    </div>
  );
};

const styles = {
  root: css`
    background: white;
    border-radius: 8px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
    padding: 16px;
    position: absolute;

    h1 {
      margin-top: 0;
    }
  `,
  button: css`
    font-size: 24px;
  `
};

export default Congratulations;
