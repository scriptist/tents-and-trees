import Button from "./Button.react";
import { Cell } from "../models/Game";
import { useGlobalState } from "../GameGlobalState";
import { css, cx } from "emotion";
import React, { useCallback, useEffect, useRef } from "react";

const Grid = () => {
  const mouseDown = useRef(false);
  const mouseMoveUpdate = useRef(false);
  const [game, setGame] = useGlobalState("game");

  const onCellMouseDown = useCallback(
    cell => {
      if ([Cell.EMPTY, Cell.GRASS].includes(game.getCell(cell))) {
        mouseDown.current = true;
        mouseMoveUpdate.current = false;
      }
    },
    [game]
  );
  const onCellClick = useCallback(
    cell => {
      if (mouseMoveUpdate.current === false) {
        setGame(game.cycleCell(cell));
      }
    },
    [game]
  );

  useEffect(
    () => {
      const listeners = {
        mousemove(e) {
          if (mouseDown.current === false) return;

          const el = document.elementFromPoint(e.clientX, e.clientY);
          if (!el) return;

          const x = parseInt(el.getAttribute("data-x"), 10);
          const y = parseInt(el.getAttribute("data-y"), 10);

          if (isNaN(x) || isNaN(y)) return;

          const cell = [x, y];
          if (game.getCell(cell) === Cell.EMPTY) {
            setGame(game.setCell(cell, Cell.GRASS));
            mouseMoveUpdate.current = true;
          }
        },
        mouseup() {
          mouseDown.current = false;
        }
      };
      Object.entries(listeners).forEach(([event, func]) =>
        document.addEventListener(event, func)
      );

      return () => {
        Object.entries(listeners).forEach(([event, func]) =>
          document.removeEventListener(event, func)
        );
      };
    },
    [game]
  );

  return (
    <div className={styles.root}>
      <div
        className={cx(styles.congratulations, { visible: game.isComplete() })}
      >
        <h2>Congratulations!</h2>
        <Button onClick={() => setGame(null)}>Stop</Button>
      </div>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td />
            {game.colCounts.map((colCount, y) => (
              <td
                className={cx(styles.cell, "count", {
                  valid: game.isColValid(y)
                })}
                key={y}
              >
                {colCount}
              </td>
            ))}
          </tr>
          {game.rows.map((row, x) => (
            <tr className={styles.row} key={x}>
              <td
                className={cx(styles.cell, "count", {
                  valid: game.isRowValid(x)
                })}
              >
                {game.rowCounts[x]}
              </td>
              {row.map((cell, y) => (
                <td className={styles.cell} key={y}>
                  <button
                    className={styles.button}
                    data-x={x}
                    data-y={y}
                    disabled={cell === Cell.TREE}
                    onClick={() => onCellClick([x, y])}
                    onMouseDown={() => onCellMouseDown([x, y])}
                  >
                    {cell === Cell.EMPTY ? "" : cell}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  root: css``,
  congratulations: css`
    pointer-events: none;
    visibility: hidden;

    &.visible {
      pointer-events: inherit;
      visibility: visible;
    }
  `,
  table: css`
    border-collapse: collapse;
    margin-right: 60px;
  `,
  row: css``,
  cell: css`
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

export default Grid;
