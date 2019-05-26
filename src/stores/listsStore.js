import { store } from "react-easy-state";
import gapiREST from "utils/gapiREST.js";
import configStore from "stores/configStore";

const listsStore = store({
  lists: [],
  selectedListId: null,
  selectedListIndex: null,

  get currentListIndex() {
    return listsStore.lists.findIndex(
      list => list.id === listsStore.selectedListId
    );
  },

  get currentList() {
    return listsStore.lists.find(list => list.id === listsStore.selectedListId);
  },

  getListIndex(listId) {
    return listsStore.lists.findIndex(list => list.id === listId);
  },

  getList(listId) {
    return listsStore.lists.find(list => list.id === listId);
  },

  setList(list) {
    // Does Update or Insert
    const index = listsStore.lists.findIndex(_list => _list.id === list.id);
    if (index === -1) listsStore.lists.push(list);
    else listsStore.lists[index] = list;
  },

  // nextList() {
  //   const currentIndex = listsStore.lists.findIndex(
  //     _list => _list.id === listsStore.selectedListId
  //   );
  //   listsStore.selectedListId =
  //     listsStore.lists[
  //       currentIndex >= listsStore.lists.length - 1 ? 0 : currentIndex + 1
  //     ];
  // },

  // previousList() {
  //   const currentIndex = listsStore.lists.findIndex(
  //     _list => _list.id === listsStore.selectedListId
  //   );
  //   listsStore.selectedListId =
  //     listsStore.lists[
  //       currentIndex <= 0 ? listsStore.lists.length - 1 : currentIndex - 1
  //     ];
  // },

  async listTaskLists() {
    console.log("listTaskLists");
    listsStore.lists = (await gapiREST.listTaskLists()) || [];
    listsStore.lists = sortByKey(listsStore.lists, "title");
    listsStore.lists = addGroupId(listsStore.lists, configStore.config);
  },

  async insertTaskList(title) {
    console.log("insertTaskList");
    await gapiREST.insertTaskList({ title }).then(list => {
      let newList = addGroupId([list], configStore.config).pop();
      listsStore.lists.push(newList);
    });
  },

  async updateTaskList(changedList) {
    console.log("updateTaskList");
    listsStore.setList(changedList);
    const updatedlist = await gapiREST.updateTaskList(
      changedList.id,
      changedList
    );
    listsStore.setList(addGroupIdToList(updatedlist));
  },

  async deleteTaskList(listId) {
    console.log("deleteTaskList");
    if (listsStore.selectedListId === listId) listsStore.selectedListId = null;
    listsStore.lists = listsStore.lists.filter(list => list.id !== listId);
    await gapiREST.deleteTaskList(listId);
  }
});

const sortByKey = (arr, key) => {
  return arr.sort((a, b) =>
    a[key].toUpperCase() > b[key].toUpperCase()
      ? 1
      : a[key].toUpperCase() < b[key].toUpperCase()
      ? -1
      : 0
  );
};

const regex = RegExp("(?:(.*)(?: - ))?(.*)");

const addGroupIdToList = list => {
  const [, abbr, title] = regex.exec(list.title);
  const thisListsGroup =
    // eslint-disable-next-line
    configStore.config.groups.find(group => group.abbr == abbr);
  if (thisListsGroup) {
    list.group = thisListsGroup;
  } else {
    list.group = configStore.config.defaultGroup;
  }
  list.shortTitle = title;
  return list;
};

const addGroupId = lists => {
  lists.forEach(list => addGroupIdToList(list));
  return lists;
};

export default listsStore;
