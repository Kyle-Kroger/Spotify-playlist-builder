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
    
  }

  body {
    color: orange;
  }
`;

export default GlobalStyle;
