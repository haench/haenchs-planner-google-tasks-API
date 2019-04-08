import React from "react";
import { view } from "react-easy-state";
import TaskLists from "components/tasks/tasklists";
import Tasks from "components/tasks/tasks";
import TaskDetails from "components/tasks/taskDetails";
import tasksStore from "stores/tasksStore";
import Navigation from "components/navigation_vertical";
import {
  PageWrapper,
  NavPane,
  FixedPane,
  FlexPane
} from "components/pageLayout";

const TasksPage = view(() => {
  return (
    <PageWrapper>
      <NavPane>
        <Navigation />
      </NavPane>
      <FixedPane>
        <TaskLists />
      </FixedPane>
      <FlexPane>
        <Tasks />
      </FlexPane>
      <FlexPane>
        {tasksStore.selectedTask ? (
          <TaskDetails task={tasksStore.selectedTask} />
        ) : null}
      </FlexPane>
    </PageWrapper>
  );
});

export default TasksPage;
