import React from "react";
import { view } from "react-easy-state";
import TaskLists from "./tasklists.component";
import Tasks from "./tasks.component";
import TaskDetails from "./taskDetails.component";
import styled from "styled-components";
import useKeyPress from "./../utils/useKeyPress.hook";
import tasksStore from "./../stores/tasksStore";
import appStore from "../stores/appStore";
import AuthPage from "./auth.component";
import { Calendar } from "./calendar";
import CalendarNav from "./calendar/calendarNav";
//import Calendar from "./calendar/css_calendar";
//import Calendar from "./calendar/table_calendar";
// import "./calendar/style.css";

const HApp = styled.div`
  height: 100vh;
  display: flex;
`;

const TasksApp = view(() => {
  return (
    <HApp>
      {/* <Navigation /> */}
      <TaskLists />
      <Tasks />
      {tasksStore.selectedTask ? (
        <TaskDetails task={tasksStore.selectedTask} />
      ) : null}
    </HApp>
  );
});

const CalendarApp = () => {
  return (
    <HApp>
      <CalendarNav />
      <Calendar
        showDaysOfWeek={true}
        showWeekSeparators={false}
        firstDayOfWeek={1}
      />
    </HApp>
  );
};

const App = () => {
  console.log(React.version, appStore.appState);
  useKeyPress("ArrowUp", () => tasksStore.previousTask());
  useKeyPress("ArrowDown", () => tasksStore.nextTask());

  return {
    auth: <AuthPage />,
    tasks: <TasksApp />,
    calendar: <CalendarApp />
  }[appStore.appState];
};

export default view(App);
