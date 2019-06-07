import React from "react";
import { view } from "react-easy-state";
import tasksStore from "stores/tasksStore";
// import listsStore from "stores/listsStore";
import { SortableElement } from "react-sortable-hoc";
import styled from "styled-components";
import Checkbox from "components/styled.components/checkbox";
import { DebounceInput } from "react-debounce-input";
import DeleteButton from "components/styled.components/deleteButton";
import { format } from "date-fns";
import { deLocale } from "date-fns/locale/de";
import Pill from "components/styled.components/pill";
import TaskDetails from "components/tasks/taskDetails.outline";

const LiTask = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  height: 36px;
  background: ${props =>
    props.selected ? props.theme.borderlight : props.theme.lightgrey};

  padding: ${props => (props.selected ? "0px" : "0px 4px 0px 4px")};
  border-width: ${props => (props.selected ? "0px 4px 0px 4px" : "0px")};
  border-style: solid;
  border-color: ${props => props.theme.borderlight};
  border-left-color: ${props =>
    props.selected ? props.theme.highlight : props.theme.borderlight};

  /* margin: 2px; */
  :hover {
    background: ${props => props.theme.borderlight};
  }
  &:hover ${DeleteButton} {
    visibility: visible;
    margin-left: auto;
  }
  &:hover input {
    background: ${props => props.theme.borderlight};
  }
  input {
    outline: none;
    border: none;
    padding: 4px;
    background: ${props =>
      props.selected ? props.theme.borderlight : props.theme.lightgrey};
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
  // const task = tasksStore.tasks[listsStore.currentListIndex][props.index];
  const task = tasksStore.currentTasks[props.index];

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
    <>
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
        <Pill>
          {task.due
            ? format(task.due, "Do MMM[.] YYYY", { locale: deLocale })
            : ""}
        </Pill>
        <DeleteButton
          onClick={() => tasksStore.deleteTask(task)}
          defaultHidden
          color={"#777"}
          size="24"
        />
      </LiTask>
      {/* {tasksStore.selectedTaskId == task.id ? (
        <TaskDetails
          key={tasksStore.selectedTask.id}
          task={tasksStore.selectedTask}
        />
      ) : null} */}
    </>
  );
};

export default SortableElement(view(Task));
