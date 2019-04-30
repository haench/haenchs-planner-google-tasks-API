import React from "react";
import { view } from "react-easy-state";
import TaskLists from "components/tasks/tasklists";
import Tasks from "components/tasks/tasks";
import TaskDetails from "components/tasks/taskDetails.outline";
import tasksStore from "stores/tasksStore";
import Navigation from "components/navigation_vertical";
import { PageWrapper, FixedPane } from "components/pageLayout";
import SplitPane from "react-split-pane";
import "./../SplitPane.css";

const splitPaneStyle = { position: "relative" };

const paneStyle = {
  flexDirection: "column",
  display: "flex",
  background: "#f5f6f7",
  height: "100%"
};

const TasksPage = view(() => {
  return (
    <PageWrapper>
      <Navigation />
      <FixedPane>
        <TaskLists />
      </FixedPane>
      <SplitPane
        defaultSize="40%"
        split="vertical"
        style={splitPaneStyle}
        paneStyle={paneStyle}
      >
        <div style={paneStyle}>
          <Tasks />
        </div>
        <div style={paneStyle}>
          {tasksStore.selectedTask ? (
            <TaskDetails task={tasksStore.selectedTask} />
          ) : null}
        </div>
      </SplitPane>
    </PageWrapper>
  );
});

export default TasksPage;
