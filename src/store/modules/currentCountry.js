import axios from '@/plugins/axios';
import mutations from '../mutations';

const { REC_RES, NEW_COUNTRY_NAME } = mutations;

const currentCountryStore = {
  namespaced: true,
  state: {
    currentCountryName: '',
    timeline: {}
  },

  getters: {
    currentCountryName: ({ currentCountryName }) => currentCountryName,
    labels: ({ timeline }) => Object.keys(timeline.cases),
    cases: ({ timeline }) => Object.values(timeline.cases),
    deaths: ({ timeline }) => Object.values(timeline.deaths),
    recovered: ({ timeline }) => Object.values(timeline.recovered)
  },

  mutations: {
    [REC_RES](state, { timeline }) {
      state.timeline = timeline;
    },
    [NEW_COUNTRY_NAME](state, { country }) {
      state.currentCountryName = country;
    }
  },

  actions: {
    async fetchNewCountry({ commit }, country) {
      try {
        //* loader
        const res = await axios.get(`/historical/${country}?lastdays=30`);
        commit(REC_RES, res);
        commit(NEW_COUNTRY_NAME, res);
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export default currentCountryStore;
