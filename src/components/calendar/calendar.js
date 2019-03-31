import React from "react";
import Months from "components/calendar/months";
import DaysOfWeek from "components/calendar/daysOfWeek";
import styled from "styled-components";
import CalendarControls from "components/calendar/calendarControls";

const CalendarPane = styled.div`
  background: #f5f6f7;
  border-right: 1px solid #e4e7eb;
  flex: 1 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CalendarTable = styled.table`
  border-collapse: collapse;
`;

const CalendarHeader = styled.thead`
  background: ${props => props.theme.darkgrey};
  color: white;
  margin-bottom: 3px;
  border-bottom: 2px solid white;
`;

const CalendarBody = styled.tbody`
  font-size: 0.8em;
`;

const Calendar = props => {
  return (
    <CalendarPane>
      <CalendarControls year={2019} showTodayButton={true} />
      <CalendarTable>
        <CalendarHeader>
          {props.showDaysOfWeek ? <DaysOfWeek {...props} /> : null}
        </CalendarHeader>
        <CalendarBody>
          <Months {...props} />
        </CalendarBody>
      </CalendarTable>
    </CalendarPane>
  );
};
export default Calendar;
