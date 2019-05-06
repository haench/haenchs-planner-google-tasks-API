import styled from "styled-components";

const Header = styled.div``;

Header.Wrapper = styled.div`
  flex: 0 0 48px;
  padding: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
//   background: ${props => props.theme.darkgrey};
`;

Header.Title = styled.div`
  font-size: 18px;
  font-weight: 600;
//   color: ${props => props.theme.whitetext};
  flex: 1;
`;

export default Header;
