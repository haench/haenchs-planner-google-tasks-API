import React from "react";
import { view } from "react-easy-state";
import EventList from "components/calendar/eventList";
import CalendarSelector from "components/calendar/calendarSelector";
import Navigation from "components/navigation";

const CalendarNav = () => {
  return (
    <>
      {/* <Navigation /> */}
      <EventList />
      <CalendarSelector />
    </>
  );
};

export default view(CalendarNav);
