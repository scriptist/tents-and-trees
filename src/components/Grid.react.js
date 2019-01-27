import Square from "./Square.react";
import { useGlobalState } from "../GameGlobalState";
import { css, cx } from "emotion";
import React, { useMemo } from "react";

const Grid = () => {
  const [game] = useGlobalState("game");

  const fontSize = useMemo(
    () => css`
      font-size: ${100 / (game.size + 2)}vmin;
    `,
    [game.size]
  );

  return (
    <div className={styles.root}>
      <div
        className={cx(styles.congratulations, { visible: game.isComplete() })}
      />
      <table className={cx(styles.table, fontSize)}>
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
    margin-right: 1em;
  `,
  count: css`
    font-size: 0.5em;
    height: ${1 / 0.5}em;
    width: ${1 / 0.5}em;

    &.valid {
      font-size: 0.75em;
      font-weight: bold;
      height: ${1 / 0.75}em;
      width: ${1 / 0.75}em;
    }
  `
};

export default Grid;
