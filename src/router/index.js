import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  }, 
});

export default router;
