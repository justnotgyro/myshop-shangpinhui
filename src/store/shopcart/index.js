import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

export default {
  state() {
    return {
      cartList: {},
    };
  },
  getters: {
    cartInfoList(state) {
      return state.cartList?.cartInfoList || [];
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
    async deleteCartById({ commit }, skuId) {
      let result = await reqDeleteCartById(skuId);
      return new Promise((resolve, reject) => {
        if (result.code === 200) {
          resolve("OK");
        } else {
          reject("fail");
        }
      });
    },
    async updateCheckedById({ commit }, { skuId, isChecked }) {
      let result = await reqUpdateCheckedById(skuId, isChecked);
      return new Promise((resolve, reject) => {
        if (result.code === 200) {
          resolve("OK");
        } else {
          reject("fail");
        }
      });
    },
    async deleteAllChecked({ commit, getters, dispatch }) {
      let promiseArr = [];
      await getters.cartInfoList.forEach((element) => {
        if (element.isChecked === 1) {
          let result = dispatch("deleteCartById", element.skuId);
          promiseArr.push(result);
        }
      });
      return Promise.all(promiseArr);
    },
    async updateAllIsChecked({ getters, dispatch }, isChecked) {
      let promiseArr = [];
      getters.cartInfoList.forEach((element) => {
        let promise = dispatch("updateCheckedById", {
          skuId: element.skuId,
          isChecked,
        });
        // 找了半天的bug发现其实是这里根本没有push promise！！！
        promiseArr.push(promise);
      });
      return Promise.all(promiseArr);
    },
  },
};
