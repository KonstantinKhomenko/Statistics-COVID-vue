import axios from '@/plugins/axios';
import mutations from '../mutations';

const { NEW_TOP_COUNTRY } = mutations;

const topCountriesStore = {
  namespaced: true,
  state: {
    topCountries: []
  },
  getters: {
    topCountryNames: ({ topCountries }) => topCountries.map(el => el.country)
  },
  mutations: {
    [NEW_TOP_COUNTRY](state, countries) {
      state.topCountries = countries;
    }
  },
  actions: {
    async fetchTopCountries({ commit }) {
      const res = await axios.get(`/countries?sort=active`);
      const countries = res.slice(0, 5);

      commit(NEW_TOP_COUNTRY, countries);
    }
  }
};

export default topCountriesStore;
