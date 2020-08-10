<template>
  <main class="pa-3">
    <section>
      <h1 class="display-1 ma-3">World summary sats</h1>
      <v-row align="center" justify="center">
        <StatCard
          v-for="card in cards"
          :key="card.title"
          :bg-color="card.bgColor"
          :card-icon="card.icon"
          :card-title="card.title"
          :card-amount="card.amount"
          :card-amount-new="card.amountNew"
        />
      </v-row>
    </section>

    <section>
      <h2 class="display-1 ma-3">Visuals</h2>
    </section>
  </main>
</template>

<script>
import StatCard from '@/components/StatCard';

export default {
  name: 'Total',
  components: {
    StatCard
  },
  data: () => ({
    cards: [
      {
        title: 'total cases',
        bgColor: 'primary lighten-2',
        amount: 1000,
        amountNew: 200,
        icon: 'mdi-alert-box'
      },
      {
        title: 'deaths',
        bgColor: 'red accent-2',
        amount: 1000,
        amountNew: 200,
        icon: 'mdi-emoticon-dead'
      },
      {
        title: 'recoveries',
        bgColor: 'teal lighten-1',
        amount: 1000,
        amountNew: 200,
        icon: 'mdi-hospital-box'
      }
    ]
  })
};
</script>
