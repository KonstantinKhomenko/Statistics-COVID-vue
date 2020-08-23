import Vue from 'vue';
import Vuex from 'vuex';
import world from './modules/world';
import currentCountry from './modules/currentCountry';
import topCountries from './modules/topCountries';
import loader from './modules/loader';
import notification from './modules/notification';
import countries from './modules/countries';
import autocomplete from './modules/autocomplete';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    world,
    currentCountry,
    topCountries,
    loader,
    notification,
    countries,
    autocomplete
  }
});
