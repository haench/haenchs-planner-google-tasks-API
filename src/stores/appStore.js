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

  async init(response) {
    // Show loader here
    console.log("Init gapi", response);
    // Load Calendar Client globally once and fall all!?
    await window.gapi.client.load("calendar", "v3");
    // Store user data
    appStore.user = response.profileObj;
    appStore.userImage = response.profileObj.imageURL;
    appStore.isLoggedIn = true;
    await appStore.loadTasksData();
    await appStore.loadCalendarData();

    appStore.appState = "tasks";
    // Hide loader here
  },

  async loadTasksData() {
    await configStore.loadConfig();
    await listsStore.listTaskLists();
    await tasksStore.listAllTasks();
  },

  async loadCalendarData() {
    await eventStore.fetchCalendars();
    console.log(eventStore.calendarList);
    await eventStore.fetchEvents();
    console.log(eventStore.events);
    eventStore.buildYear();
  }
});

export default appStore;
