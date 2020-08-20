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
    async fetchNewCountry({ commit, dispatch }, country) {
      try {
        dispatch('toggleLoader', true, { root: true });
        const res = await axios.get(`/historical/${country}?lastdays=30`);
        commit(REC_RES, res);
        commit(NEW_COUNTRY_NAME, res);
      } catch (error) {
        dispatch(
          'showNotify',
          {
            type: 'error',
            msg: error.message
          },
          { root: true }
        );
      } finally {
        dispatch('toggleLoader', false, { root: true });
      }
    }
  }
};

export default currentCountryStore;
