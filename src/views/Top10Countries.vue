<template>
  <div>
    <p class="ma-3">Top 10 countries</p>
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
p {
  font-size: 30px;
  font-weight: bold;
}
</style>