import { useGlobalState } from "./GameGlobalState";
import Congratulations from "./components/Congratulations.react";
import Grid from "./components/Grid.react";
import Start from "./components/Start.react";

import { css } from "emotion";
import React from "react";

const App = () => {
  const [game] = useGlobalState("game");

  return (
    <div className={styles.root}>
      {game ? <Grid /> : <Start />}
      {game && game.isComplete() && <Congratulations />}
    </div>
  );
};

const styles = {
  root: css`
    align-items: center;
    display: flex;
    flex-direction: column;
    font-family: sans-serif;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
  `
};

export default App;
