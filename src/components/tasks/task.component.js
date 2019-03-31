import React from "react";
import { view } from "react-easy-state";
import tasksStore from "../../stores/tasksStore";
import { SortableElement } from "react-sortable-hoc";
import styled from "styled-components";
import Checkbox from "components/styled.components/checkbox";
import { DebounceInput } from "react-debounce-input";
import DeleteButton from "components/styled.components/deleteButton";

const LiTask = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  height: 32px;
  background: ${props => (props.selected ? "#e4e7eb" : "#f9f9fb")};

  padding: ${props => (props.selected ? "1px" : "0px 4px 0px 4px")};
  border-width: ${props => (props.selected ? "0px 4px 0px 4px" : "1px")};
  border-style: solid;
  border-color: #e4e7eb;
  border-left-color: ${props =>
    props.selected ? props.theme.highlight : props.theme.borderlight};

  margin: 2px;
  :hover {
    background: #e4e7eb;
  }
  &:hover ${DeleteButton} {
    display: flex;
    margin-left: auto;
  }
  &:hover input {
    background: #e4e7eb;
  }
  input {
    outline: none;
    border: none;
    padding: 4px;
    background: ${props => (props.selected ? "#e4e7eb" : "#f9f9fb")};
    text-decoration: ${props => (props.checked ? "line-through" : "none")};
    vertical-align: middle;
    flex-grow: 1;
    :hover {
      background: #e4e7eb;
    }
    font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
      -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  }
`;

const Task = props => {
  const task = props.task;
  const isSelected = tasksStore.selectedTaskId === task.id;
  const isChecked = task.status === "completed";

  const toggleTask = () => {
    !isChecked
      ? tasksStore.updateTask({ ...task, status: "completed" })
      : tasksStore.updateTask({
          ...task,
          completed: null,
          status: "needsAction"
        });
  };

  return (
    <LiTask
      {...props}
      checked={isChecked}
      selected={isSelected}
      onClick={() => {
        tasksStore.selectedTask = task;
      }}
    >
      <Checkbox checked={isChecked} onClick={toggleTask} />
      <DebounceInput
        id="task"
        minLength={2}
        debounceTimeout={300}
        onChange={event =>
          tasksStore.updateTask({ ...task, title: event.target.value })
        }
        value={task.title}
        autoFocus={isSelected}
        key={isSelected}
      />
      <DeleteButton
        onClick={() => tasksStore.deleteTask(task)}
        hidden
        color={"#777"}
        size="24"
      />
    </LiTask>
  );
};

export default SortableElement(view(Task));
