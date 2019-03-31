import React from "react";
import { view } from "react-easy-state";
import config from "../config";
import { GoogleLogin } from "react-google-login";
import appStore from "../stores/appStore";
import styled from "styled-components";

const Welcome = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6f7;
`;

Welcome.Container = styled.div`
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
Welcome.Text = styled.div`
  text-align: justify;
`;

Welcome.Login = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WelcomePage = () => {
  return (
    <Welcome>
      <Welcome.Container>
        <Welcome.Title>Welcome to haenchs planner!</Welcome.Title>
        <Welcome.Text>
          <br />
          haenchs planner is a desktop PWA that integrates with google tasks and
          calendar. It’s basically a nicer way to organize tasks/events you
          already have in your google account. Everything you do is synced back
          to your google account. It is neither optimized nor intedet to be used
          on mobile.
          <br />
          <br /> You need to login with a google account to see all the beauty.
        </Welcome.Text>
        <Welcome.Login>
          <GoogleLogin
            clientId={config.clientId}
            scope="https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/calendar"
            onSuccess={response => appStore.init(response)}
            // onSuccess={response => console.log("login")}
            onFailure={response => console.log("onFailure", response)}
            onRequest={response => console.log("onRequest", response)}
            isSignedIn={true}
            // buttonText="Login"
            theme="dark"
          />
        </Welcome.Login>
      </Welcome.Container>
    </Welcome>
  );
};

export default view(WelcomePage);
