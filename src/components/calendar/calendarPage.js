import React from "react";
import { view } from "react-easy-state";
import Calendar from "components/calendar/calendar";
import CalendarNav from "components/calendar/calendarNav";
import Navigation from "components/navigation_vertical";
import {
  PageWrapper,
  NavPane,
  FixedPane,
  FlexPane
} from "components/pageLayout";

const CalendarPage = view(() => {
  return (
    <PageWrapper>
      <NavPane>
        <Navigation />
      </NavPane>
      <FixedPane>
        <CalendarNav />
      </FixedPane>
      <FlexPane>
        <Calendar
          showDaysOfWeek={true}
          showWeekSeparators={false}
          firstDayOfWeek={1}
        />
      </FlexPane>
    </PageWrapper>
  );
});

export default CalendarPage;
