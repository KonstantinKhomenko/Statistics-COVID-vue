import axios from '@/plugins/axios';
import mutations from '../mutations';

const { REC_COUNTRIES } = mutations;

function serializeResponse(response) {
  return response.map(el => el.country).reverse();
}

const countriesStore = {
  state: {
    countries: []
  },

  getters: {
    arrCountries: ({ countries }) => countries
  },

  mutations: {
    [REC_COUNTRIES](state, payload) {
      state.countries = payload;
    }
  },

  actions: {
    async fetchAllCountries({ commit }) {
      try {
        const response = await axios.get(`/countries?sort=country`);
        console.log(response);
        const countries = serializeResponse(response);
        commit(REC_COUNTRIES, countries);
      } catch (err) {
        console.log(err);
      }
    }
  }
};

export default countriesStore;
