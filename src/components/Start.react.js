import Game from "../models/Game";
import { useGlobalState } from "../GameGlobalState";
import { css } from "emotion";
import React, { useState } from "react";

const Start = () => {
  const [size, setSize] = useState(6);
  const [, setGame] = useGlobalState("game");

  return (
    <div className={styles.root}>
      <select
        onChange={e => setSize(parseInt(e.target.value, 10))}
        value={size}
      >
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <button onClick={() => setGame(new Game(size))}>Start</button>
    </div>
  );
};

const styles = {
  root: css``
};

export default Start;
