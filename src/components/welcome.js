import React from "react";
import { view } from "react-easy-state";
import config from "config";
import { GoogleLogin } from "react-google-login";
import appStore from "stores/appStore";
import styled, { css } from "styled-components";
import { ScaleLoader } from "react-spinners";

const override = css`
  display: flex;
  margin: 10px 4px;
  justify-content: center;
`;

const Welcome = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6f7;
`;

Welcome.Container = styled.div`
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
  margin-top: 12px;
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
          <br />
        </Welcome.Text>
        <Welcome.Login>
          {appStore.loadingData ? (
            <span style={{ display: "flex", alignItems: "center" }}>
              <ScaleLoader
                css={override}
                sizeUnit={"em"}
                size={1}
                color={"#1070ca"}
                loading={true}
              />
              Loading ...
            </span>
          ) : (
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
          )}
        </Welcome.Login>
      </Welcome.Container>
    </Welcome>
  );
};

export default view(WelcomePage);
