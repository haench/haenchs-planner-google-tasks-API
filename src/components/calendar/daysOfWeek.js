import React from "react";
import styled from "styled-components";
import { format, startOfWeek, addDays, isMonday } from "date-fns";

const WeekSeperator = styled.th`
  pointer-events: none;
  padding: 0;
  width: 8px;
  min-width: 0;
`;

const WeekDay = styled.th`
  pointer-events: none;
  font-weight: ${({ bolder }) => (bolder ? "bold" : "normal")};
`;

const WeekDummy = styled.th`
  font-weight: normal;
  padding: 10px 3px;
`;

const DaysOfWeek = props => {
  const { firstDayOfWeek, forceFullWeeks, showWeekSeparators } = props;
  const totalDays = forceFullWeeks ? 42 : 37;

  const firstDay = startOfWeek(new Date(), { weekStartsOn: firstDayOfWeek });

  const days = [];
  for (let i = 0; i < totalDays; i++) {
    const day = addDays(firstDay, i);

    if (showWeekSeparators && isMonday(day)) {
      days.push(<WeekSeperator key={`seperator-${i}`} />);
    }
    days.push(<WeekDay key={`weekday-${i}`}>{format(day, "dd")}</WeekDay>);
  }

  return (
    <tr>
      <WeekDummy />
      {days}
    </tr>
  );
};

export default DaysOfWeek;
