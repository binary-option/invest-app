import Vue from "vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

//remember to add meta: requiresSuth: true when we want to access only if authenticated
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !vm.user) next("/login");
  else next();
});

new Vue({
  router,
  data: {
    user: null
  },
  render: h => h(App)
}).$mount("#app");
