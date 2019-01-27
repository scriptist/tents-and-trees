import Button from "./Button.react";
import Square from "./Square.react";
import { useGlobalState } from "../GameGlobalState";
import { css, cx } from "emotion";
import React from "react";

const Grid = () => {
  const [game, setGame] = useGlobalState("game");

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
                className={cx(styles.count, "col", {
                  valid: game.isColValid(y)
                })}
                key={y}
              >
                {colCount}
              </td>
            ))}
          </tr>
          {game.rows.map((row, x) => (
            <tr key={x}>
              <td
                className={cx(styles.count, "row", {
                  valid: game.isRowValid(x)
                })}
              >
                {game.rowCounts[x]}
              </td>
              {row.map((cell, y) => (
                <Square key={y} x={x} y={y} />
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
    font-size: 8vmin;
    margin-right: 1em;
  `,
  count: css`
    font-size: 0.5em;

    &.col {
      height: 48px;
    }

    &.row {
      width: 32px;
    }

    &.valid {
      font-size: 0.75em;
      font-weight: bold;
    }
  `
};

export default Grid;
