import React from "react";
import ReactDOM from "react-dom";
import App from "components/app";
import { ThemeProvider } from "styled-components";
import * as serviceWorker from "serviceWorker";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* Wichtig damit beim skalieren von DIVs deren padding/border berücksichtigt werden. */
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
    -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  /* font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-variant-ligatures: common-ligatures; */
  color: rgba(0, 0, 0, 0.75);
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #f5f6f7;
}
::-webkit-scrollbar-thumb {
  background: #888;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
`;

const colors = {
  blue: "#1070ca",
  red: "#E75546",
  darkgrey: "#333e45",
  lightgrey: "#f5f6f7",
  borderlight: "#e4e7eb",
  borderdark: "#475760",
  nearlywhite: "#fdfdfd"
};

const theme = {
  highlight: colors.blue,
  lightgrey: colors.lightgrey,
  darkgrey: colors.darkgrey,
  borderlight: colors.borderlight,
  borderdark: colors.borderdark,
  whitetext: colors.nearlywhite
};

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
