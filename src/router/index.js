import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import store from "@/store";
import { computed } from "vue";
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

const token = computed(() => store.state.user.token);
router.beforeEach(async (to, from, next) => {
  // 每次放行前都需要获取用户信息，除了登录页
  // 登录成功跳转到首页如果更改url到login，要强制跳转到home
  if (token.value) {
    if (to.path === "/login") {
      // 有token去login
      next("/home");
    } else {
      // 有token去其他页面
      if (store.state.user.userInfo.name) {
        next();
      } else {
        await store
          .dispatch("userInfo")
          .then(() => {
            next();
          })
          .catch(async (err) => {
            // token过期 无法获取用户信息 退出登录
            alert("用户信息过期，请重新登录！");
            await store.dispatch("logout").then(() => {
              next();
            });
          });
      }
    }
  } else {
    next();
  }
});

export default router;
