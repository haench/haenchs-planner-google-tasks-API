import { store } from "react-easy-state";
import gapiREST from "utils/gapiREST.js";
import listsStore from "stores/listsStore";

const tasksStore = store({
  tasks: [],
  selectedTaskId: null,
  selectedTaskIndex: null,
  sorting: null,
  display: {
    showCompleted: true,
    showDeleted: false,
    showHidden: false
  },

  getTask(taskId) {
    return (tasksStore.tasks || []).find(task => task.id === taskId);
  },

  setTask(task) {
    // Does Update or Insert
    // console.log("setTask");
    const index = tasksStore.tasks.findIndex(_task => _task.id === task.id);
    if (index === -1) tasksStore.tasks.push(task);
    else tasksStore.tasks[index] = task;
  },

  set selectedTask(task) {
    if (listsStore.selectedListId) {
      tasksStore.selectedTaskId = task.id;
      tasksStore.selectedTaskIndex = tasksStore.tasks.findIndex(
        _task => _task.id === task.id
      );
    }
  },

  get selectedTask() {
    return (tasksStore.tasks || []).find(
      task => task.id === tasksStore.selectedTaskId
    );
  },

  get currentTasks() {
    const tasks = (tasksStore.tasks || []).filter(
      task => task.listId === listsStore.selectedListId
    );
    const sortedTasks = tasks.sort((a, b) => {
      return a.position.localeCompare(b.position);
    });
    return sortedTasks;
  },

  getTasks(listId) {
    return (tasksStore.tasks || []).filter(task => task.listId === listId);
  },

  nextTask() {
    const currentTasks = tasksStore.currentTasks;
    const currentIndex = currentTasks.findIndex(
      _task => _task.id === tasksStore.selectedTaskId
    );
    tasksStore.selectedTask =
      currentTasks[
        currentIndex >= currentTasks.length - 1 ? 0 : currentIndex + 1
      ];
  },

  previousTask() {
    const currentTasks = tasksStore.currentTasks;
    const currentIndex = currentTasks.findIndex(
      _task => _task.id === tasksStore.selectedTaskId
    );
    tasksStore.selectedTask =
      currentTasks[
        currentIndex <= 0 ? currentTasks.length - 1 : currentIndex - 1
      ];
  },

  updateSelectedTask(task) {
    tasksStore.tasks[tasksStore.selectedTaskIndex] = task;
  },

  async listTasks(listId) {
    // Clear all tasks before refresh: requiered for hidden/delted to work
    tasksStore.tasks = tasksStore.tasks.filter(task => task.listId !== listId);
    return gapiREST
      .listTasks(listId, { ...tasksStore.display })
      .then(tasks => tasks.map(task => tasksStore.setTask(task)));
  },

  async listAllTasks(params) {
    console.log("listAllTasks");
    await Promise.all(
      listsStore.lists.map(
        async list => await tasksStore.listTasks(list.id, params)
      )
    );
  },

  async insertTask(listId, task) {
    const newTask = await gapiREST.insertTask(listId, task);
    tasksStore.setTask(newTask);
  },

  async updateTask(changedTask) {
    console.log("updateTask");
    // TODO: Diff Task - finde raus ob überhaupt update gemacht werden muss
    // Commit to local db for quick reponse
    tasksStore.setTask(changedTask);
    // Commit changed Task to database
    var updatedTask = await gapiREST.updateTask(
      changedTask.listId,
      changedTask.id,
      changedTask
    );
    // Update our existing task with the new task
    tasksStore.setTask(updatedTask);
  },

  async deleteTask(task) {
    if (tasksStore.selectedTaskId === task.id) tasksStore.selectedTaskId = null;
    tasksStore.tasks = tasksStore.tasks.filter(_task => _task.id !== task.id);
    await gapiREST.deleteTask(task.listId, task.id);
  },

  async moveTask(movedTask, siblingTaskId) {
    // dirty Hack: fake a new position before network is done.
    const sibling = tasksStore.getTask(siblingTaskId) || { position: "0" };
    const modifiedTask = {
      ...movedTask,
      position: String(+sibling.position + 1).padStart(20, "0")
    };
    tasksStore.setTask(modifiedTask);

    movedTask = await gapiREST.moveTask(movedTask.listId, movedTask.id, {
      previous: siblingTaskId
    });
    tasksStore.setTask(movedTask);
  },

  async clearTasks() {
    const listID = listsStore.selectedListId;
    tasksStore.tasks = tasksStore.tasks.filter(
      task => !(task.status === "completed" && task.listId === listID)
    );
    await gapiREST.clearTasks(listID);
    await tasksStore.listTasks(listID);
  }
});

export default tasksStore;
