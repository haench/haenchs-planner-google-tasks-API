import React from "react";
import ReactDOM from "react-dom";
import App from "components/app";
import { ThemeProvider } from "styled-components";
import * as serviceWorker from "serviceWorker";
import theme from "theme/theme";
import GlobalStyle from "theme/globalstyle";

ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.Fragment>,
  document.getElementById("root")
);

serviceWorker.register();
