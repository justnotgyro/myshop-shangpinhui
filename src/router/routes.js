import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";

export default [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    meta: { show: true },
    name: "paysuccess",
  },
  {
    path: "/pay",
    component: Pay,
    meta: { show: true },
    name: "pay",
  },
  {
    path: "/trade",
    component: Trade,
    meta: { show: true },
    name: "trade",
  },
  {
    path: "/shopcart",
    component: ShopCart,
    meta: { show: true },
    name: "shopcart",
  },
  {
    path: "/addcartsuccess",
    component: AddCartSuccess,
    meta: { show: true },
    name: "addcartsuccess",
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
