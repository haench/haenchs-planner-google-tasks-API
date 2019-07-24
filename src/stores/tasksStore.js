import { store } from "react-easy-state";
import gapiREST from "utils/gapiREST.js";
import listsStore from "stores/listsStore";
import arrayMove from "array-move";

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
    console.log("setTask", task, tasksStore.tasks);
    const listIndex = listsStore.lists.findIndex(
      _list => _list.id === task.listId
    );

    const index = tasksStore.tasks[listIndex].findIndex(
      _task => _task.id === task.id
    );
    console.log(listIndex, index);
    if (index === -1) tasksStore.tasks[listIndex].push(task);
    else tasksStore.tasks[listIndex][index] = task;
    console.log(tasksStore.currentTasks);
  },

  set selectedTask(task) {
    if (listsStore.selectedListId) {
      tasksStore.selectedTaskId = task.id;
      tasksStore.selectedTaskIndex = tasksStore.tasks[
        listsStore.currentListIndex
      ].findIndex(_task => _task.id === task.id);
    }
  },

  get selectedTask() {
    return (tasksStore.tasks[listsStore.currentListIndex] || []).find(
      task => task.id === tasksStore.selectedTaskId
    );
  },

  set currentTasks(tasks) {
    tasksStore.tasks[listsStore.currentListIndex] = tasks;
  },

  get currentTasks() {
    return tasksStore.tasks[listsStore.currentListIndex] || [];
  },

  getTasks(listId) {
    return tasksStore.tasks[listsStore.getListIndex(listId)] || [];
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
    return gapiREST.listTasks(listId, { ...tasksStore.display }).then(tasks => {
      const sortedTasks = tasks.sort((a, b) =>
        a.position.localeCompare(b.position)
      );
      tasksStore.tasks[listsStore.getListIndex(listId)] = sortedTasks;
      console.log(sortedTasks);
    });
  },

  async listAllTasks() {
    console.log("listAllTasks");
    await Promise.all(
      listsStore.lists.map(async list => await tasksStore.listTasks(list.id))
    );
    console.log(tasksStore.tasks.flat());
  },

  async insertTask(listId, task) {
    const newTask = await gapiREST.insertTask(listId, task);
    tasksStore.setTask(newTask);
    await tasksStore.listTasks(listId);
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
    await tasksStore.listTasks(updatedTask.listId);
  },

  async deleteTask(task) {
    if (tasksStore.selectedTaskId === task.id) tasksStore.selectedTaskId = null;
    tasksStore.tasks[listsStore.getListIndex(task.listId)] = tasksStore.tasks[
      listsStore.getListIndex(task.listId)
    ].filter(_task => _task.id !== task.id);
    await gapiREST.deleteTask(task.listId, task.id);
  },

  async moveTask({ oldIndex, newIndex }) {
    const movedTask = tasksStore.currentTasks[oldIndex];
    tasksStore.currentTasks = arrayMove(
      tasksStore.currentTasks,
      oldIndex,
      newIndex
    );
    const siblingTaskId =
      newIndex > 0 ? tasksStore.currentTasks[newIndex - 1].id : null;

    await gapiREST.moveTask(movedTask.listId, movedTask.id, {
      previous: siblingTaskId
    });
    await tasksStore.listTasks(movedTask.listId);
  },

  async clearTasks() {
    const listId = listsStore.selectedListId;
    tasksStore.tasks = tasksStore.tasks.filter(
      task => !(task.status === "completed" && task.listId === listId)
    );
    await gapiREST.clearTasks(listId);
    await tasksStore.listTasks(listId);
  }
});

export default tasksStore;
