import React from "react";
import { view } from "react-easy-state";
import TaskLists from "./tasks/tasklists.component";
import Tasks from "./tasks/tasks.component";
import TaskDetails from "./tasks/taskDetails.component";
import styled from "styled-components";
import useKeyPress from "./../utils/useKeyPress.hook";
import tasksStore from "./../stores/tasksStore";
import appStore from "../stores/appStore";
import WelcomePage from "./welcome.component";
import { Calendar } from "./calendar";
import CalendarNav from "./calendar/calendarNav";

import TasksPage from "./tasks/tasksPage.component";
import CalendarPage from "./calendar/calendarPage.component";

const App = () => {
  console.log(React.version, appStore.appState);
  useKeyPress("ArrowUp", () => tasksStore.previousTask());
  useKeyPress("ArrowDown", () => tasksStore.nextTask());

  return {
    auth: <WelcomePage />,
    tasks: <TasksPage />,
    calendar: <CalendarPage />
  }[appStore.appState];
};

export default view(App);
