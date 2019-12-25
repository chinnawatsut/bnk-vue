import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueAxios from 'vue-axios'
import http from './api/httpClient'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import igfilter from './filter/IgFilter'
Vue.config.productionTip = false;


Vue.filter('iglink', igfilter.iglink)

Vue.use(VueAxios, http)
Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
