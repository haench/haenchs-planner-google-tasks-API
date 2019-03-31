import React from "react";
import ReactDOM from "react-dom";
import App from "components/app.component";
import { ThemeProvider } from "styled-components";
import "index.css";
// import { Normalize } from "styled-normalize";
import * as serviceWorker from "serviceWorker";

const colors = {
  blue: "#1070ca",
  red: "#E75546",
  darkgrey: "#333e45",
  lightgrey: "#f5f6f7",
  borderlight: "#e4e7eb",
  borderdark: "#475760"
};

const theme = {
  highlight: colors.blue,
  lightgrey: colors.lightgrey,
  darkgrey: colors.darkgrey,
  borderlight: colors.borderlight,
  borderdark: colors.borderdark
};

ReactDOM.render(
  <React.Fragment>
    {/* <Normalize /> */}
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.Fragment>,
  document.getElementById("root")
);

serviceWorker.register();
