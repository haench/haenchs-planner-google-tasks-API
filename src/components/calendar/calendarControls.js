import React from "react";
import styled from "styled-components";
import eventStore from "../../stores/eventStore";
import { format } from "date-fns";
import { PlusSquare } from "styled-icons/feather/PlusSquare";
import { MinusSquare } from "styled-icons/feather/MinusSquare";

const Header = styled.div`
  flex: 0 0 80px;
  background: #fff;
  box-shadow: 0px 0px 1px 0px #e4e7eb;
  padding: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
`;

const DateDisplay = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const MonthControl = styled.div`
  display: flex;
  flex-direction: column;
`;

const CalendarControls = props => {
  return (
    <Header>
      <DateDisplay>
        {format(eventStore.startOfCalendar, "MMM YYYY")}
      </DateDisplay>
      <MonthControl>
        <PlusSquare size={16} />
        <MinusSquare size={16} />
      </MonthControl>
      <DateDisplay>
        - {format(eventStore.endOfCalendar, "MMM YYYY")}
      </DateDisplay>
      <MonthControl>
        <PlusSquare size={16} />
        <MinusSquare size={16} />
      </MonthControl>
    </Header>
  );
};

export default CalendarControls;
