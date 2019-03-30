import React from "react";
import { view } from "react-easy-state";
import config from "./../config";
import { GoogleLogin } from "react-google-login";
import appStore from "../stores/appStore";
import styled from "styled-components";

const HApp = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6f7;
`;

const Welcome = styled.div`
  height: 30%;
  width: 30%;
  background: ${props => props.theme.darkgrey};
  color: #fdfdfd;
  border-radius: 5px;
  box-shadow: 0rem 0.5rem 1rem rgba(0, 0, 0, 0.3);
  padding: 12px;
  display: flex;
  flex-direction: column;
`;

Welcome.Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
Welcome.Text = styled.div``;

Welcome.Login = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthPage = () => {
  return (
    <HApp>
      <Welcome>
        <Welcome.Title>Welcome to haench's planner!</Welcome.Title>
        <Welcome.Text>
          <br /> You need to login with a google account to see all the beauty.
        </Welcome.Text>
        <Welcome.Login>
          <GoogleLogin
            clientId={config.clientId}
            scope="https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/calendar"
            onSuccess={response => appStore.init(response)}
            onFailure={response => console.log("onFailure", response)}
            onRequest={response => console.log("onRequest", response)}
            isSignedIn={true}
            // buttonText="Login"
            theme="dark"
            // icon={false}
          />
        </Welcome.Login>
      </Welcome>
    </HApp>
  );
};

export default view(AuthPage);
