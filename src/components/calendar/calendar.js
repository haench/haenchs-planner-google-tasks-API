import React, { useRef, useEffect, useState } from "react";
import { view } from "react-easy-state";
import gCalApi from "utils/gCalApi";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import deLocale from "@fullcalendar/core/locales/de";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "components/calendar/fc_finetuning.css";

function gApiEventSource(info, calendar) {
  var request = window.gapi.client.calendar.events.list({
    calendarId: calendar.id,
    timeMin: info.startStr,
    timeMax: info.endStr,
    singleEvents: "true",
    orderBy: "starttime"
  });
  return request.then(
    response => response.result.items,
    reason => console.log("Error: " + reason.result.error.message)
  );
}

function ConvertGoogleEventsToFullCalendar(events) {
  return events.map(function(entry) {
    var eventsList = {
      id: entry.id,
      title: entry.summary,
      start: entry.start.dateTime || entry.start.date, // try timed. will fall back to all-day
      end: entry.end.dateTime || entry.end.date, // same
      url: entry.htmlLink,
      location: entry.location,
      description: entry.description
    };
    return eventsList;
  });
}

function addEventSources(fullcalendar, calendars) {
  calendars.map(calendar => {
    if (calendar.selected) {
      fullcalendar.addEventSource({
        events: function(info) {
          return gApiEventSource(info, calendar).then(
            events => ConvertGoogleEventsToFullCalendar(events),
            error => console.log("Error")
          );
        },
        id: calendar.id,
        color: calendar.backgroundColor, // an option!
        textColor: "white" // an option!
      });
    }
  });
}

const Calendar = props => {
  const [calendars, setCalendars] = useState([]);
  const calRef = useRef(null);

  useEffect(() => {
    const fetchCalendars = async () => {
      const fetchedCalendars = await gCalApi.listCalendars();
      setCalendars(fetchedCalendars);
    };
    fetchCalendars();
  }, []);

  useEffect(() => {
    addEventSources(calRef.current.getApi(), calendars);
  }, [calendars]);

  return (
    <FullCalendar
      ref={calRef}
      defaultView={"dayGridMonth"}
      plugins={[dayGridPlugin]}
      eventTimeFormat={{
        hour: "numeric",
        minute: "2-digit",
        meridiem: false
      }}
      weekNumbers={true}
      weekNumberCalculation={"iso"}
      firstDay={props.firstDayOfWeek}
      showNonCurrentDates={true}
      locales={[deLocale]}
      height={"parent"}
    />
  );
};

export default view(Calendar);
