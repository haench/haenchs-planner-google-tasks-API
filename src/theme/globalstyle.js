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

export default GlobalStyle;
