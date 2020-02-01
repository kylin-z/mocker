import Vue from "vue";
import Vuex from "vuex";
import * as Api from "../api";

Vue.use(Vuex);

const TYPES = {
  SET_RULES: "SET_RULES",
  SET_MODULES: "SET_MODULES"
};

export default new Vuex.Store({
  state: {
    rules: [],
    modules: []
  },
  getters: {
    rules: state => {
      return state.rules;
    },
    modules: state => {
      return state.modules;
    } 
  },
  mutations: {
    [TYPES.SET_RULES](state, rules) {
      state.rules = rules;
    },
    [TYPES.SET_MODULES](state, modules) {
      state.modules = modules;
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
    },
    async batchRemoveRuleById({ commit }, ids = []) {
      let rules = await Api.batchRemoveRuleById(ids);
      commit(TYPES.SET_RULES, rules);
    },
    async batchUpdateRuleById({ commit }, { ids = [], rule = {} } = {}) {
      await Api.batchUpdateRulesById(ids, rule);
      let rules = await Api.getRules();
      commit(TYPES.SET_RULES, rules);
    },
    async setModulesList({ commit }) {
      let modules = await Api.getModules();
      commit(TYPES.SET_MODULES, modules);
    },
    async removeModule({ commit }, id) {
      let modules = await Api.removeModule(id);
      commit(TYPES.SET_MODULES, modules);
    },
  },
  modules: {}
});
