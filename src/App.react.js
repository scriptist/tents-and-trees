import { useGlobalState } from "./GameGlobalState";
import Grid from "./components/Grid.react";
import Start from "./components/Start.react";

import { css } from "emotion";
import React from "react";

const App = () => {
  const [game] = useGlobalState("game");

  return <div className={styles.root}>{game ? <Grid /> : <Start />}</div>;
};

const styles = {
  root: css`
    font-family: sans-serif;
  `
};

export default App;
