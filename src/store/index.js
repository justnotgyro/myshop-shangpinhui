import { createStore } from "vuex";
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { home, search, detail, shopcart, user, trade },
});
