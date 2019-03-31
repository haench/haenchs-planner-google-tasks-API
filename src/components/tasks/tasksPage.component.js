import React from "react";
import { view } from "react-easy-state";
import TaskLists from "./tasklists.component";
import Tasks from "./tasks.component";
import TaskDetails from "./taskDetails.component";
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
