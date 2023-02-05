import { createStore } from "vuex";
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { home, search, detail, shopcart, user },
});
