import VueCookies from "vue-cookie";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    name: "登录",
    path: "/login",
    component: () => import("../views/login.vue")
  },
  {
    name: "首页",
    path: "/home",
    component: () => import("../views/home.vue")
  },

]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to, from, next) => {
  // 从 Cookies 中获取用户信息
  const userInfoStr = VueCookies.get("userInfo");
  try {
    // 尝试解析用户信息
    const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;

    // 如果用户未登录且目标路由不是登录页面，则重定向到登录页面
    if (!userInfo && to.path !== "/login") {
      next("/login"); // 使用 next 函数进行路由重定向
    } else {
      next(); // 如果用户已登录或正在访问登录页面，则正常进行路由跳转
    }
  } catch (e) {
    // 如果解析用户信息失败，重定向到登录页面
    console.error("Error parsing userInfo", e);
    next("/login");
  }
})

export default router;