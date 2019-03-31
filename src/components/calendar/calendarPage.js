import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import Calendar from "./calendar";
import CalendarNav from "./calendarNav";

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
`;

const CalendarPage = view(() => {
  return (
    <PageWrapper>
      <CalendarNav />
      <Calendar
        showDaysOfWeek={true}
        showWeekSeparators={false}
        firstDayOfWeek={1}
      />
    </PageWrapper>
  );
});

export default CalendarPage;
