import { css } from "emotion";
import React from "react";

const Grid = ({ game, setGame }) => {
  return (
    <div className={styles.root}>
      <button onClick={setGame}>Stop</button>
    </div>
  );
};

const styles = {
  root: css``
};

export default Grid;
