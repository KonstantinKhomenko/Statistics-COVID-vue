<template>
  <div class="container">
    <div class="autocomplete-wrap">
      <div class="autocomplete" @click="startSearching">{{ selectedItem }}</div>
      <div class="placeholder-div" v-if="!selectedItem">{{ 'Search' }}</div>
      <div v-if="selectedItem" class="clear-btn" @click="clearSearch">
        <img src="@/assets/close-svgrepo-com.svg" alt="Close" />
      </div>

      <div v-if="visible" class="input-wrap">
        <input
          v-model.trim="searchValue"
          type="text"
          placeholder="Search country"
          ref="searcInput"
          @keydown.up="up"
          @keydown.down="down"
          @keydown.enter="onEnter"
          @keydown.esc="clearSearch"
        />
        <ListItem />

        <p class="msg-empty-arr" v-if="!matchesLength && searchValue.length !== 0">Country not found</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ListItem from '@/components/ListItem';

export default {
  name: 'Autocomplete',
  components: {
    ListItem
  },

  data: () => ({
    searchValue: ''
  }),

  computed: {
    ...mapGetters('autocomplete', [
      'selectedItem',
      'visible',
      'selectedIndex',
      'matchesLength',
      'matches'
    ])
  },

  watch: {
    searchValue: 'findMatches'
  },

  methods: {
    ...mapActions(['fetchAllCountries']),
    ...mapActions('autocomplete', [
      'toggleVisible',
      'changeSelectedIndex',
      'findMatches',
      'changeSelectedItem',
      'clearArrOfMatches'
    ]),
    startSearching() {
      this.toggleVisible();

      if (this.visible) {
        setTimeout(() => {
          this.$refs.searcInput.focus();
        }, 0);
      }
    },
    up() {
      if (this.selectedIndex === 0) return;
      this.changeSelectedIndex(this.selectedIndex - 1);
    },
    down() {
      if (this.selectedIndex >= this.matchesLength - 1) return;
      this.changeSelectedIndex(this.selectedIndex + 1);
    },
    onEnter() {
      this.changeSelectedItem(this.matches[this.selectedIndex]);
    },
    clearSearch() {
      this.searchValue = '';
      this.changeSelectedItem('');
      this.changeSelectedIndex(0);
      this.clearArrOfMatches();
    }
  },

  async mounted() {
    await this.fetchAllCountries();
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 400px;
  margin: 0 auto 0 20px;

  .autocomplete-wrap {
    width: 100%;
    position: relative;

    .placeholder-div {
      position: absolute;
      top: 14px;
      left: 20px;
      font-size: 20px;
      color: rgb(206, 206, 206);
      pointer-events: none;
    }

    .autocomplete {
      height: 55px;
      border-radius: 4px;
      border: 3px solid #455a64;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      font-size: 20px;
      padding: 10px 10px 10px 20px;
      cursor: text;
    }

    .input-wrap {
      min-height: 30px;
      border: 3px solid #455a64;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      right: 0;
      top: 52px;
      border-radius: 4px;
      text-align: center;

      input {
        width: 95%;
        margin-top: 5px;
        height: 40px;
        font-size: 18px;
        border-radius: 4px;
        padding-left: 10px;

        &:focus {
          border: 3px solid #455a64;
        }
      }

      .msg-empty-arr {
        color: red;
        font-size: 18px;
      }
    }

    .clear-btn {
      position: absolute;
      top: 13px;
      right: 12px;
      cursor: pointer;
      padding: 5px;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
