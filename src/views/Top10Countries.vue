<template>
  <div>
    <h2 class="ma-3">Top 10 countries</h2>
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
