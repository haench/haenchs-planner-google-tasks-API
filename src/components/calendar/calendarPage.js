import React from "react";
import { view } from "react-easy-state";
import Calendar from "components/calendar/calendar";
import Navigation from "components/navigation_vertical";
import { PageWrapper, FixedPane, FlexPane } from "components/pageLayout";
import EventList from "components/calendar/eventList";
import CalendarSelector from "components/calendar/calendarSelector";

const CalendarPage = view(() => {
  return (
    <PageWrapper>
      <Navigation />
      <FixedPane>
        <EventList />
        <CalendarSelector />
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
