import Vue from "vue";
import router from "./router";
import Buefy from "buefy";
import App from "./App.vue";

import "buefy/lib/buefy.css";

Vue.use(Buefy);
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
