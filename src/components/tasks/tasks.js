import React from "react";
import tasksStore from "stores/tasksStore";
import listsStore from "stores/listsStore";
import { view } from "react-easy-state";
import Task from "components/tasks/task";
import { SortableContainer } from "react-sortable-hoc";
import TaskForm from "components/tasks/taskForm";
import arrayMove from "array-move";
import styled from "styled-components";
import Header from "components/styled.components/header";

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

  const moveTask = ({ oldIndex, newIndex }) => {
    const movedTask = tasks[oldIndex];
    const _tasks = arrayMove(tasks, oldIndex, newIndex);
    const siblingTaskId = newIndex > 0 ? _tasks[newIndex - 1].id : null;
    tasksStore.moveTask(movedTask, siblingTaskId);
  };

  return (
    <>
      <Header.Wrapper
      // style={{ background: "#fff", boxShadow: "0px 0px 1px 0px #e4e7eb" }}
      >
        <Header.Title>{list.shortTitle}</Header.Title>
      </Header.Wrapper>

      <SortableList
        tasks={tasks}
        distance={10}
        shouldCancelStart={shouldCancelStart}
        onSortEnd={end => tasksStore.moveTask(end)}
      />
      <TaskForm
        submitFcn={title => tasksStore.insertTask(list.id, { title: title })}
        placeholder="Add task..."
      />
      {/* <TasksFooter> */}
    </>
  );
};

export default view(Tasks);
