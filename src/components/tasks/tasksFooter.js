import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import tasksStore from "stores/tasksStore";
import listsStore from "stores/listsStore";
import { ToggleLeft } from "styled-icons/feather/ToggleLeft";
import { ToggleRight } from "styled-icons/feather/ToggleRight";
import Button from "components/styled.components/button";

const Footer = styled.div`
  flex: 0 0 32px;
  background: #fff;
  /* box-shadow: 0px -1px 0px 0px #e4e7eb; */
  border-top: 1px solid #e4e7eb;
  padding: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
`;

const MyToggle = props => {
  return (
    <div onClick={props.onClick} style={{ margin: "4px" }}>
      {props.defaultChecked ? (
        <ToggleRight size="24" style={{ verticalAlign: "middle" }} />
      ) : (
        <ToggleLeft size="24" style={{ verticalAlign: "middle" }} />
      )}
      <span
        style={{
          marginLeft: "4px",
          height: "24",
          fontSize: "12px",
          verticalAlign: "center"
        }}
      >
        {props.label}
      </span>
    </div>
  );
};

const TasksFooter = () => {
  const toggleShowHidden = () => {
    tasksStore.display.showHidden = !tasksStore.display.showHidden;
    // tasksStore.listTasks(list.id);
  };

  const toggleShowDeleted = () => {
    tasksStore.display.showDeleted = !tasksStore.display.showDeleted;
    // tasksStore.listTasks(list.id);
  };
  return (
    <Footer>
      <MyToggle
        defaultChecked={tasksStore.display.showHidden}
        onClick={toggleShowHidden}
        label="Show hidden"
      />

      <MyToggle
        defaultChecked={tasksStore.display.showDeleted}
        onClick={toggleShowDeleted}
        label="Show deleted"
      />
      <div style={{ flex: "1" }} />
      <Button onClick={() => tasksStore.clearTasks()}>Clear completed</Button>
    </Footer>
  );
};

export default view(TasksFooter);
