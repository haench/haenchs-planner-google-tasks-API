import React from "react";
import styled from "styled-components";

const UserInfoWrapper = styled.div`
  padding: 8px 4px 8px 4px;
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  font-size: 16px;
  flex: 1;
`;

const UserInfo = props => {
  return (
    <UserInfoWrapper>
      <GoogleIcon size="32" />
      <UserName>
        {appStore.user.givenName} {appStore.user.familyName[0]}.{" "}
      </UserName>
    </UserInfoWrapper>
  );
};
