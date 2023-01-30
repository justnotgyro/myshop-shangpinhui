import { reqGoodsInfo } from "@/api";
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
  },
};
