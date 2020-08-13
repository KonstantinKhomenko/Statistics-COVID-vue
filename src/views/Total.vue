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
      <v-btn
        class="ma-3 primary lighten-2"
        elevation="10"
        small
        @click="showVisuals('cases')"
        >Total cases
      </v-btn>
      <v-btn
        class="ma-3 red accent-2"
        elevation="10"
        small
        @click="showVisuals('deaths')"
        >Deaths
      </v-btn>
      <v-btn
        class="ma-3 teal lighten-1"
        elevation="10"
        small
        @click="showVisuals('recovered')"
        >Recoveries
      </v-btn>
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
    cards: [],
    visuals: []
  }),

  computed: {
    ...mapGetters('data', [
      'allContinents',
      'allContinentsCases',
      'allContinentsTodayCases',
      'allContinentsDeaths',
      'allContinentsTodayDeaths',
      'allContinentsRecovered',
      'allContinentsTodayRecovered',
      'allCases',
      'allDataDate',
      'allDataNumbers'
    ])
  },

  methods: {
    ...mapActions('data', [
      'fetchDataOnContinents',
      'fetchAllCases',
      'getAllValues'
    ]),
    updateStats() {
      if (!this.allContinents) return;

      this.cards.push({
        title: 'total cases',
        bgColor: 'primary lighten-2',
        amount: this.allContinentsCases,
        amountNew: this.allContinentsTodayCases,
        icon: 'mdi-alert-box'
      });

      this.cards.push({
        title: 'deaths',
        bgColor: 'red accent-2',
        amount: this.allContinentsDeaths,
        amountNew: this.allContinentsTodayDeaths,
        icon: 'mdi-emoticon-dead'
      });

      this.cards.push({
        title: 'recoveries',
        bgColor: 'teal lighten-1',
        amount: this.allContinentsRecovered,
        amountNew: this.allContinentsTodayRecovered,
        icon: 'mdi-hospital-box'
      });
    },
    showVisuals(value) {
      this.getAllValues(value);
      this.updateVisuals(value);
    },
    updateVisuals(key) {
      if (!this.allCases) return;

      this.visuals.length = 0;

      const labels = {
        cases: 'Total cases',
        deaths: 'Deaths',
        recovered: 'Recovered'
      };

      const bgColors = {
        cases: '#6aaaff',
        deaths: '#FF5252',
        recovered: '#26a69a'
      };

      this.visuals.push({
        chartData: {
          labels: this.allDataDate,
          datasets: [
            {
              label: labels[key],
              backgroundColor: bgColors[key],
              data: this.allDataNumbers
            }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }
  },

  async mounted() {
    await this.fetchDataOnContinents();
    this.updateStats();

    await this.fetchAllCases();

    this.showVisuals('cases');
  }
};
</script>

<style lang="scss" scoped>
.graf {
  width: 100%;
  height: 100%;
  max-width: auto;
  margin: auto;
}
</style>
