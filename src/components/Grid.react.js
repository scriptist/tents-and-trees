import Button from "./Button.react";
import { Cell } from "../models/Game";
import { useGlobalState } from "../GameGlobalState";
import { css, cx } from "emotion";
import React from "react";

const Grid = () => {
  const [game, setGame] = useGlobalState("game");

  return (
    <div className={styles.root}>
      <Button onClick={() => setGame(null)}>Stop</Button>
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
                    disabled={cell === Cell.TREE}
                    onClick={() => setGame(game.cycleCell([x, y]))}
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
