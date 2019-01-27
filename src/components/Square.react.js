import { css } from "emotion";
import { useGlobalState } from "../GameGlobalState";
import { Cell } from "../models/Game";
import { useDrag } from "../hooks";
import React, { useCallback, useMemo, useRef } from "react";

const Square = ({ x, y }) => {
  const [game, setGame] = useGlobalState("game");
  const cell = useMemo(() => game.getCell([x, y]), [game]);
  const buttonEl = useRef();
  const affectedByDrag = useRef(false);

  const onClick = useCallback(
    () => {
      if (affectedByDrag.current === false) {
        setGame(game.cycleCell([x, y]));
      }
    },
    [game, x, y]
  );

  const onDragStart = useCallback(() => {
    affectedByDrag.current = false;
  }, []);

  const onDragOver = useCallback(
    () => {
      if (cell !== Cell.GRASS) {
        setGame(game.setCell([x, y], Cell.GRASS));
        affectedByDrag.current = true;
      }
    },
    [game, x, y]
  );

  useDrag(
    [Cell.EMPTY, Cell.GRASS].includes(cell) ? buttonEl : null,
    onDragStart,
    onDragOver
  );

  return (
    <td className={styles.root}>
      <button
        className={styles.button}
        data-x={x}
        data-y={y}
        disabled={cell === Cell.TREE}
        onClick={onClick}
        ref={buttonEl}
      >
        {cell === Cell.EMPTY ? "" : cell}
      </button>
    </td>
  );
};

const styles = {
  root: css`
    border: 1px solid;
    height: 60px;
    padding: 0;
    text-align: center;
    width: 60px;

    &.count {
      border: none;
      font-size: 20px;

      &.valid {
        font-weight: bold;
      }
    }
  `,
  button: css`
    background: none;
    border: none;
    color: black;
    display: block;
    height: 60px;
    width: 60px;
  `
};

export default Square;
