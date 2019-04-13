import styled from "styled-components";

export const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
`;

export const NavPane = styled.div`
  background: ${props => props.theme.darkgrey};
  color: #fdfdfd;
  border-right: 1px solid #475760;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

export const FixedPane = styled.div`
  background: ${props => props.theme.darkgrey};
  color: #fdfdfd;
  border-right: 1px solid #475760;
  flex: 0 0 15%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const FlexPane = styled.div`
  background: #f5f6f7;
  border-right: 1px solid #e4e7eb;
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
