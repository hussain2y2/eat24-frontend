import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import actions from "./store/actions";
import getters from "./store/getters";
import mutations from "./store/mutations";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "eat247",
  storage: localStorage
});

export default new Vuex.Store({
  state: {
    apiBaseUrl: process.env.VUE_APP_API_URL,
    appVersion: process.env.VUE_APP_VERSION,
    isLoggedIn: false,
    scope: null,
    code: null,
    taskListId: null,
    tasks: []
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
  plugins: [vuexPersist.plugin]
});
