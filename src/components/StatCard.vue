<template>
  <v-card max-width="300" class="summary-card ma-3 pt-6" :class="bgColor" dark outlined tile>
    <div class="icon-wrapper">
      <v-icon>{{ cardIcon }}</v-icon>
    </div>

    <v-card-title class="headline text-bold">
      <span class="count" :title="cardAmountNew + ' last day'">{{ cardAmount }}</span>
    </v-card-title>

    <v-card-subtitle class="text-center text-bold">{{ cardTitle }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    bgColor: {
      type: String
    },
    cardIcon: {
      type: String
    },
    cardTitle: {
      type: String
    },
    cardAmount: {
      type: Number
    },
    cardAmountNew: {
      type: Number
    }
  }
};
</script>

<style lang="scss" scoped>
.text-bold {
  font-weight: 600;
}

.icon-wrapper {
  .v-icon {
    margin: auto;
    width: 100%;
    font-size: 2rem;
  }
}

.summary-card {
  width: 100%;
  border-radius: 5px !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  .headline {
    .count {
      width: 100%;
      text-align: center;
    }
  }
}
</style>