import styled from "styled-components";

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: #fff;
  color: ${props => props.theme.highlight};
  font-size: 12px;
  margin: 4px;
  padding: 0.25em 1em;
  border: 1px solid ${props => props.theme.highlight};
  border-radius: 1px;
`;

export default Button;
