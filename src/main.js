import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 注册全局组件，不太明白typenav为啥不放进component
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
import "@/mock/mockServe";

const app = createApp(App);

app.component("TypeNav", TypeNav);
app.component("Carousel", Carousel);
app.component("Pagination", Pagination);

app.use(store).use(router).mount("#app");

// 测试一下接口
// import { reqCategoryList } from "./api";
// reqCategoryList().then((res) => {
//   console.log(res);
// });
// import { reqBannerList } from "./api";
// reqBannerList().then((res) => {
//   console.log(res);
// });
// import { reqSearchInfo } from "./api";
// reqSearchInfo({}).then((res) => {
//   console.log(res);
// });
