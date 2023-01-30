import { reqCategoryList, reqBannerList, reqFloorList } from "@/api";

export default {
  state() {
    return {
      categoryList: [],
      bannerList: [],
      floorList: [],
    };
  },
  getters: {},
  mutations: {
    CATIGORYLIST(state, categoryList) {
      state.categoryList = categoryList;
    },
    BANNERLIST(state, bannerList) {
      state.bannerList = bannerList;
    },
    FLOORLIST(state, floorList) {
      state.floorList = floorList;
    },
  },
  actions: {
    async categoryList({ commit }) {
      let result = await reqCategoryList();
      commit("CATIGORYLIST", result.data);
    },
    async bannerList({ commit }) {
      let result = await reqBannerList();
      commit("BANNERLIST", result.data);
    },
    async floorList({ commit }) {
      let result = await reqFloorList();
      commit("FLOORLIST", result.data);
    },
  },
};
