import React from "react";
import { view } from "react-easy-state";
import TaskLists from "components/tasks/tasklists";
import Tasks from "components/tasks/tasks";
import TaskDetails from "components/tasks/taskDetails.outline";
import tasksStore from "stores/tasksStore";
import Navigation from "components/navigation_vertical";
import { PageWrapper, FixedPane, FlexPane } from "components/pageLayout";
import SplitPane from "react-split-pane";
import "./../SplitPane.css";

const TasksPage = view(() => {
  return (
    <PageWrapper>
      <Navigation />
      <FixedPane>
        <TaskLists />
      </FixedPane>
      {/* <SplitPane split="vertical"> */}
      <FlexPane>
        <Tasks />
      </FlexPane>
      <FlexPane>
        {tasksStore.selectedTask ? (
          <TaskDetails task={tasksStore.selectedTask} />
        ) : null}
      </FlexPane>
      {/* </SplitPane> */}
    </PageWrapper>
  );
});

export default TasksPage;
