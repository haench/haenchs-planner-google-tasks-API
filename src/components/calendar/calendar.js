import React, { useRef, useEffect } from "react";
import { view } from "react-easy-state";
import eventStore from "stores/eventStore";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import deLocale from "@fullcalendar/core/locales/de";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "components/calendar/fc_finetuning.css";

function gApiEventSource(info, calendar) {
  // Load the Google+ API
  // return window.gapi.client.load("calendar", "v3").then(function() {
  // Assemble the API request
  console.log(info);
  var request = window.gapi.client.calendar.events.list({
    calendarId: calendar,
    timeMin: info.startStr,
    timeMax: info.endStr,
    singleEvents: "true",
    orderBy: "starttime"
  });
  // Execute the API request
  return request.then(
    response => response.result.items,
    reason => console.log("Error: " + reason.result.error.message)
  );
  // });
}

function ConvertGoogleEventsToFullCalendar(events) {
  console.log(events);
  return events.map(function(entry) {
    //console.log(entry);
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

function SingleEventSource(info, num) {
  return gApiEventSource(info, eventStore.calendarList[num]).then(
    events => ConvertGoogleEventsToFullCalendar(events),
    events => console.log("Error")
  );
}

function SingleEventSource2(info) {
  return gApiEventSource(info, eventStore.calendarList[2]).then(
    events => ConvertGoogleEventsToFullCalendar(events),
    events => console.log("Error")
  );
}

const Calendar = props => {
  function addEventSources(fullcalendar) {
    eventStore.calendarList.map(gCalendar => {
      console.log(gCalendar);
      // I need an to do:
      if (gCalendar.selected) {
        addEventSource(fullcalendar, gCalendar);
      }
    });
  }

  function addEventSource(fullcalendar, gCalendar) {
    fullcalendar.addEventSource({
      events: function(info) {
        return gApiEventSource(info, gCalendar.id).then(
          events => ConvertGoogleEventsToFullCalendar(events),
          events => console.log("Error")
        );
      },
      id: gCalendar.id,
      color: gCalendar.backgroundColor, // an option!
      textColor: "white" // an option!
    });
  }

  const calRef = useRef(null);

  useEffect(() => {
    addEventSources(calRef.current.getApi(), [eventStore.calendarList]);
  });

  return (
    <FullCalendar
      ref={calRef}
      defaultView={"dayGridMonth"}
      plugins={[dayGridPlugin]}
      // events={SingleEventSource}
      // eventSources={eventSources}
      eventTimeFormat={{
        hour: "numeric",
        minute: "2-digit",
        meridiem: false
      }}
      weekNumbers={true}
      weekNumberCalculation={"iso"}
      weekNumbersWithinDays={true}
      firstDay={1}
      showNonCurrentDates={true}
      locales={[deLocale]}
      height={"parent"}
    />
  );
};

export default view(Calendar);
