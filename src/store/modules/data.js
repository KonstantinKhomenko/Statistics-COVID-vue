import axios from '@/plugins/axios';
import mutations from '../mutations';

const { CONTINENTS, ALL_CASES, RECORD_DATES, RECORD_VALUES } = mutations;

const storeData = {
  namespaced: true,
  state: {
    allContinents: null,
    allCases: null,
    allDataDate: [],
    allDataNumbers: []
  },

  getters: {
    allContinents: ({ allContinents }) => Boolean(allContinents),
    allContinentsCases: ({ allContinents }) =>
      allContinents.reduce((acc, el) => (acc += el.cases), 0),
    allContinentsTodayCases: ({ allContinents }) =>
      allContinents.reduce((acc, el) => (acc += el.todayCases), 0),
    allContinentsDeaths: ({ allContinents }) =>
      allContinents.reduce((acc, el) => (acc += el.deaths), 0),
    allContinentsTodayDeaths: ({ allContinents }) =>
      allContinents.reduce((acc, el) => (acc += el.todayDeaths), 0),
    allContinentsRecovered: ({ allContinents }) =>
      allContinents.reduce((acc, el) => (acc += el.recovered), 0),
    allContinentsTodayRecovered: ({ allContinents }) =>
      allContinents.reduce((acc, el) => (acc += el.todayRecovered), 0),
    allCases: ({ allCases }) => Boolean(allCases),
    allDataDate: ({ allDataDate }) => allDataDate,
    allDataNumbers: ({ allDataNumbers }) => allDataNumbers,

    allDataKeys: ({ allCases }) => key => Object.keys(allCases[key]),
    allDataValues: ({ allCases }) => key => Object.values(allCases[key])
  },

  mutations: {
    [CONTINENTS](state, value) {
      state.allContinents = value;
    },
    [ALL_CASES](state, value) {
      state.allCases = value;
    },
    [RECORD_DATES](state, arr) {
      state.allDataDate = arr;
    },
    [RECORD_VALUES](state, arr) {
      state.allDataNumbers = arr;
    }
  },

  actions: {
    async fetchDataOnContinents({ commit }) {
      try {
        const res = await axios.get('/continents');
        commit(CONTINENTS, res);
      } catch (error) {
        console.log(error);
      }
    },

    async fetchAllCases({ commit }) {
      try {
        const res = await axios.get('/historical/all');
        commit(ALL_CASES, res);
      } catch (error) {
        console.log(error);
      }
    },

    getAllValues({ commit, getters }, key) {
      const { allDataKeys, allDataValues } = getters;
      const allDates = allDataKeys(key);
      const allValues = allDataValues(key);
      commit(RECORD_DATES, allDates);
      commit(RECORD_VALUES, allValues);
    }
  }
};

export default storeData;
