<template>
  <div>
    <h6>Countries</h6>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Countries',
  computed: {
    ...mapGetters('currentCountry', ['labels'])
  },

  methods: {
    ...mapActions('currentCountry', ['fetchNewCountry', 'getCountryInfo'])
  },

  async mounted() {
    await this.fetchNewCountry('Ukraine');
    this.getCountryInfo();
  }
};
</script>
