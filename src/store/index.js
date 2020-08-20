import Vue from 'vue';
import Vuex from 'vuex';
import world from './modules/world';
import currentCountry from './modules/currentCountry';
import topCountries from './modules/topCountries';
import loader from './modules/loader';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    world,
    currentCountry,
    topCountries,
    loader
  }
});
