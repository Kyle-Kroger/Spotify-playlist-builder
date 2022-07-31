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

  h3 {
    font-size: var(--fz-lg);
    font-weight: 600;
  }

  body {
    color: white;
  }
`;

export default GlobalStyle;
