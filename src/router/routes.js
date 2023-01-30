import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";

export default [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/detail/:skuid",
    component: Detail,
    meta: { show: true },
  },
  ,
  {
    path: "/home",
    component: Home,
    // woc meta参数是用来干嘛的？？
    // 是一个参数可以在组件里面使用这个参数，在这里应该是用来决定footer要不要显示
    meta: { show: true },
  },
  {
    path: "/search/:keyword?",
    // 加问号时 params参数可选
    component: Search,
    meta: { show: true },
    name: "search",
  },
  {
    path: "/login",
    component: Login,
    meta: { show: false },
  },
  {
    path: "/register",
    component: Register,
    meta: { show: false },
  },
];
