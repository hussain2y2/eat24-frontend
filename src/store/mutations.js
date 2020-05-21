export default {
  setAuth(state, payload) {
    state.isLoggedIn = true;
    if (payload.scope) {
      state.scope = payload.scope;
    }
    if (payload.code) {
      state.code = payload.code;
    }
  },
  unsetAuth(state) {
    state.isLoggedIn = false;
    state.scope = null;
    state.code = null;
  },
  setList(state, payload) {
    state.taskListId = payload;
  },
  clearList(state) {
    state.taskListId = null;
  },
  setTasks(state, payload) {
    state.tasks = payload.tasks;
  },
  clearTasks(state) {
    state.tasks = [];
  }
};
