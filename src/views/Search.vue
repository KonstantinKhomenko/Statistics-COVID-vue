<template>
  <div>
    <p class="ma-3 list-title">Search country</p>
    <Loader v-if="isShowLoader" />
    <div class="autocomplete-wrap d-flex">
      <Autocomplete />
      <v-btn class="ma-3" color="cyan" elevation="10" @click="searchBtnClicked">Search</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from '@/components/Loader';
import Autocomplete from '@/components/Autocomplete';

export default {
  components: {
    Loader,
    Autocomplete
  },

  computed: {
    ...mapGetters(['isShowLoader']),
    ...mapGetters('autocomplete', ['selectedItem'])
  },

  methods: {
    searchBtnClicked() {
      if (this.selectedItem) {
        this.$router.push({
          name: 'Country',
          params: {
            country: this.selectedItem
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.list-title {
  font-size: 30px;
  font-weight: bold;
}

.autocomplete-wrap {
  max-width: 550px;
  align-items: center;
}
</style>