import { createRouter,createWebHistory } from "vue-router";

const routes = [
  {
    name: "首页",
    path: "/index",
    component: () => import("../views/index.vue")
  }
]

const router = createRouter({
  routes,
  history:createWebHistory()
})

export default router;