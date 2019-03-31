import { store } from "react-easy-state";
import gapiREST from "utils/gapiREST.js";

import listsStore from "stores/listsStore";
import tasksStore from "stores/tasksStore";

import uniqid from "uniqid";

const CONFIG_LIST_TITLE = "# - Config";
const CONFIG_TASK_TITLE = "abbr";

const configStore = store({
  configListId: null,
  abbrevationsTask: null,
  config: {
    groups: [],
    defaultGroup: {
      abbr: undefined,
      name: "Ungrouped",
      id: "8a5be840f6b749969404ac9687e4dad5"
    }
  },
  groups: [],

  async loadConfig() {
    console.log("loadConfig");
    const lists = (await gapiREST.listTaskLists()) || [];
    try {
      configStore.configListId = lists.find(
        list => list.title === CONFIG_LIST_TITLE
      ).id;
      const tasks = await gapiREST.listTasks(configStore.configListId, null);
      configStore.abbrevationsTask = tasks.find(
        task => task.title === CONFIG_TASK_TITLE
      );
      configStore.config = JSON.parse(configStore.abbrevationsTask.notes);
    } catch {
      console.log("no config saved in tasks - using default");
    }
    // configStore.groups = [
    //   ...configStore.config.groups,
    //   configStore.config.defaultGroup
    // ];
  },

  async saveConfig() {
    console.log("saveConfig");
    if (!configStore.configListId) {
      await listsStore.insertTaskList(CONFIG_LIST_TITLE);
      configStore.configListId = listsStore.lists.find(
        list => list.title === CONFIG_LIST_TITLE
      ).id;
    }
    if (!configStore.abbrevationsTask) {
      await tasksStore.insertTask(configStore.configListId, {
        title: CONFIG_TASK_TITLE,
        notes: JSON.stringify(configStore.config)
      });
      configStore.abbrevationsTask = tasksStore.tasks.find(
        task => task.title === CONFIG_TASK_TITLE
      );
    } else {
      configStore.abbrevationsTask.notes = JSON.stringify(configStore.config);
      await tasksStore.updateTask(configStore.abbrevationsTask);
    }
    await configStore.loadConfig();
  },

  addGroupToConfig(abbr, name) {
    const newGroup = {
      abbr,
      name,
      id: uniqid()
    };
    configStore.config.groups.push(newGroup);
  },

  removeGroupFromConfig(delete_group) {
    configStore.config.groups = configStore.config.groups.filter(
      group => group.id !== delete_group.id
    );
  }
});

export default configStore;
