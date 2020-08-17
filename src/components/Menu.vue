<template>
  <v-menu left bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="(name, index) in topCountryNames" :key="index" @click="foo(name)">
        <v-list-item-title>{{ name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Menu',
  computed: {
    ...mapGetters('topCountries', ['topCountryNames'])
  },

  methods: {
    ...mapActions('topCountries', ['fetchTopCountries']),
    foo(value) {
      console.log(value);
    }
  },

  async mounted() {
    this.fetchTopCountries();
  }
};
</script>
