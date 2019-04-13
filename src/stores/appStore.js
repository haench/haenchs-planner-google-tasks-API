import { store } from "react-easy-state";
import tasksStore from "stores/tasksStore";
import configStore from "stores/configStore";
import listsStore from "stores/listsStore";
import eventStore from "stores/eventStore";

const appStore = store({
  isLoading: false,
  notification: null,
  appState: "auth",
  user: null,
  useImage: null,
  isLoggedIn: false,
  isConfigOpen: false,
  isAboutOpen: false,
  loadingData: false,

  async init(response) {
    appStore.loadingData = true;
    // console.log("Init gapi", response);
    await window.gapi.client.load("calendar", "v3");
    appStore.user = response.profileObj;
    appStore.userImage = response.profileObj.imageURL;
    appStore.isLoggedIn = true;
    await Promise.all([appStore.loadTasksData(), appStore.loadCalendarData()]);
    appStore.appState = "tasks";
    appStore.loadingData = false;
  },

  async loadTasksData() {
    await configStore.loadConfig();
    await listsStore.listTaskLists();
    await tasksStore.listAllTasks();
  },

  async loadCalendarData() {
    await eventStore.fetchCalendars();
    // console.log(eventStore.calendarList);
    await eventStore.fetchEvents();
    // console.log(eventStore.events);
    eventStore.buildYear();
  }
});

export default appStore;
