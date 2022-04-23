import { css } from "styled-components";

const helpers = {
  flexCenter: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  card: css`
    box-shadow: var(--shadow-elevation-medium-dark);
    border-radius: var(--radius-subtle);
  `,
  maxWidthWrapper: css`
    width: 100%;
    max-width: var(--content-max-width);
    margin: 0 auto;
  `,
};

export default helpers;
