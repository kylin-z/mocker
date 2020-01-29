import Vue from "vue";
import Vuex from "vuex";
import * as Api from "../api";

Vue.use(Vuex);

const TYPES = {
  SET_RULES: "SET_RULES"
};

export default new Vuex.Store({
  state: {
    rules: []
  },
  getters: {
    rules: state => {
      return state.rules;
    }
  },
  mutations: {
    [TYPES.SET_RULES](state, rules) {
      state.rules = rules;
    }
  },
  actions: {
    async setRulesList({ commit }) {
      let rules = await Api.getRules();
      commit(TYPES.SET_RULES, rules);
    },
    async removeRule({ commit }, id) {
      let rules = await Api.removeRule(id);
      commit(TYPES.SET_RULES, rules);
    }
  },
  modules: {}
});
