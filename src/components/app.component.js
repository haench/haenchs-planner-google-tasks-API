import React from "react";
import { view } from "react-easy-state";
import useKeyPress from "./../utils/useKeyPress.hook";
import tasksStore from "./../stores/tasksStore";
import appStore from "../stores/appStore";
import WelcomePage from "./welcome.component";
import TasksPage from "./tasks/tasksPage.component";
import CalendarPage from "./calendar/calendarPage";

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
