<template>
  <div class="list-wrap">
    <Loader v-if="isShowLoader" />

    <template v-else>
      <template v-if="topCountryInfo.length">
        <p class="ma-3 list-title">Top 10 countries</p>

        <TopList :top-country-info="topCountryInfo" />
      </template>

      <ErrorAPIMsg v-else />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TopList from '@/components/TopList';
import Loader from '@/components/Loader';
import ErrorAPIMsg from '@/components/ErrorAPIMsg';

export default {
  name: 'Top10Countries',
  components: {
    TopList,
    Loader,
    ErrorAPIMsg
  },

  computed: {
    ...mapGetters('topCountries', ['topCountryInfo']),
    ...mapGetters(['isShowLoader'])
  },

  methods: {
    ...mapActions('topCountries', ['fetchTopCountries'])
  },

  async mounted() {
    await this.fetchTopCountries();
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
