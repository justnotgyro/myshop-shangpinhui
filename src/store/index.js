import { createStore } from "vuex";
import home from "./home";
import search from "./search";
import detail from "./detail";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { home, search, detail },
});
