import { createRouter,createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    name: "登录",
    path: "/login",
    component: () => import("../views/login.vue")
  }
]

const router = createRouter({
  routes,
  history:createWebHistory()
})

export default router;