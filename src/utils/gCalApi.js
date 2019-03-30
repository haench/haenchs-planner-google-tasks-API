export default {
  async deleteEvent(calendarId, eventId) {
    console.log("deleteEvent ", eventId, calendarId);
    window.gapi.client.load("calendar", "v3").then(() => {
      window.gapi.client.calendar.events
        .delete({
          calendarId: calendarId,
          eventId: eventId
        })
        .then(
          resp => console.log("Event was successfully deleted!"),
          reason => console.log("Error: " + reason.result.error.message)
        );
    });
  },

  async insertEvent(calendarId, event) {
    console.log("insertEvent ", event);
    return window.gapi.client.load("calendar", "v3").then(() => {
      window.gapi.client.calendar.events
        .insert({
          calendarId: calendarId,
          resource: event
        })
        .then(
          resp => console.log("Event was successfully inserted!"),
          reason => console.log("Error: " + reason.result.error.message)
        );
    });
  },

  async updateEvent(calendarId, eventId, resource) {
    console.log("updateEvent(eventID,resource)");
    return window.gapi.client.load("calendar", "v3").then(() => {
      window.gapi.client.calendar.events
        .patch({
          calendarId: calendarId, //calID,
          eventId: eventId,
          resource: resource
        })
        .then(
          resp => console.log("Event was successfully updated!"),
          reason => console.log("Error: " + reason.result.error.message)
        );
    });
  },

  async getEvent(calendarId, eventId) {
    console.log("getActiveEvent()");
    return window.gapi.client.load("calendar", "v3").then(() => {
      window.gapi.client.calendar.events
        .get({
          calendarId: calendarId,
          eventId: eventId
        })
        .then(
          resp => resp.result,
          reason => console.log("Error: " + reason.result.error.message)
        );
    });
  },

  async listCalendars() {
    console.log("listWritableCalendars()");
    try {
      const response = await window.gapi.client.calendar.calendarList.list({
        showHidden: "true"
      });
      return response.result.items;
    } catch (error) {
      console.log("Error: ", error);
    }
  },

  async listEvents(calendar, startTime, endTime) {
    console.log("listEvents");
    try {
      const response = await window.gapi.client.calendar.events.list({
        calendarId: calendar,
        timeMin: rfc3339(startTime),
        timeMax: rfc3339(endTime),
        singleEvents: true,
        orderBy: "starttime"
      });
      return response.result.items;
    } catch (err) {
      return console.log("Something went wrong.", err);
    }
  }
};

function rfc3339(d) {
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  function timezoneOffset(offset) {
    var sign;
    if (offset === 0) {
      return "Z";
    }
    sign = offset > 0 ? "-" : "+";
    offset = Math.abs(offset);
    return sign + pad(Math.floor(offset / 60)) + ":" + pad(offset % 60);
  }

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    "T" +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds()) +
    timezoneOffset(d.getTimezoneOffset())
  );
}
