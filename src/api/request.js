import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";
import { computed } from "vue";

const guestId = localStorage.getItem("GUESTID");
const token = computed(() => store.state.user.token);

const requests = axios.create({
  baseURL: "http://gmall-h5-api.atguigu.cn",
  timeout: 5000,
});

requests.interceptors.request.use((config) => {
  nProgress.start();
  if (guestId) {
    config.headers.userTempId = guestId;
  }
  if (token) {
    // 这里没拿到token所以不能getUserInfo
    // 没想到这里的token居然也需要是响应式的。。。
    config.headers.token = token.value;
  }

  return config;
});
requests.interceptors.response.use(
  (res) => {
    nProgress.done();
    // 这里返回值 就是外界调用requests发送请求时拿到的res结果
    return res.data;
  },
  (err) => {
    console.log(err);
  }
);

export default requests;
