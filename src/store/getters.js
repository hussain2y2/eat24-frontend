export default {
  isLoggedIn: (state) => {
    return state.isLoggedIn;
  },
  getAccessToken: (state) => {
    return state.code;
  },
  getAccessScope: (state) => {
    return state.scope;
  },
  getList: (state) => {
    return state.taskListId;
  },
  getTasks: (state) => {
    return state.tasks;
  }
};
