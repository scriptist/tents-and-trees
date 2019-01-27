import { css, cx } from "emotion";
import { useGlobalState } from "../GameGlobalState";
import { Cell } from "../models/Game";
import { useDrag } from "../hooks";
import React, { useCallback, useMemo, useRef } from "react";
import tent from "../images/tent.png";
import tree from "../images/tree.png";

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
    <td className={cx(styles.root, cell)}>
      <button
        className={styles.button}
        data-x={x}
        data-y={y}
        disabled={cell === Cell.TREE}
        onClick={onClick}
        ref={buttonEl}
      >
        {cell === Cell.TENT && (
          <img alt="tent" className={styles.image} src={tent} />
        )}
        {cell === Cell.TREE && (
          <img alt="tree" className={styles.image} src={tree} />
        )}
      </button>
    </td>
  );
};

const styles = {
  root: css`
    border: 1px solid;
    height: 1em;
    padding: 0;
    text-align: center;
    width: 1em;

    &.${Cell.EMPTY} {
      background: #777;
    }

    &:not(.${Cell.EMPTY}) {
      background: #ddf29b;
    }
  `,
  button: css`
    background: none;
    border: none;
    color: black;
    cursor: pointer;
    display: block;
    font: inherit;
    height: 1em;
    padding: 0;
    width: 1em;
    vertical-align: middle;
  `,
  image: css`
    max-height: 100%;
    max-width: 100%;
  `
};

export default Square;
