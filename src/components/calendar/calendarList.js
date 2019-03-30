import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import eventStore from "../../stores/eventStore";
import Filledbox from "./../filledbox";
import useCollapse from "react-collapsed";
import { List as CalList } from "styled-icons/feather/List";

const List = styled.div`
  flex: 0 0 auto;
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
  border-top: 1px solid #475760;
`;

const Item = styled.div`
  margin: 0px 0px 0px 4px;
  padding: 0px 16px 0px 4px;
  line-height: 36px;
  height: 36px;
  overflow: hidden;
  cursor: default;
  scroll-snap-align: start;

  font-size: 14px;
  font-weight: 400;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: left;
`;

const Title = styled.span`
  margin-top: 0px;
  margin-right: 4px;
  margin-bottom: 0px;
  margin-left: 4px;
  vertical-align: middle;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const CalendarButton = styled.div`
  cursor: default;
  outline: none;
  border-top: 1px solid #475760;
`;

const CalendarList = () => {
  const { getCollapseProps, getToggleProps, isOpen } = useCollapse();
  return (
    <React.Fragment>
      <List {...getCollapseProps()}>
        {eventStore.calendarList.map(cal => (
          <Item>
            <Filledbox checked={cal.selected} color={cal.backgroundColor} />

            <Title>{cal.summary}</Title>
          </Item>
        ))}
      </List>
      <CalendarButton {...getToggleProps()}>
        <Item>
          <CalList size="24" />
          <Title> {isOpen ? "Hide calendars" : "Show calendars"}</Title>
        </Item>
      </CalendarButton>
    </React.Fragment>
  );
};

export default view(CalendarList);
