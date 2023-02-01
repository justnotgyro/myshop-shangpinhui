import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
export default {
  state() {
    return {
      goodsInfo: {},
    };
  },
  getters: {
    categoryView(state) {
      return state.goodsInfo.categoryView || {};
    },
    skuInfo(state) {
      return state.goodsInfo.skuInfo || {};
    },
    spuSaleAttrList(state) {
      return state.goodsInfo.spuSaleAttrList;
    },
  },
  mutations: {
    GOODSINFO(state, goodsInfo) {
      state.goodsInfo = goodsInfo;
    },
  },
  actions: {
    async goodsInfo({ commit }, skuid) {
      let result = await reqGoodsInfo(skuid);
      commit("GOODSINFO", result.data);
    },
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
      let result = await reqAddOrUpdateShopCart(skuId, skuNum);
      return new Promise((resolve, reject) => {
        if (result.code === 200) {
          resolve("OK");
        } else {
          reject("fail");
        }
      });
    },
  },
};
