<template>
  <main class="pa-3">
    <Loader v-if="isShowLoader" />

    <template v-else>
      <template v-if="currentCountryName">
        <section>
          <p class="ma-3 country-title">{{ currentCountryName }} statistics</p>
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
          <p class="ma-3 country-title">Visuals</p>

          <VisualBtns @visual-btn-clicked="updateVisuals" />

          <LineChart
            v-for="(visual, index) in visuals"
            :key="index"
            :chart-data="visual.chartData"
            :options="visual.options"
          />
        </section>
      </template>

      <ErrorAPIMsg v-else />
    </template>
  </main>
</template>

<script>
import StatCard from '@/components/StatCard';
import { mapActions, mapGetters } from 'vuex';
import Card from '@/components/classes/Card';
import LineChart from '@/components/LineChart';
import VisualBtns from '@/components/VisualBtns';
import Loader from '@/components/Loader';
import ErrorAPIMsg from '@/components/ErrorAPIMsg';

export default {
  name: 'Country',
  components: {
    StatCard,
    LineChart,
    VisualBtns,
    Loader,
    ErrorAPIMsg
  },

  data: () => ({
    cards: [],
    visuals: []
  }),

  computed: {
    ...mapGetters('currentCountry', [
      'labels',
      'currentCountryName',
      'cases',
      'deaths',
      'recovered'
    ]),
    ...mapGetters(['isShowLoader'])
  },

  watch: {
    '$route.params': {
      handler: 'getCountry',
      immediate: true,
      deep: true
    }
  },

  methods: {
    ...mapActions('currentCountry', ['fetchNewCountry']),
    updateStats() {
      const allCases = this.cases[this.cases.length - 1];
      const todayCases = allCases - this.cases[this.cases.length - 2];

      const allDeaths = this.deaths[this.deaths.length - 1];
      const todayDeaths = allDeaths - this.deaths[this.deaths.length - 2];

      const allRecovered = this.recovered[this.recovered.length - 1];
      const todayRecovered =
        allRecovered - this.recovered[this.recovered.length - 2];

      this.cards.length = 0;

      this.cards.push(
        new Card(
          'total cases',
          'blue lighten-1',
          allCases,
          todayCases,
          'mdi-alert-box'
        )
      );

      this.cards.push(
        new Card(
          'deaths',
          'deep-orange darken-4',
          allDeaths,
          todayDeaths,
          'mdi-emoticon-dead'
        )
      );

      this.cards.push(
        new Card(
          'recoveries',
          'green lighten-2',
          allRecovered,
          todayRecovered,
          'mdi-hospital-box'
        )
      );
    },
    updateVisuals(key) {
      this.visuals.length = 0;

      const chartLabels = {
        cases: 'Total cases',
        deaths: 'Deaths',
        recovered: 'Recovered'
      };

      const bgColors = {
        cases: '#42A5F5',
        deaths: '#BF360C',
        recovered: '#81C784'
      };

      this.visuals.push({
        chartData: {
          labels: this.labels,
          datasets: [
            {
              label: chartLabels[key],
              backgroundColor: bgColors[key],
              data: this[key]
            }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    },
    async getCountry({ country }) {
      await this.fetchNewCountry(country);

      if (this.currentCountryName) {
        this.updateStats();
        this.updateVisuals('cases');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.country-title {
  font-size: 30px;
  font-weight: bold;
}
</style>
