import React, { useCallback } from "react";
import tasksStore from "stores/tasksStore";
import { view } from "react-easy-state";

import "easymde/dist/easymde.min.css";
import styled from "styled-components";
import { format } from "date-fns";
import { deLocale } from "date-fns/locale/de";
import { debounce } from "lodash";
import Editor from "rich-markdown-editor";

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

const DateDisplay = styled.span`
  font-size: 16px;
  margin-right: 12px;
`;

const DetailsTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  flex: 1;
`;

const StyledEditor = styled(Editor)`
  margin: 8px 2px 2px 2px;
  padding: 4px 4px 4px 8px;
  justify-content: normal;
  overflow-y: auto;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.borderlight};
  background: #fff;
`;

// const Footer = styled.div`
//   flex: 0 0 32px;
//   background: #fff;
//   /* box-shadow: 0px -1px 0px 0px #e4e7eb; */
//   border-top: 1px solid #e4e7eb;
//   padding: 4px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   box-sizing: border-box;
// `;

const TaskDetails = props => {
  const debounceUpdateTask = useCallback(
    debounce(value => {
      tasksStore.updateTask({ ...props.task, notes: value() });
    }, 500),
    []
  );

  return (
    <>
      <Header>
        <DetailsTitle>{props.task.title}</DetailsTitle>
        <DateDisplay>
          Due:
          {props.task.due
            ? format(props.task.due, " Do MMM[.] YYYY", { locale: deLocale })
            : " -- -- ----"}
        </DateDisplay>
      </Header>

      <StyledEditor
        key={props.task.id}
        defaultValue={props.task.notes}
        onChange={debounceUpdateTask}
        placeholder="Add note ..."
      />
      {/* <Footer /> */}
    </>
  );
};

export default view(TaskDetails);
