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
    async fetchAllCountries({ commit, dispatch }) {
      try {
        const response = await axios.get(`/countries?sort=country`);
        const countries = serializeResponse(response);
        commit(REC_COUNTRIES, countries);
      } catch (error) {
        dispatch(
          'showNotify',
          {
            type: 'error',
            msg: error.response.data.message || error.message
          },
          { root: true }
        );
      }
    }
  }
};

export default countriesStore;
