export default {
  getTasks({ commit, getters, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      const pos = getters.getTasks;
      const url = process.env.VUE_APP_API_URL + "/tasks";

      // Get data
      this._vm.$http
        .all([
          this._vm.$http.get(`${url}`, {})
        ])
        .then(response => {
          const posCall = {
            tasks: ""
          };
          if (response) {
            console.log(response);
            // posCall.tasks = response[5].data === "nothing found" ? "INSERT" : "UPDATE";
            // if (response[5].data && response[5].data !== "nothing found") {
            //   pos.tasks = response[5].data;
            // }
            commit("setPOS", pos);
            commit("setPosCall", posCall);
            resolve(pos);
          }
        })
        .catch(error => {
          reject(error);
          console.log(error);
        });
    });
  }
};
