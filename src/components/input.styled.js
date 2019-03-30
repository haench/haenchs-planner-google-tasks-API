import styled from "styled-components";

const Input = styled.input.attrs({ type: "text" })`
  border: 1px solid ${props => props.theme.borderlight};
  border-radius: 2px;
  padding: 2px;
  margin: 4px;
  font-size: 14px;
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
    -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  color: rgba(0, 0, 0, 0.75);
  width: ${props => props.width || "auto"};
`;

export default Input;
