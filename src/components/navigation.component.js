import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import { GoogleLogout } from "react-google-login";

import appStore from "stores/appStore";

import { Google as GoogleIcon } from "styled-icons/boxicons-logos/Google";
import { LogOut as LogOutIconBase } from "styled-icons/feather/LogOut";
import { CheckSquare as TasksIconBase } from "styled-icons/feather/CheckSquare";
import { Calendar as CalendarIconBase } from "styled-icons/feather/Calendar";
import { Settings as SettingsIconBase } from "styled-icons/feather/Settings";
import { HelpCircle as HelpCircleBase } from "styled-icons/feather/HelpCircle";

import ConfigDialog from "components/config.component";
import AboutPopup from "components/about.component";

const LogoutIcon = styled(LogOutIconBase)`
  color: #fdfdfd;
`;

const TasksIcon = styled(TasksIconBase)`
  color: #fdfdfd;
`;

const CalendarIcon = styled(CalendarIconBase)`
  color: #fdfdfd;
`;

const SettingsIcon = styled(SettingsIconBase)`
  color: #fdfdfd;
`;

const HelpCircle = styled(HelpCircleBase)`
  color: #fdfdfd;
`;

const NavigationPane = styled.div`
  background: ${props => props.theme.darkgrey};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 1px solid #475760;
`;

const UserInfo = styled.div`
  padding: 8px 4px 8px 4px;
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  font-size: 16px;
  flex: 1;
`;

const Navigation = props => {
  return (
    <>
      <UserInfo>
        <GoogleIcon size="32" />
        <UserName>
          {appStore.user.givenName} {appStore.user.familyName[0]}.{" "}
        </UserName>
      </UserInfo>
      <NavigationPane>
        <CalendarIcon
          size="32"
          onClick={() => {
            appStore.appState = "calendar";
          }}
        />
        <TasksIcon
          size="32"
          onClick={() => {
            appStore.appState = "tasks";
          }}
        />
        <HelpCircle
          size="32"
          onClick={() => {
            appStore.isAboutOpen = true;
          }}
        />
        <AboutPopup
          isAboutOpen={appStore.isAboutOpen}
          closeAbout={() => {
            appStore.isAboutOpen = false;
          }}
        />
        <SettingsIcon
          size="32"
          onClick={() => {
            appStore.isConfigOpen = true;
          }}
        />
        <ConfigDialog
          isConfigOpen={appStore.isConfigOpen}
          closeConfig={() => {
            appStore.isConfigOpen = false;
          }}
        />
        <GoogleLogout
          buttonText=""
          icon={false}
          onLogoutSuccess={() => console.log("logged out")}
          render={renderProps => (
            <LogoutIcon size="32" onClick={renderProps.onClick} />
          )}
        />
      </NavigationPane>
    </>
  );
};

export default view(Navigation);
