import React from "react";
import Dot from "components/styled.components/dot";
import Line from "components/styled.components/line";
import { view } from "react-easy-state";
import styled from "styled-components";
import { isWeekend, isToday } from "date-fns";

const DayDate = styled.div`
  flex: 1;
  font-weight: ${({ bold }) => (bold ? "bold" : "")};
`;

const DayCell = styled.td`
  text-align: center;
  vertical-align: text-top;
  padding: 0px;
  cursor: pointer;
  border: 1px solid rgba(185, 185, 185, 0.13);
  background-color: white;
  min-width: 32px;
  ${({ today }) => (today ? "background : blue" : "")};
`;

const Day = props => {
  const { day } = props;

  const renderSingleEvents = day => {
    return day.shortEvents.map((event, index) =>
      event ? (
        <Dot key={index} color={event.color} />
      ) : (
        <Dot key={index} color={"transparent"} />
      )
    );
  };

  const renderAlldayEvents = day => {
    return day.longEvents.map((event, index) =>
      event ? (
        <Line
          key={index}
          color={event.color}
          first={event.isFirstDay}
          last={event.isLastDay}
          allday={event.allday}
        />
      ) : (
        <Line
          key={index}
          color={"transparent"}
          first={false}
          last={true}
          allday={true}
        />
      )
    );
  };

  const scrollToThisDay = () => {
    console.log(day);
    if (day.listRef.current)
      day.listRef.current.scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
  };

  return (
    <DayCell
      today={isToday(day.date)}
      onClick={() => scrollToThisDay()}
      // onMouseEnter={() => console.log("Hover", day)}
    >
      <DayDate bold={isWeekend(day.date)}>{day.date.getDate()}</DayDate>
      <>{renderSingleEvents(day)}</>
      <>{renderAlldayEvents(day)}</>
    </DayCell>
  );
};
export default view(Day);
