import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Vue from "vue";
import VeeValidate from "vee-validate";
import axios from "axios";
import VueAxios from "vue-axios";
import VueLodash from "vue-lodash";
import Paginate from "vuejs-paginate";
import VueCookie from "vue-cookie";
import VueLocalStorage from "vue-localstorage";
import VueSweetalert2 from "vue-sweetalert2";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "sweetalert2/dist/sweetalert2.min.css";
import "vue-awesome/icons";

require(/* webpackPreload: true */ "typeface-roboto");
const $ = require("jquery");

Vue.component("paginate", Paginate);
Vue.use(VueAxios, axios);
Vue.use(VeeValidate, {
  errorBagName: "vErrors"
});
Vue.use(VueLocalStorage);

Vue.use(VueLodash, {
  name: "lodash"
});
Vue.use(VueCookie);
Vue.use(VueSweetalert2);

// Filters
window.$ = $;

Vue.config.productionTip = false;

// eslint-disable-next-line no-new
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  render: h => h(App)
});
