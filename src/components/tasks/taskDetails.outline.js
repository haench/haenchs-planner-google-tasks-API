import React, { useState, useCallback } from "react";
import tasksStore from "stores/tasksStore";
import { view } from "react-easy-state";
import Button from "components/styled.components/button";
import styled from "styled-components";
import { format } from "date-fns";
import { deLocale } from "date-fns/locale/de";
import { debounce } from "lodash";
import Editor from "rich-markdown-editor";
import Header from "components/styled.components/header";

const DateDisplay = styled.span`
  font-size: 16px;
  margin-right: 12px;
`;

const StyledEditor = styled(Editor)`
  margin: 2px 2px 2px 24px;
  padding: 4px 4px 4px 8px;
  justify-content: normal;
  overflow-y: auto;
  // border-width: 1px;
  // border-style: solid;
  // border-color: ${props => props.theme.borderlight};
  background: #fff;
`;

const TaskDetails = props => {
  const [isReadOnly, setReadOnly] = useState(true);
  const debounceUpdateTask = useCallback(
    debounce(value => {
      tasksStore.updateTask({ ...props.task, notes: value() });
    }, 500),
    []
  );

  return (
    <>
      <Header.Wrapper>
        <Header.Title>{props.task.title}</Header.Title>
        <DateDisplay>
          {props.task.due
            ? format(props.task.due, " Do MMM[.] YYYY", { locale: deLocale })
            : null}
        </DateDisplay>
        <Button onClick={() => setReadOnly(!isReadOnly)}>
          {isReadOnly ? "Edit" : "Save"}
        </Button>
      </Header.Wrapper>

      <StyledEditor
        key={props.task.id}
        readOnly={isReadOnly}
        defaultValue={props.task.notes}
        onChange={debounceUpdateTask}
        placeholder="Add note ..."
        onClickLink={href => {
          window.open(href);
        }}
      />
    </>
  );
};

export default view(TaskDetails);
