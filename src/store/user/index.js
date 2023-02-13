import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout,
} from "@/api";
import { setToken, removeToken, getToken } from "@/utils/handleToken";

export default {
  state() {
    return {
      token: getToken("TOKEN"),
      userInfo: {},
    };
  },
  getters: {},
  mutations: {
    USERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    TOKEN(state, token) {
      state.token = token;
    },
    CLEAR(state) {
      removeToken();
      state.userInfo = {};
      state.token = "";
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
    async userLogin({ commit, dispatch }, data) {
      let result = await reqUserLogin(data);
      setToken(result.data.token);
      commit("TOKEN", getToken("TOKEN"));
      return new Promise((resolve, reject) => {
        if (result.code === 200) {
          resolve();
        } else {
          reject(result.message);
        }
      });
    },
    async userInfo({ commit }) {
      let result = await reqUserInfo();
      commit("USERINFO", result.data);
      if (result.code === 200) {
        commit("USERINFO", result.data);
        return "ok";
      } else {
        return Promise.reject("fail");
      }
    },
    async logout({ commit }) {
      let result = await reqLogout();
      return new Promise((resolve, reject) => {
        if (result.code === 200) {
          commit("CLEAR");
          resolve();
        } else {
          reject("fail");
        }
      });
    },
  },
};
