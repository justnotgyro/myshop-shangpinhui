import { reqAddressInfo, reqOrderInfo } from "@/api";

export default {
  state() {
    return {
      addressInfo: [],
      orderInfo: {},
    };
  },
  getters: {},
  mutations: {
    ADDRESSINFO(state, addressInfo) {
      state.addressInfo = addressInfo;
    },
    ORDERINFO(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
  },
  actions: {
    async addressInfo({ commit }) {
      let result = await reqAddressInfo();
      return new Promise((resolve, reject) => {
        if (result.code === 200) {
          commit("ADDRESSINFO", result.data);
          resolve();
        } else {
          reject("failed to get addressInfo");
        }
      });
    },
    async orderInfo({ commit }) {
      let result = await reqOrderInfo();
      return new Promise((resolve, reject) => {
        if (result.code === 200) {
          commit("ORDERINFO", result.data);
          resolve();
        } else {
          reject("failed to get orderInfo");
        }
      });
    },
  },
};
