import Vue from "vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "open-iconic/font/css/open-iconic-bootstrap.css";
import datePicker from 'vue-bootstrap-datetimepicker';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';

import App from "./App.vue";

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

//remember to add meta: requiresAuth: true when we want to access only if authenticated
// router.beforeEach((to, from, next) => {
//   console.log("to.meta.requiresAuth " + to.meta.requiresAuth);
//   console.log(vm);
//   if (to.meta.requiresAuth && !vm.user) next("/login");
//   else next();
// });

const vm = new Vue({
  router,
  data: {
    user: null,
    searchWord: ""
  },
  render: h => h(App)
}).$mount("#app");
