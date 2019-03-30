const baseURL = "https://www.googleapis.com/tasks/v1";

export default {
  async listTaskLists() {
    const url = "/users/@me/lists";

    let nextPageToken = undefined;
    let items = [];
    let response;
    do {
      response = await window.gapi.client
        .request({
          path: baseURL + url,
          method: "GET", // headers: { "If-None-Match": "" },
          params: { pageToken: nextPageToken }
        })
        .then(response);
      // if (resp.error) ...
      nextPageToken = response.result.nextPageToken;
      items = [...items, ...response.result.items];
    } while (nextPageToken !== undefined || response.error);
    return items;
  },

  async insertTaskList(newList) {
    const url = `/users/@me/lists/`;
    const response = await window.gapi.client
      .request({
        path: baseURL + url,
        method: "POST",
        body: newList
      })
      .then(
        response => {
          return response;
        },
        reason => console.log(reason)
      );
    return response.result;
  },

  async updateTaskList(taskListId, updatedList) {
    const url = `/users/@me/lists/${taskListId}`;
    const response = await window.gapi.client
      .request({
        path: baseURL + url,
        method: "PUT",
        body: updatedList
      })
      .then(
        response => {
          return response;
        },
        reason => console.log(reason)
      );
    return response.result;
  },

  async deleteTaskList(taskListId) {
    const url = `/users/@me/lists/${taskListId}`;
    const response = await window.gapi.client
      .request({
        path: baseURL + url,
        method: "DELETE"
      })
      .then(
        response => {
          return response;
        },
        reason => console.log(reason)
      );
    return response.result;
  },

  async listTasks(taskListId, params) {
    const url = `/lists/${taskListId}/tasks`;
    const response = await window.gapi.client
      .request({
        path: baseURL + url,
        method: "GET",
        params: params
      })
      .then(
        response => {
          return response;
        },
        reason => console.log(reason)
      );
    const tasks = response.result.items || [];
    return tasks.map(task => ({
      ...task,
      listId: taskListId
    }));
  },

  async getTask(taskListId, taskId) {
    const url = `/lists/${taskListId}/tasks/${taskId}`;
    const response = await window.gapi.client
      .request({
        path: baseURL + url,
        method: "POST"
      })
      .then(
        response => {
          return response;
        },
        reason => console.log(reason)
      );
    const responseTask = { ...response.result, listId: taskListId };
    return responseTask;
  },

  async insertTask(taskListId, newTask) {
    const url = `/lists/${taskListId}/tasks`;
    const response = await window.gapi.client
      .request({
        path: baseURL + url,
        method: "POST",
        body: newTask
      })
      .then(
        response => {
          return response;
        },
        reason => console.log(reason)
      );
    const responseTask = { ...response.result, listId: taskListId };
    return responseTask;
  },

  async updateTask(taskListId, taskId, updatedTask) {
    const url = `/lists/${taskListId}/tasks/${taskId}`;
    const response = await window.gapi.client
      .request({
        path: baseURL + url,
        method: "PUT",
        body: updatedTask
      })
      .then(
        response => {
          return response;
        },
        reason => console.log(reason)
      );
    const responseTask = { ...response.result, listId: taskListId };
    return responseTask;
  },

  async deleteTask(taskListId, taskId) {
    const url = `/lists/${taskListId}/tasks/${taskId}`;
    const response = await window.gapi.client
      .request({
        path: baseURL + url,
        method: "DELETE"
      })
      .then(
        response => {
          return response;
        },
        reason => console.log(reason)
      );
    return response.result;
  },

  async moveTask(taskListId, taskId, params) {
    const url = `/lists/${taskListId}/tasks/${taskId}/move`;
    const response = await window.gapi.client
      .request({
        path: baseURL + url,
        method: "POST",
        params: params
      })
      .then(
        response => {
          return response;
        },
        reason => console.log(reason)
      );
    const responseTask = { ...response.result, listId: taskListId };
    return responseTask;
  },

  async clearTasks(taskListId) {
    const url = `/lists/${taskListId}/clear`;
    const response = await window.gapi.client
      .request({
        path: baseURL + url,
        method: "POST"
      })
      .then(
        response => {
          return response;
        },
        reason => console.log(reason)
      );
    return response.result;
  }
};
