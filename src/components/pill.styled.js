import styled from "styled-components";

const Pill = styled.span`
  min-width: 10px;
  padding: 0px 7px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;

  background-color: ${props => props.theme.highlight};
  border-radius: 10px;
  margin-left: auto;
`;

export default Pill;
