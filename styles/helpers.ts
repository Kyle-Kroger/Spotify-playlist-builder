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

  spotifyScrollBar: css`
    /* width */
    ::-webkit-scrollbar {
      width: 10px;
      height: 12px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: var(--color-grey-900);
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: var(--color-text-subdued);
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `,
};

export default helpers;
