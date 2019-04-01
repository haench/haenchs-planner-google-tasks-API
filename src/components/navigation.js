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

import ConfigDialog from "components/config";
import AboutPopup from "components/about";

const LogoutIcon = styled(LogOutIconBase)`
  margin: 4px;
  border-radius: 2px;
  color: ${props => props.theme.whitetext};
  background: ${props => (props.isSelected ? props.theme.highlight : "none")};
  :hover {
    color: ${props => props.theme.highlight};
  }
`;

const TasksIcon = styled(TasksIconBase)`
  margin: 4px;
  border-radius: 2px;
  color: ${props => props.theme.whitetext};
  background: ${props => (props.isSelected ? props.theme.highlight : "none")};
  :hover {
    color: ${props => props.theme.highlight};
  }
`;

const CalendarIcon = styled(CalendarIconBase)`
  margin: 4px;
  border-radius: 2px;
  color: ${props => props.theme.whitetext};
  background: ${props => (props.isSelected ? props.theme.highlight : "none")};
  :hover {
    color: ${props => props.theme.highlight};
  }
`;

const ConfigIcon = styled(SettingsIconBase)`
  margin: 4px;
  border-radius: 2px;
  color: ${props => props.theme.whitetext};
  background: ${props => (props.isSelected ? props.theme.highlight : "none")};
  :hover {
    color: ${props => props.theme.highlight};
  }
`;

const HelpCircle = styled(HelpCircleBase)`
  margin: 4px;
  border-radius: 2px;
  color: ${props => props.theme.whitetext};
  background: ${props => (props.isSelected ? props.theme.highlight : "none")};
  :hover {
    color: ${props => props.theme.highlight};
  }
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
          isSelected={appStore.appState === "calendar"}
          onClick={() => {
            appStore.appState = "calendar";
          }}
        />
        <TasksIcon
          size="32"
          isSelected={appStore.appState === "tasks"}
          onClick={() => {
            appStore.appState = "tasks";
          }}
        />
        <HelpCircle
          size="32"
          isSelected={appStore.isAboutOpen}
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
        <ConfigIcon
          size="32"
          isSelected={appStore.isConfigOpen}
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
          onLogoutSuccess={() => (appStore.appState = "auth")}
          render={renderProps => (
            <LogoutIcon size="32" onClick={renderProps.onClick} />
          )}
        />
      </NavigationPane>
    </>
  );
};

export default view(Navigation);
