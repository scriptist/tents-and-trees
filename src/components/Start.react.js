import Button from "./Button.react";
import Game from "../models/Game";
import { useGlobalState } from "../GameGlobalState";
import { css } from "emotion";
import React, { useState } from "react";

const Start = () => {
  const [size, setSize] = useState(6);
  const [, setGame] = useGlobalState("game");

  return (
    <div className={styles.root}>
      <label className={styles.label}>
        Grid size:{" "}
        <select
          className={styles.select}
          onChange={e => setSize(parseInt(e.target.value, 10))}
          value={size}
        >
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
        </select>
      </label>
      <br />
      <br />
      <Button onClick={() => setGame(Game.generate(size))}>Start</Button>
    </div>
  );
};

const styles = {
  root: css`
    font-size: 24px;
  `,
  label: css``,
  select: css`
    font-size: 24px;
  `
};

export default Start;
