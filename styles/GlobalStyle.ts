import { createGlobalStyle } from "styled-components";
import reset from "./reset";
import variables from "./variables.globals";
import { QUERIES } from "./constants";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${variables}

  html,
  body,
  #__next {
    height: 100%;
  }

  html {
    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }
    
    font-family: 'Manrope', sans-serif;
  }

  h1 {
    font-size: clamp(
      1.5rem,
      2.4vw + 1rem,
      3.5rem
    );
    
    line-height: 1.25;
    font-weight: 800;
  }

  h2 {
    font-size: var(--fz-xl);
    font-weight: 800;
  }

  h3 {
    font-size: var(--fz-md);
    font-weight: 600;

    @media ${QUERIES.phone} {
      font-size: var(--fz-sm);
    }
  }

  h4 {
    font-size: var(--fz-md);
    font-weight: 500;
  }

  body {
    color: white;
  }
`;

export default GlobalStyle;
