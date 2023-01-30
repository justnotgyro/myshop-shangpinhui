import { reqSearchInfo } from "@/api";

export default {
  state() {
    return {
      searchList: {},
    };
  },
  getters: {
    goodsList(state) {
      return state.searchList.goodsList;
    },
    trademarkList(state) {
      return state.searchList.trademarkList;
    },
    attrsList(state) {
      return state.searchList.attrsList;
    },
  },
  mutations: {
    SEARCHLIST(state, searchList) {
      state.searchList = searchList;
    },
  },
  actions: {
    async searchList({ commit }, params = {}) {
      let result = await reqSearchInfo(params);
      commit("SEARCHLIST", result.data);
    },
  },
};
