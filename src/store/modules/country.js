import Country from '@/components/classes/Country';
import axios from '@/plugins/axios';
import mutations from '../mutations';

const { NEW_COUNTRIES, NEW_COUNTRY_NAME, NEW_TOP_COUNTRY } = mutations;

const countryStore = {
  namespaced: true,
  state: {
    currentCountryName: '',
    countries: [],
    topCountries: []
  },

  getters: {
    currentCountryName: ({ currentCountryName }) => currentCountryName,
    countries: ({ countries }) => countries,
    topCountries: ({ topCountries }) => topCountries
  },

  mutations: {
    [NEW_COUNTRIES](state, payload) {
      state.countries.push(payload);
    },
    [NEW_COUNTRY_NAME](state, payload) {
      state.currentCountryName = payload;
    },
    [NEW_TOP_COUNTRY](state, payload) {
      state.topCountries = payload;
    }
  },

  actions: {}
};

export default countryStore;
