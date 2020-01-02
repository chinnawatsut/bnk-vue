import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Profile from "../views/Profile.vue";
import MemberProfile from "../views/MemberProfile.vue"
import NewMemberProfile from "../views/NewMemberProfile"
import EditMemberProfile from "../views/EditMemberProfile"
import localStorage from "../api/localStorage"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { isAuth: true, }
  },
  {
    path: "/list",
    name: "list",
    component: Home,
    meta: { isAuth: true, }
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { isAuth: true, }

  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn,

  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,

  },
  {
    path: "/bnk/create",
    component: NewMemberProfile,
    meta: { isAuth: true, }
  },
  {
    path: "/bnk/:userid/edit",
    component: EditMemberProfile,
    props: true,
    meta: { isAuth: true, }
  },
  {
    path: "/bnk/:id",
    component: MemberProfile,
    meta: { isAuth: true, }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getToken()
  const requiresAuth = to.matched.some(record => record.meta.isAuth)

  if (requiresAuth && !token) {
    next({ name: "signin" })
  } else {
    next()
  }
})

export default router;
