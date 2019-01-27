import { css, cx } from "emotion";
import React from "react";

const Button = ({ className, ...props }) => (
  <button className={cx(styles.root, className)} {...props} />
);

const styles = {
  root: css`
    background: #37a;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font: inherit;
    padding: 1em 2em;

    &:active {
      background: #368;
    }
  `
};

export default Button;
