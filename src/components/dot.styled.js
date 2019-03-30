import styled from "styled-components";

const Dot = styled.span`
  height: ${props => `${props.size || 4}px`};
  width: ${props => `${props.size || 4}px`};
  border-radius: 50%;
  display: inline-block;
  background-color: ${props => props.color || "#bbb"};
  margin: 2px;
`;

export default Dot;
