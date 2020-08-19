<template>
  <div class="list-wrap">
    <p class="ma-3 list-title">Top 10 countries</p>
    <TopList :top-country-info="topCountryInfo" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TopList from '@/components/TopList';

export default {
  name: 'Top10Countries',
  components: {
    TopList
  },

  computed: {
    ...mapGetters('topCountries', ['topCountryInfo'])
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
  margin-left: 30px;
}
</style>
