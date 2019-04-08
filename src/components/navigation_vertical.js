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

const Navigation = props => {
  return (
    <>
      <CalendarIcon
        size="36"
        isSelected={appStore.appState === "calendar"}
        onClick={() => {
          appStore.appState = "calendar";
        }}
      />
      <span>Calendar</span>
      <TasksIcon
        size="36"
        isSelected={appStore.appState === "tasks"}
        onClick={() => {
          appStore.appState = "tasks";
        }}
      />
      <span>Tasks</span>
      <HelpCircle
        size="36"
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
      <span>Help</span>
      <div style={{ flex: 1 }} />
      <ConfigIcon
        size="36"
        isSelected={appStore.isConfigOpen}
        onClick={() => {
          appStore.isConfigOpen = true;
        }}
      />
      <span>Settings</span>
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
          <LogoutIcon size="36" onClick={renderProps.onClick} />
        )}
      />
      <span>Logout</span>
    </>
  );
};

export default view(Navigation);
