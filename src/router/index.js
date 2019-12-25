import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Profile from "../views/Profile.vue";
import MemberProfile from "../views/MemberProfile.vue"
import NewMemberProfile from "../views/NewMemberProfile"
import EditMemberProfile from "../views/EditMemberProfile"

Vue.use(VueRouter);

function isAuthen(to, from, next) {
  let token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next({
      name: "signin"
    })
  }
}

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: isAuthen
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    beforeEnter: isAuthen
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp
  },
  {
    path: "/bnk/create",
    component: NewMemberProfile,
  },
  {
    path: "/bnk/:id/edit",
    component: EditMemberProfile,
  },
  {
    path: "/bnk/:id",
    component: MemberProfile,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
