<template>
  <div class="home">
    <div class="container">
      <section class="main-section">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12">
                <button v-if="!isLoggedIn" @click="authenticate" class="btn btn-primary float-left btn-action">Authenticate</button>
                <button v-if="isLoggedIn" @click="getTaskLists" class="btn btn-info float-left btn-action">Load Tasks</button>
                <button v-if="isLoggedIn && !taskCreate" @click="createTask" class="btn btn-primary float-right btn-action">Create Task</button>
              </div>
            </div>
            <div class="row" v-if="!taskCreate">
              <div class="col-md-12">
                <div class="table-responsive" v-if="tasks.length > 0">
                  <table class="table table-striped table-hover table-bordered table-sm">
                    <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Title</th>
                      <th>Updated</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr :key="index" v-for="(task, index) of tasks">
                      <td>{{ index + 1 }}</td>
                      <td>{{ task.title }}</td>
                      <td>{{ moment(task.updated).format('MMMM Do YYYY, h:mm:ss a') }}</td>
                      <td class="action"><button class="btn btn-danger btn-sm" @click="deleteTask(task.id, taskList.taskListId)">Delete</button></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="row" v-if="taskCreate">
              <div class="col-md-12">
                <div class="task-form">
                  <form class="form-vertical" @submit.prevent="submit()">
                    <div class="form-group">
                      <label class="label" for="task-name">Title</label>
                      <input type="text" class="form-control" id="task-name" v-model="title" placeholder="Task Title" required>
                    </div>
                    <div class="form-group">
                      <label class="control-label" for="notes">Notes</label>
                      <textarea class="form-control" id="notes" v-model="notes" placeholder="Task Short Description" required>
                      </textarea>
                    </div>
                    <div class="form-group">
                      <button type="submit" class="btn btn-primary btn-sm">Create</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import * as moment from "moment";

export default {
  name: "home",
  components: {
  },
  data() {
    return {
      isLoading: false,
      title: null,
      notes: null,
      taskCreate: false
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    tasks() {
      return this.$store.getters.getTasks;
    },
    taskList() {
      return this.$store.getters.getList;
    }
  },
  methods: {
    moment() {
      return moment();
    },
    authenticate() {
      const apiBaseUrl = process.env.VUE_APP_API_URL;

      this.$http.post(`${apiBaseUrl}/api/tasks`).then(response => {
        if (response.data.login_url) {
          window.location = response.data.login_url;
        }
      }).catch(error => {
        this.isLoading = false;
        console.log(error);
      });
    },
    getTaskLists() {
      this.taskCreate = false;
      const apiBaseUrl = process.env.VUE_APP_API_URL;
      const scope = this.$store.getters.getAccessScope;
      const code = this.$store.getters.getAccessToken;
      if (code && scope) {
        this.$http.post(`${apiBaseUrl}/api/tasks`, {
          scope, code, state: "LIST"
        }).then(response => {
          const { taskList } = response.data;
          const taskListId = taskList[0].id;
          this.$store.commit("setList", { taskListId });
          this.$http.post(`${apiBaseUrl}/api/tasks`, {
            scope, code, state: "TASKS", taskList: taskListId
          }).then(response => {
            const { tasks } = response.data;
            this.$store.commit("setTasks", { tasks });
          });
        });
      }
    },
    createTask() {
      this.taskCreate = true;
    },
    submit() {
      const taskList = this.$store.getters.getList.taskListId;
      const title = this.title;
      const notes = this.notes;

      const apiBaseUrl = process.env.VUE_APP_API_URL;
      const scope = this.$store.getters.getAccessScope;
      const code = this.$store.getters.getAccessToken;

      this.$http.post(`${apiBaseUrl}/api/tasks`, {
        scope, code, taskList, title, notes, state: "INSERT"
      }).then(response => {
        const { tasks } = response.data;
        this.$store.commit("setTasks", { tasks });
        this.taskCreate = false;
        this.title = "";
        this.notes = "";
      });
    },
    deleteTask(task, taskList) {
      const apiBaseUrl = process.env.VUE_APP_API_URL;
      const scope = this.$store.getters.getAccessScope;
      const code = this.$store.getters.getAccessToken;
      this.$http.post(`${apiBaseUrl}/api/tasks`, {
        scope, code, state: "DELETE", taskList, task
      }).then(response => {
        const { tasks } = response.data;
        this.$store.commit("setTasks", { tasks });
      });
    }
  },
  created() {
    let { scope, code } = this.$route.query;
    if (scope && code) {
      this.$store.commit("setAuth", { code, scope });
      this.$router.replace("/");
    }
    this.getTaskLists();
    // console.log(this.$store.getters.getList);
    // this.$store.commit("unsetAuth");
    // this.$store.commit("clearList");
    // this.$store.commit("clearTasks");
  }
};
</script>

<style lang="scss" scoped>
  @import '../assets/sass/variables';

  @media (min-width: 1024px) {
    .home {
      min-height: calc(100vh - 334px);
    }
  }
  .main-section {
    margin-top: 4em;
    .btn-action {
      margin: 1em 0;
    }
  }
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
