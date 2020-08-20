import axios from '@/plugins/axios';
import mutations from '../mutations';

const { NEW_TOP_COUNTRY } = mutations;

const topCountriesStore = {
  namespaced: true,
  state: {
    topCountries: []
  },
  getters: {
    topCountryInfo: ({ topCountries }) =>
      topCountries.map(el => ({ name: el.country, cases: el.cases }))
  },
  mutations: {
    [NEW_TOP_COUNTRY](state, countries) {
      state.topCountries = countries;
    }
  },
  actions: {
    async fetchTopCountries({ commit, dispatch }) {
      try {
        dispatch('toggleLoader', true, { root: true });
        const res = await axios.get(`/countries?sort=active`);
        const countries = res.slice(0, 10);
        commit(NEW_TOP_COUNTRY, countries);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch('toggleLoader', false, { root: true });
      }
    }
  }
};

export default topCountriesStore;
