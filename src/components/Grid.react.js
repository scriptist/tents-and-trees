import { Cell } from "../models/Game";
import { useGlobalState } from "../GameGlobalState";
import { css, cx } from "emotion";
import React from "react";

const Grid = () => {
  const [game, setGame] = useGlobalState("game");

  return (
    <div className={styles.root}>
      <button onClick={() => setGame(null)}>Stop</button>
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
                  {cell === Cell.EMPTY ? "" : cell}
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
  table: css`
    border-collapse: collapse;
  `,
  row: css``,
  cell: css`
    border: 1px solid;
    height: 60px;
    text-align: center;
    width: 60px;

    &.count {
      border: none;
      font-size: 20px;

      &.valid {
        font-weight: bold;
      }
    }
  `
};

export default Grid;
