import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ethAddress: '',
  },
  mutations: {
    setETHAddress(state, address) {
      state.ethAddress = address;
    },
  },
  actions: {
    setETHAddress({ commit }, address) {
      commit('setETHAddress', address);
    },
  },
  getters: {
    store_eth_address(state) {
      return state.ethAddress;
    },
  },
});
