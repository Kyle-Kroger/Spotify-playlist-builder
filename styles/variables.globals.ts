import { css } from "styled-components";
import { QUERIES } from "./constants";

const variables = css`
  :root {
    /* Colors */
    --color-grey-300: #797979;
    --color-grey-500: #646464;
    --color-grey-550: #414141;
    --color-grey-600: #242424;
    --color-grey-700: #202020;
    --color-grey-800: #161616;
    --color-grey-850: #121212;
    --color-grey-900: #0d0d0d;
    --color-black: #000000;

    --color-spotify-green: #1db954;
    --color-spotify-outline: #37ca6b;

    --color-primary-300: #71bb84;
    --color-primary-500: #329f53;
    --color-primary-900: #0a5022;

    --color-text-subdued: #c2c2c2;

    /* Gradients */
    --player-gradient: linear-gradient(180deg, #202020 0%, #111111 100%);
    --page-gradient: linear-gradient(180deg, #000000 0%, #242424 100%);

    --sidebar-color: var(--color-grey-900);
    --sidebar-text-color: hsl(0, 0%, 84%);
    --side-bar-text-faded: hsl(230, 15%, 52%);

    /* Font-size */
    --fz-xs: 0.875rem;
    --fz-sm: 1rem;
    --fz-md: 1.125rem;
    --fz-lg: 1.25rem;
    --fz-xl: 1.5rem;
    --fz-xxl: 2rem;

    /* Spacing */
    --spacing-xs: 0.5rem;
    --spacing-sm: 0.75rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-xxl: 3rem;

    /* Border-radius */
    --radius-subtle: 4px;
    --radius-small: 8px;
    --radius-large: 16px;
    --radius-pill: 30px;

    /* Shadows */
    --shadow-color: 234deg 53% 33%;
    --shadow-color-dark: 233deg 48% 9%;

    --shadow-elevation-low: 0.5px 0.4px 0.9px hsl(var(--shadow-color) / 0.1),
      0.9px 0.8px 1.6px -0.4px hsl(var(--shadow-color) / 0.23),
      1.9px 1.6px 3.4px -0.9px hsl(var(--shadow-color) / 0.35);
    --shadow-elevation-medium: 0.5px 0.4px 0.9px hsl(var(--shadow-color) / 0.11),
      2.1px 1.8px 3.8px -0.3px hsl(var(--shadow-color) / 0.2),
      4.4px 3.8px 7.9px -0.6px hsl(var(--shadow-color) / 0.3),
      9.4px 8.2px 17px -0.9px hsl(var(--shadow-color) / 0.4);
    --shadow-elevation-high: 0.5px 0.4px 0.9px hsl(var(--shadow-color) / 0.1),
      3.8px 3.4px 7px -0.1px hsl(var(--shadow-color) / 0.15),
      6.8px 6px 12.4px -0.3px hsl(var(--shadow-color) / 0.19),
      10.2px 9px 18.6px -0.4px hsl(var(--shadow-color) / 0.24),
      14.8px 13px 26.9px -0.5px hsl(var(--shadow-color) / 0.28),
      21.3px 18.6px 38.6px -0.6px hsl(var(--shadow-color) / 0.32),
      30.4px 26.6px 55.1px -0.8px hsl(var(--shadow-color) / 0.37),
      42.9px 37.6px 77.9px -0.9px hsl(var(--shadow-color) / 0.41);

    --shadow-elevation-low-dark: 0.5px 0.4px 0.9px
        hsl(var(--shadow-color-dark) / 0.1),
      0.9px 0.8px 1.6px -0.4px hsl(var(--shadow-color-dark) / 0.23),
      1.9px 1.6px 3.4px -0.9px hsl(var(--shadow-color-dark) / 0.35);
    --shadow-elevation-medium-dark: 0.5px 0.4px 0.9px
        hsl(var(--shadow-color-dark) / 0.11),
      2.1px 1.8px 3.8px -0.3px hsl(var(--shadow-color-dark) / 0.2),
      4.4px 3.8px 7.9px -0.6px hsl(var(--shadow-color-dark) / 0.3),
      9.4px 8.2px 17px -0.9px hsl(var(--shadow-color-dark) / 0.4);
    --shadow-elevation-high-dark: 0.5px 0.4px 0.9px
        hsl(var(--shadow-color-dark) / 0.1),
      3.8px 3.4px 7px -0.1px hsl(var(--shadow-color-dark) / 0.15),
      6.8px 6px 12.4px -0.3px hsl(var(--shadow-color-dark) / 0.19),
      10.2px 9px 18.6px -0.4px hsl(var(--shadow-color-dark) / 0.24),
      14.8px 13px 26.9px -0.5px hsl(var(--shadow-color-dark) / 0.28),
      21.3px 18.6px 38.6px -0.6px hsl(var(--shadow-color-dark) / 0.32),
      30.4px 26.6px 55.1px -0.8px hsl(var(--shadow-color-dark) / 0.37),
      42.9px 37.6px 77.9px -0.9px hsl(var(--shadow-color-dark) / 0.41);

    /* Images */

    /* Sizing */
    --player-height: 100px;
    --player-expand-height: 190px;
    --mobile-nav-height: 70px;
    --content-height: calc(100vh - var(--player-height));
    --desktop-nav-width: 240px;
    --sidebar-width: 460px;

    @media ${QUERIES.phone} {
      --player-height: 80px;
      --content-height: calc(
        100vh - var(--player-height) - var(--mobile-nav-height)
      );
    }
  }
`;

export default variables;
