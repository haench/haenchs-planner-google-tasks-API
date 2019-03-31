import React, { useState, useEffect } from "react";
import tasksStore from "stores/tasksStore";
import { view } from "react-easy-state";
import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styled from "styled-components";
import { format } from "date-fns";
import { deLocale } from "date-fns/locale/de";

const DetailsPane = styled.div`
  background: #f5f6f7;
  border-right: 1px solid #e4e7eb;
  flex: 1 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

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

const EditorWrapper = styled.div`
  margin: 8px 2px 2px 2px;
  /* flex: 1;
  display: flex; */
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
  const [task, setTask] = useState(props.task);
  // const task = tasksStore.selectedTask;
  // console.log(task);

  useEffect(() => {
    setTask(props.task);
  }, [props.task]);

  return (
    <DetailsPane>
      <Header>
        <DetailsTitle>{task.title}</DetailsTitle>
        <DateDisplay>
          Due:
          {task.due
            ? format(task.due, " Do MMM[.] YYYY", { locale: deLocale })
            : " -- -- ----"}
        </DateDisplay>
      </Header>
      <EditorWrapper>
        <SimpleMDEReact
          key={task.id}
          value={task.notes}
          onChange={value => {
            setTask({ ...task, notes: value });
          }}
          onBlur={() => {
            tasksStore.updateTask(task);
          }}
          options={{
            autofocus: false,
            spellChecker: false,
            // toolbar: false,
            placeholder: "Add note...",
            status: false,
            lineWrapping: true
            // minHeight: "100%"
          }}
        />
      </EditorWrapper>
      {/* <Footer /> */}
    </DetailsPane>
  );
};

export default view(TaskDetails);
