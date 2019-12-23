import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter(to, from, next) {
      let token = localStorage.getItem('token')
      if (token) {
        next()
      } else {
        next({
          name: "signin"
        })
      }
    }
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
