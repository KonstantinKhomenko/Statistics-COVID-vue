import mutations from '../mutations';

const {
  CHANGE_INDEX,
  CHANGE_ITEM,
  TOGGLE_VISIBLE,
  REC_LENGTH,
  REC_MATCHES
} = mutations;

const autocompleteStore = {
  namespaced: true,
  state: {
    selectedIndex: 0,
    selectedItem: '',
    visible: false,
    matchesLength: 0,
    matches: []
  },

  getters: {
    selectedIndex: ({ selectedIndex }) => selectedIndex,
    selectedItem: ({ selectedItem }) => selectedItem,
    visible: ({ visible }) => visible,
    matchesLength: ({ matchesLength }) => matchesLength,
    matches: ({ matches }) => matches
  },

  mutations: {
    [CHANGE_INDEX](state, newIndex) {
      state.selectedIndex = newIndex;
    },
    [CHANGE_ITEM](state, newItem) {
      state.selectedItem = newItem;
    },
    [TOGGLE_VISIBLE](state) {
      state.visible = !state.visible;
    },
    [REC_LENGTH](state, payload) {
      state.matchesLength = payload;
    },
    [REC_MATCHES](state, arr) {
      state.matches = arr;
    }
  },

  actions: {
    changeSelectedIndex({ commit }, newIndex) {
      commit(CHANGE_INDEX, newIndex);
    },
    changeSelectedItem({ commit }, newItem) {
      commit(CHANGE_ITEM, newItem);
      if (newItem) commit(TOGGLE_VISIBLE);
    },
    toggleVisible({ commit }) {
      commit(TOGGLE_VISIBLE);
    },
    findMatches(
      { commit, getters: { selectedIndex }, rootGetters: { arrCountries } },
      value
    ) {
      if (value) {
        const matchesArr = arrCountries.filter(el =>
          el.toLowerCase().includes(value.toLowerCase())
        );

        commit(REC_MATCHES, matchesArr);
        commit(REC_LENGTH, matchesArr.length);

        if (selectedIndex > matchesArr.length - 1) {
          commit(CHANGE_INDEX, 0);
        }
      } else {
        commit(REC_MATCHES, []);
      }
    },
    clearArrOfMatches({ commit }) {
      commit(REC_MATCHES, []);
    }
  }
};

export default autocompleteStore;
