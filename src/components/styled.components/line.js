import styled from "styled-components";

const Line = styled.span`
  height: 2px;
  width: -webkit-fill-available;
  border-top-left-radius: ${props => (props.first ? "2px" : "0px")};
  border-bottom-left-radius: ${props => (props.first ? "2px" : "0px")};
  border-top-right-radius: ${props => (props.last ? "2px" : "0px")};
  border-bottom-right-radius: ${props => (props.last ? "2px" : "0px")};
  margin-left: ${props => (props.first ? "2px" : "0px")};
  margin-right: ${props => (props.last ? "2px" : "0px")};
  margin-top: 3px;
  margin-bottom: 3px;
  display: block;
  background-color: ${props => props.color || "#bbb"};
  box-shadow: 0 0 0 1px ${props => props.color || "#bbb"};
`;

export default Line;
