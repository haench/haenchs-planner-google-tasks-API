import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import EventList from "./eventList";
import CalendarSelector from "./calendarSelector";
import Navigation from "./../navigation.component";

const NavigationPane = styled.div`
  background: ${props => props.theme.darkgrey};
  color: #fdfdfd;
  border-right: 1px solid #475760;
  flex: 1 1;
  max-width: 25%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CalendarNav = () => {
  return (
    <NavigationPane>
      <Navigation />
      <EventList />
      <CalendarSelector />
    </NavigationPane>
  );
};

export default view(CalendarNav);
