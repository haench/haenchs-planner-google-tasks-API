import React from "react";
import { view } from "react-easy-state";
import Months from "components/calendar/months";
import DaysOfWeek from "components/calendar/daysOfWeek";
import styled from "styled-components";
import CalendarControls from "components/calendar/calendarControls";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import eventStore from "stores/eventStore";
import "react-big-calendar/lib/css/react-big-calendar.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

const CalendarPane = styled.div`
  background: #f5f6f7;
  border-right: 1px solid #e4e7eb;
  flex: 1 1;
  /* display: flex; */
  /* flex-direction: column; */
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

// const Calendar = props => {
//   return (
//     <CalendarPane>
//       <CalendarControls year={2019} showTodayButton={true} />
//       <CalendarTable>
//         <CalendarHeader>
//           {props.showDaysOfWeek ? <DaysOfWeek {...props} /> : null}
//         </CalendarHeader>
//         <CalendarBody>
//           <Months {...props} />
//         </CalendarBody>
//       </CalendarTable>
//     </CalendarPane>
//   );
// };

const Calendar = props => (
  <CalendarPane>
    <FullCalendar
      defaultView="dayGridMonth"
      plugins={[dayGridPlugin]}
      events={eventStore.events}
    />
  </CalendarPane>
);

export default view(Calendar);
