import React from "react";
import tasksStore from "stores/tasksStore";
import listsStore from "stores/listsStore";
import { view } from "react-easy-state";
import Task from "components/tasks/task";
import { SortableContainer } from "react-sortable-hoc";
import TaskForm from "components/tasks/taskForm";
import styled from "styled-components";
import Header from "components/styled.components/header";
import TasksFooter from "components/tasks/tasksFooter";

const ListOfTasks = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: 0px 2px 0px 2px;
`;

const SortableList = view(
  SortableContainer(({ tasks }) => {
    return (
      <ListOfTasks>
        {tasks.map((task, index) => (
          <Task key={task.id} index={index} task={task} />
        ))}
      </ListOfTasks>
    );
  })
);

const Tasks = () => {
  const list = listsStore.currentList;
  if (!list) return null;
  const tasks = tasksStore.currentTasks;

  const shouldCancelStart = event => {
    // Cancel sorting if the event target is an `Checkbox`
    return event.target.tagName.toLowerCase() === "button";
  };

  return (
    <>
      <Header.Wrapper>
        <Header.Title>{list.shortTitle}</Header.Title>
      </Header.Wrapper>

      <TaskForm
        submitFcn={title => tasksStore.insertTask(list.id, { title: title })}
        placeholder="Add task..."
      />
      <SortableList
        tasks={tasks}
        distance={10}
        shouldCancelStart={shouldCancelStart}
        onSortEnd={end => tasksStore.moveTask(end)}
      />
      <TasksFooter />
    </>
  );
};

export default view(Tasks);
