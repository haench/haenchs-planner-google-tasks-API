import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import Calendar from "components/calendar/calendar";
import CalendarNav from "components/calendar/calendarNav";

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
