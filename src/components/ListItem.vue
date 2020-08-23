<template>
  <div class="list-wrap" ref="list">
    <ul class="list">
      <li
        v-for="(item, index) of matches"
        :key="index"
        @click="onSelect(index)"
        class="list-item"
        :class="{ selected: selectedIndex === index }"
      >{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ListItem',
  data: () => ({
    itemHeight: 43
  }),

  computed: {
    ...mapGetters('autocomplete', ['selectedIndex', 'matches'])
  },

  watch: {
    selectedIndex: 'scrollToItem'
  },

  methods: {
    ...mapActions('autocomplete', [
      'changeSelectedIndex',
      'changeSelectedItem'
    ]),
    onSelect(index) {
      this.changeSelectedIndex(index);
      this.changeSelectedItem(this.matches[index]);
    },
    scrollToItem() {
      this.$refs.list.scrollTop = this.selectedIndex * this.itemHeight;
    }
  }
};
</script>

<style lang="scss" scoped>
.list-wrap {
  max-height: 800px;
  overflow: auto;
  margin-top: 4px;
  background-color: #fff;

  .list {
    list-style-type: none;
    text-align: left;

    .list-item {
      cursor: pointer;
      font-size: 20px;
      padding: 10px;

      &:hover {
        border-left: 2px solid #006064;
        transform: scale(1.04);
      }
    }

    .selected {
      border-bottom: 2px solid #006064;
      font-weight: bold;
    }
  }
}
</style>
