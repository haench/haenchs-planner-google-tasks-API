import React, { useState, useCallback, useReducer } from "react";
import tasksStore from "stores/tasksStore";
import { view } from "react-easy-state";
import Button from "components/styled.components/button";
import styled from "styled-components";
import { format } from "date-fns";
import { deLocale } from "date-fns/locale/de";
import { debounce } from "lodash";
import Editor from "rich-markdown-editor";
import Header from "components/styled.components/header";
import EditButton from "components/styled.components/editButton";
import SaveButton from "components/styled.components/saveButton";
import { DateSingleInput } from "@datepicker-react/styled";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

const DateDisplay = styled.span`
  font-size: 16px;
  margin-right: 12px;
`;

const StyledEditor = styled(Editor)`
  margin: 2px 24px 2px 24px;
  padding: 4px 4px 4px 8px;
  justify-content: normal;
  overflow-y: auto;
  background: #fff;
`;

const Seperator = styled.div`
  margin: 8px 2px 8px 2px;
  border-width: 1px 0px 0px 0px;
  border-color: ${props => props.theme.borderlight};
  border-style: solid;
`;

const ThemedDateSingleInput = styled(DateSingleInput)`
  label {
    border: 0px solid #bcbec0;
    background: #444444;
  }
`;

const TaskDetails = props => {
  const [isReadOnly, setReadOnly] = useState(true);

  const debounceUpdateTask = useCallback(
    debounce(value => {
      tasksStore.updateTask({ ...props.task, notes: value() });
    }, 500),
    []
  );

  const handleDayChange = day => {
    tasksStore.updateTask({ ...props.task, due: day.toISOString() });
  };

  return (
    <>
      <Header.Wrapper>
        <Header.Title>{props.task.title}</Header.Title>
        <DayPickerInput
          style={{
            marginRight: "72px"
          }}
          onDayChange={handleDayChange}
        />

        {isReadOnly ? (
          <EditButton
            onClick={() => {
              setReadOnly(false);
            }}
            color="#475760"
            size="24"
          />
        ) : (
          <SaveButton
            onClick={() => {
              setReadOnly(true);
            }}
            color="#475760"
            size="24"
          />
        )}
        {/* <DateDisplay>
          {props.task.due
            ? format(props.task.due, " Do MMM[.] YYYY", { locale: deLocale })
            : null}
        </DateDisplay> */}
      </Header.Wrapper>
      <Seperator />
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
