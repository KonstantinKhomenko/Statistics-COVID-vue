<template>
  <v-list>
    <v-list-item>
      <v-list-item-title class="country-index country-title">#</v-list-item-title>
      <v-list-item-title class="country-title">Country</v-list-item-title>
      <v-list-item-title class="country-title">Cases</v-list-item-title>
    </v-list-item>

    <v-list-item
      v-for="(country, index) in topCountryInfo"
      :key="country.cases"
      link
      :to="`country/${country.name}`"
    >
      <v-list-item-title class="country-index">{{ index + 1 }}</v-list-item-title>
      <v-list-item-title class="country-name">{{ country.name }}</v-list-item-title>
      <v-list-item-title>{{ country.cases }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'TopList',
  props: {
    topCountryInfo: {
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped>
.country-index {
  flex: none;
  font-weight: bold;
  width: 50px;
  font-size: 1.1rem;
}

.country-title {
  font-weight: bold;
  font-size: 1.3rem;
  color: red;
}

.country-name {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
