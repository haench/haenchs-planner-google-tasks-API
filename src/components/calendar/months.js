import React from "react";
import Day from "components/calendar/day";
import { view } from "react-easy-state";
import styled from "styled-components";
import {
  format,
  startOfWeek,
  differenceInDays,
  getDaysInMonth
} from "date-fns";
import eventStore from "stores/eventStore";

const WeekSeperator = styled.td`
  pointer-events: none;
  padding: 0;
  width: 8px;
  min-width: 0;
  font-style: oblique;
  font-size: 0.8em;
  vertical-align: text-top;
  text-align: center;
  /* background: #fff; */
`;

const MonthName = styled.td`
  font-weight: bold;
  text-align: left;
  cursor: default;
  border-left: none;
`;

const DummyDay = styled.td`
  /* background: #eee;
  text-align: center;
  vertical-align: text-top;
  padding: 0px;
  cursor: pointer;
  border: 1px solid rgba(185, 185, 185, 0.13);
  min-width: 32px; */
`;

const Months = ({ showWeekSeparators, firstDayOfWeek, ...props }) => {
  const renderMonthDays = () => {
    console.time("concatenation");
    const months = [];
    var days = [];
    var daysInMonth;
    var prependDays;
    eventStore.daysWithEvents.forEach((day, index, arr) => {
      if (day.isFirstDayOfMonth) {
        daysInMonth = getDaysInMonth(day.date);
        days.push(<MonthName>{format(day.date, "MMM")}</MonthName>);
        if (showWeekSeparators)
          days.push(
            <WeekSeperator key={`seperator-${index}`}>
              <span>{format(day.date, "W")}</span>
            </WeekSeperator>
          );
      }
      if (
        !day.isFirstDayOfMonth &&
        day.isFirstDayOfWeek &&
        showWeekSeparators
      ) {
        days.push(
          <WeekSeperator key={`seperator-${index}`}>
            <span>{format(day.date, "W")}</span>
          </WeekSeperator>
        );
      }
      if (day.isFirstDayOfMonth) {
        prependDays = differenceInDays(
          day.date,
          startOfWeek(day.date, {
            weekStartsOn: firstDayOfWeek
          })
        );
        for (let i = 0; i < prependDays; i++) {
          days.push(<DummyDay key={`dummyday-${index * i}`} />);
        }
      }

      days.push(<Day key={`day-${index}`} day={day} />);

      if (day.isLastDayOfMonth) {
        const appendDays = 37 - prependDays - daysInMonth;

        for (let i = 0; i < appendDays; i++) {
          if (days.length % 7 === 6) {
            if (showWeekSeparators)
              days.push(
                <WeekSeperator key={`seperator-${index}`}>
                  <span>{format(day.date, "W")}</span>
                </WeekSeperator>
              );
          }
          days.push(<DummyDay key={`dummyday2-${index * i}`} />);
        }
        months.push(<tr key={`month-${index}`}>{days}</tr>);
        // console.log(months);
        days = [];
      }
    });
    console.timeEnd("concatenation");
    return months;
  };

  return renderMonthDays();
};

export default view(Months);
