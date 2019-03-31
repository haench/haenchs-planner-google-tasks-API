import React from "react";
import { format } from "date-fns";
import deLocale from "date-fns/locale/de";
import { view } from "react-easy-state";
import styled from "styled-components";
import eventStore from "stores/eventStore";
import Dot from "components/styled.components/dot.styled";

const SnappingList = styled.div`
  flex: 1 0;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.darkgrey};
  }
  ::-webkit-scrollbar-thumb {
    background: #475760;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #5e737f;
  }
`;

const DayHeader = styled.div`
  font-variant: small-caps;
  padding-left: 8px;
  background: ${props => props.theme.darkgrey};
  height: 32px;
  display: flex;
  align-items: center; /* align vertical */
  scroll-snap-align: start;
`;

const Events = styled.div``;

const Event = styled.div`
  padding-left: 8px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  :hover {
    background: ${props => props.theme.highlight};
  }
`;

const ShortEventTitle = styled.span`
  flex: 1 1 auto;
  margin-left: 8px;
  color: ${props => props.theme.lightgrey};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const LongEventTitle = styled.span`
  flex: 0 1 auto;
  margin-left: 8px;
  color: ${props => props.theme.lightgrey};
  background: ${props => props.color || "transparent"};
  border-radius: 2px;
  padding-left: 4px;
  padding-right: 4px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const EventTime = styled.span`
  flex: 0 0 auto;
  margin-left: 8px;
  margin-right: 8px;
  color: #888;
`;

const ShortEvent = props => {
  return (
    <Event>
      <Dot size={8} color={props.event.color} />
      <ShortEventTitle>
        {props.event.title === undefined ? "Hidden event" : props.event.title}
      </ShortEventTitle>
      <EventTime>
        {format(props.event.start, "H:mm")}-{format(props.event.end, "H:mm")}
      </EventTime>
    </Event>
  );
};

const LongEvent = props => {
  return (
    <Event>
      <LongEventTitle color={props.event.color}>
        {props.event.title === undefined ? "Hidden event" : props.event.title}
      </LongEventTitle>
      <span style={{ flex: "1" }} />
      <EventTime>all-day</EventTime>
    </Event>
  );
};

const EventList = () => {
  const renderDaysWithEvents = eventStore.daysWithEvents.map((day, index) => {
    const currentDay = day.hasEvents ? (
      <React.Fragment key={index}>
        <DayHeader
          ref={eventStore.daysWithEvents[index].listRef}
          className={`DayHeader-${index}`}
        >
          {format(day.date, "Do MMMM YYYY", { locale: deLocale })}
        </DayHeader>
        <Events>
          {day.shortEvents.map((event, index) =>
            event ? <ShortEvent key={index} event={event} /> : null
          )}
          {day.longEvents.map((event, index) =>
            event ? <LongEvent key={index} event={event} /> : null
          )}
        </Events>
      </React.Fragment>
    ) : null;
    return currentDay;
  });

  return <SnappingList>{renderDaysWithEvents}</SnappingList>;
};

export default view(EventList);
