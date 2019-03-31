import React from "react";
import { view } from "react-easy-state";
import TaskLists from "components/tasks/tasklists";
import Tasks from "components/tasks/tasks";
import TaskDetails from "components/tasks/taskDetails";
import tasksStore from "stores/tasksStore";
import styled from "styled-components";

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
`;

const TasksPage = view(() => {
  return (
    <PageWrapper>
      {/* <Navigation /> */}
      <TaskLists />
      <Tasks />
      {tasksStore.selectedTask ? (
        <TaskDetails task={tasksStore.selectedTask} />
      ) : null}
    </PageWrapper>
  );
});

export default TasksPage;
