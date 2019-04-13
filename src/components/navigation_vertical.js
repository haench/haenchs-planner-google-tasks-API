import React, { useState } from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import { GoogleLogout } from "react-google-login";

import appStore from "stores/appStore";
import { LogOut as LogOutIcon } from "styled-icons/feather/LogOut";
import { CheckSquare as TasksIcon } from "styled-icons/feather/CheckSquare";
import { Calendar as CalendarIcon } from "styled-icons/feather/Calendar";
import { Settings as SettingsIcon } from "styled-icons/feather/Settings";
import { HelpCircle } from "styled-icons/feather/HelpCircle";

import ConfigDialog from "components/config";
import AboutPopup from "components/about";

import { NavPane } from "components/pageLayout";

const Icon = styled.div`
  margin: 0px 0px 0px 4px;
  padding: 2px 4px 2px 0px;
  cursor: default;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  box-sizing: border-box;

  background: ${props =>
    props.isSelected ? props.theme.borderdark : "transparent"};

  border-width: 0px 0px 0px 4px;
  border-style: solid;
  border-color: ${props =>
    props.isSelected ? props.theme.highlight : "transparent"};
  :hover {
    color: ${props => "#7f8c8d"};
  }
`;

const Navigation = props => {
  const [isHovered, setHover] = useState(false);
  return (
    <NavPane
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Icon
        isSelected={appStore.appState === "calendar"}
        onClick={() => {
          appStore.appState = "calendar";
        }}
      >
        <CalendarIcon size="36" />
        {isHovered ? "Calendar" : ""}
      </Icon>
      <Icon
        isSelected={appStore.appState === "tasks"}
        onClick={() => {
          appStore.appState = "tasks";
        }}
      >
        <TasksIcon size="36" />

        {isHovered ? "Tasks" : ""}
      </Icon>
      <Icon
        isSelected={appStore.isAboutOpen}
        onClick={() => {
          appStore.isAboutOpen = true;
        }}
      >
        <HelpCircle size="36" />

        {isHovered ? "Help" : ""}
      </Icon>
      <AboutPopup
        isAboutOpen={appStore.isAboutOpen}
        closeAbout={() => {
          appStore.isAboutOpen = false;
        }}
      />
      <div style={{ flex: 1 }} />
      <Icon
        isSelected={appStore.isConfigOpen}
        onClick={() => {
          appStore.isConfigOpen = true;
        }}
      >
        <SettingsIcon size="36" />

        {isHovered ? "Settings" : ""}
      </Icon>
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
          <Icon onClick={renderProps.onClick}>
            <LogOutIcon size="36" />

            {isHovered ? "Logout" : ""}
          </Icon>
        )}
      />
    </NavPane>
  );
};

export default view(Navigation);
