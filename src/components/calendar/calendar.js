import React from "react";
import { view } from "react-easy-state";
import eventStore from "stores/eventStore";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "components/calendar/fc_finetuning.css";

const Calendar = props => (
  <CalendarPane>
    <FullCalendar
      defaultView={"dayGridMonth"}
      plugins={[dayGridPlugin]}
      events={eventStore.events}
      weekNumberCalculation={"iso"}
      firstDay={1}
      showNonCurrentDates={false}
    />
  </CalendarPane>
);

export default view(Calendar);
