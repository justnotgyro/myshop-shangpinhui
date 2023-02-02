import { reqCartList } from "@/api";

export default {
  state() {
    return {
      cartList: {},
    };
  },
  getters: {
    cartInfoList(state) {
      return state.cartList.cartInfoList || [];
    },
  },
  mutations: {
    CARTLIST(state, payload) {
      state.cartList = payload;
    },
  },
  actions: {
    async cartList({ commit }) {
      let result = await reqCartList();
      commit("CARTLIST", result.data[0]);
    },
  },
};
