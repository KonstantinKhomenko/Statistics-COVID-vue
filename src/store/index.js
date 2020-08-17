import Vue from 'vue';
import Vuex from 'vuex';
import data from './modules/data';
import currentCountry from './modules/currentCountry';
import topCountries from './modules/topCountries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    data,
    currentCountry,
    topCountries
  }
});
