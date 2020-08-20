<template>
  <div class="list-wrap">
    <p class="ma-3 list-title">Top 10 countries</p>

    <Loader v-if="isShowLoader" />

    <TopList v-else :top-country-info="topCountryInfo" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TopList from '@/components/TopList';
import Loader from '@/components/Loader';

export default {
  name: 'Top10Countries',
  components: {
    TopList,
    Loader
  },

  computed: {
    ...mapGetters('topCountries', ['topCountryInfo']),
    ...mapGetters(['isShowLoader'])
  },

  methods: {
    ...mapActions('topCountries', ['fetchTopCountries'])
  },

  async mounted() {
    this.fetchTopCountries();
  }
};
</script>

<style lang="scss" scoped>
.list-title {
  font-size: 30px;
  font-weight: bold;
}

.list-wrap {
  margin-left: 20px;
}
</style>
