import { reqGetCode, reqUserRegister } from "@/api";

export default {
  state() {
    return {
      code: "",
    };
  },
  getters: {},
  mutations: {
    GETCODE(state, code) {
      state.code = code;
    },
  },
  actions: {
    async getCode({ commit }, phone) {
      let result = await reqGetCode(phone);
      return new Promise((resolve, reject) => {
        if (result.code === 200) {
          resolve(result.data);
        } else {
          reject("fail");
        }
      });
    },
    async userRegister({ commit }, data) {
      let result = await reqUserRegister(data);
      return new Promise((resolve, reject) => {
        if (result.code === 200) {
          resolve();
        } else {
          reject(result.message);
        }
      });
    },
  },
};
