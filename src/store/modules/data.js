import axios from '@/plugins/axios';
import mutations from '../mutations';

const { CONTINENTS } = mutations;

const storeData = {
  namespaced: true,
  state: {
    allContinents: null
  },

  getters: {
    allContinents: ({ allContinents }) => allContinents
  },

  mutations: {
    [CONTINENTS](state, value) {
      state.allContinents = value;
    }
  },

  actions: {
    async fetchDataOnContinents({ commit }) {
      try {
        const res = await axios.get('/continents');
        commit(CONTINENTS, res);
        console.log(res)
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export default storeData;
