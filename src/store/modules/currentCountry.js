import Country from '@/components/classes/Country';
import axios from '@/plugins/axios';
import mutations from '../mutations';

const { REC_RES, NEW_COUNTRY_NAME, NEW_COUNTRY } = mutations;

const currentCountryStore = {
  namespaced: true,
  state: {
    currentCountryName: '',
    countryInfo: {},
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
    },
    [NEW_COUNTRY](state, country) {
      state.countryInfo = country;
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
    },
    getCountryInfo({ getters, commit }) {
      const { currentCountryName, labels, cases, deaths, recovered } = getters;
      const id = Date.now();
      const datasets = {
        cases,
        deaths,
        recovered
      };

      const country = new Country(
        id,
        currentCountryName,
        cases[cases.length - 1],
        deaths[deaths.length - 1],
        recovered[recovered.length - 1],
        datasets,
        labels
      );

      commit(NEW_COUNTRY, country);
    }
  }
};

export default currentCountryStore;
