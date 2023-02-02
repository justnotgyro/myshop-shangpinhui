import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

const guestId = localStorage.getItem("GUESTID");

const requests = axios.create({
  baseURL: "http://gmall-h5-api.atguigu.cn",
  timeout: 5000,
});

requests.interceptors.request.use((config) => {
  nProgress.start();
  config.headers.userTempId = guestId;
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
