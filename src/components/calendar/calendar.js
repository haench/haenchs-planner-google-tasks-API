import React from "react";
import { view } from "react-easy-state";
import eventStore from "stores/eventStore";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

const Calendar = props => (
  <FullCalendar
    defaultView="dayGridMonth"
    plugins={[dayGridPlugin]}
    events={eventStore.events}
  />
);

export default view(Calendar);
