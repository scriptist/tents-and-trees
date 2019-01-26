import React from "react";

import { css } from "emotion";

const App = () => {
  return <div className={styles.root}>Hello World!</div>;
};

const styles = {
  root: css`
    font-family: sans-serif;
  `
};

export default App;
