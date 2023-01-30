import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

const requests = axios.create({
  baseURL: "/mock",
  timeout: 5000,
});

requests.interceptors.request.use((config) => {
  nProgress.start();
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
