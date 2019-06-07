import { createRef } from "react";
import { store } from "react-easy-state";
import gCalApi from "utils/gCalApi";

import {
  parse,
  differenceInCalendarDays,
  eachDay,
  isSameDay,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isMonday,
  startOfWeek,
  addWeeks
} from "date-fns";

const eventStore = store({
  calendarList: [],
  events: [],
  daysWithEvents: [],
  startOfCalendar: new Date(2019, 0),
  endOfCalendar: new Date(2020, 0),
  todayref: undefined,

  async fetchCalendars() {
    eventStore.calendarList = await gCalApi.listCalendars();
    // console.log(eventStore.calendarList);
  },

  async fetchEvents() {
    await Promise.all(
      eventStore.calendarList.map(async calendar => {
        if (!calendar.hidden && calendar.selected)
          return await eventStore.fetchEventsFrom(calendar);
      })
    );
  },

  async fetchEventsFrom(calendar) {
    await gCalApi
      .listEvents(
        calendar.id,
        eventStore.startOfCalendar,
        eventStore.endOfCalendar
      )
      .then(events => {
        eventStore.events = [
          ...eventStore.events,
          ...events.map(entry => {
            return (entry = {
              id: entry.id,
              title: entry.summary,
              start: parse(entry.start.dateTime || entry.start.date),
              end: parse(entry.end.dateTime || entry.end.date),
              daySpan: differenceInCalendarDays(
                parse(entry.end.dateTime || entry.end.date),
                parse(entry.start.dateTime || entry.start.date)
              ),
              allDay: !!differenceInCalendarDays(
                parse(entry.end.dateTime || entry.end.date),
                parse(entry.start.dateTime || entry.start.date)
              ),
              url: entry.htmlLink,
              location: entry.location,
              description: entry.description,
              calendarId: calendar.id,
              color: calendar.backgroundColor
            });
          })
        ];
      });
  },

  buildYear() {
    // console.time("concatenation");

    // var days = eachDay(
    //   eventStore.startOfCalendar,
    //   eventStore.endOfCalendar
    var days = eachDay(new Date(), addWeeks(startOfWeek(new Date()), 2)).map(
      day => ({
        date: day,
        isFirstDayOfMonth: isFirstDayOfMonth(day),
        isLastDayOfMonth: isLastDayOfMonth(day),
        isFirstDayOfWeek: isMonday(day),
        shortEvents: [...new Array(1)],
        longEvents: [...new Array(1)],
        hasEvents: false,
        listRef: createRef(null)
      })
    );

    eventStore.events.forEach(event => {
      // console.log(event.daySpan);
      let insertIndex;
      eachDay(event.start, event.end).forEach((eventDay, index, array) => {
        const calDay = days.find(_day => isSameDay(_day.date, eventDay));
        if (calDay) {
          if (!!event.daySpan) {
            if (index === 0) {
              insertIndex = getNextFreeSlot(calDay.longEvents);
              event.rowIndex = insertIndex;
            }
            if (index < array.length - 1) {
              calDay.hasEvents = true;
              calDay.longEvents[insertIndex] = {
                ...event,
                isFirstDay: index === 0,
                isLastDay: index === array.length - 2
              };
            }
          } else {
            calDay.hasEvents = true;
            calDay.shortEvents.push(event);
          }
        }
      });
    });
    eventStore.daysWithEvents = days;
    // console.timeEnd("concatenation");
    // console.log("events:", eventStore.events);
    // console.log("days: ", eventStore.daysWithEvents);
  }
});

const getNextFreeSlot = array => {
  for (let i = 0; i < array.length; i++)
    if (!array[i]) {
      return i;
    }
  return array.length;
};

export default eventStore;
