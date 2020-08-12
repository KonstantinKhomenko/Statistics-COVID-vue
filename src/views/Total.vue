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
      <div class="graf">
        <LineChart
          v-for="(visual, index) in visuals"
          :key="index"
          :chart-data="visual.chartData"
          :options="visual.options"
        />
      </div>
    </section>
  </main>
</template>

<script>
import StatCard from '@/components/StatCard';
import LineChart from '@/components/LineChart';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Total',
  components: {
    StatCard,
    LineChart
  },
  data: () => ({
    cards: [
      {
        title: 'total cases',
        bgColor: 'primary lighten-2',
        amount: 0,
        amountNew: 200,
        icon: 'mdi-alert-box'
      },
      {
        title: 'deaths',
        bgColor: 'red accent-2',
        amount: 0,
        amountNew: 200,
        icon: 'mdi-emoticon-dead'
      },
      {
        title: 'recoveries',
        bgColor: 'teal lighten-1',
        amount: 0,
        amountNew: 200,
        icon: 'mdi-hospital-box'
      }
    ],
    visuals: [
      {
        chartData: {
          labels: ['mkdsmk', 'fdfd', 'dsds', 'fdsfsfsd', 'dadsada'],
          datasets: [
            {
              label: 'das',
              backgroundColor: 'orangered',
              data: [49, 232, 23, 545, 3232]
            }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false }
      }
    ]
  }),

  computed: {
    ...mapGetters('data', ['allContinents'])
  },

  methods: {
    ...mapActions('data', ['fetchDataOnContinents']),
    updateStats() {
      if (this.allContinents) {
        this.cards[0].amount = this.allContinents.reduce((acc, el) => acc += el.cases, 0);
        this.cards[1].amount = this.allContinents.reduce((acc, el) => acc += el.deaths, 0);
        this.cards[2].amount = this.allContinents.reduce((acc, el) => acc += el.recovered, 0);

        this.cards[0].amountNew = this.allContinents.reduce((acc, el) => acc += el.todayCases, 0);
        this.cards[1].amountNew = this.allContinents.reduce((acc, el) => acc += el.todayDeaths, 0);
        this.cards[2].amountNew = this.allContinents.reduce((acc, el) => acc += el.todayRecovered, 0);

      }
    }
  },

  async mounted() {
    await this.fetchDataOnContinents();
    this.updateStats();
  }
};
</script>

<style lang="scss" scoped>
.graf {
  width: 100%;
  height: 100%;
  max-width: 1000px;
  margin: auto;
}
</style>
