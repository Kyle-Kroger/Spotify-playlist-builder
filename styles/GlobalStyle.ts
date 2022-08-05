import { createGlobalStyle } from "styled-components";
import reset from "./reset";
import variables from "./variables.globals";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${variables}

  html {
    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }
    
    font-family: 'Manrope', sans-serif;
  }

  h2 {
    font-size: var(--fz-xl);
    font-weight: 800;
  }

  h3 {
    font-size: var(--fz-md);
    font-weight: 600;
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
