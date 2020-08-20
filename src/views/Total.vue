<template>
  <main class="pa-3">
    <Loader v-if="isShowLoader" />

    <template v-else>
      <template v-if="allContinents && allCases">
        <section>
          <p class="ma-3 total-title">World summary sats</p>
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
          <p class="ma-3 total-title">Visuals</p>

          <VisualBtns @visual-btn-clicked="showVisuals" />

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
import LineChart from '@/components/LineChart';
import { mapActions, mapGetters } from 'vuex';
import Card from '@/components/classes/Card';
import VisualBtns from '@/components/VisualBtns';
import Loader from '@/components/Loader';
import ErrorAPIMsg from '@/components/ErrorAPIMsg';

export default {
  name: 'Total',
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
    ...mapGetters('world', [
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
    ]),
    ...mapGetters(['isShowLoader'])
  },

  methods: {
    ...mapActions('world', ['fetchDataOnWorld', 'getAllValues']),
    updateStats() {
      this.cards.push(
        new Card(
          'total cases',
          'blue lighten-1',
          this.allContinentsCases,
          this.allContinentsTodayCases,
          'mdi-alert-box'
        )
      );

      this.cards.push(
        new Card(
          'deaths',
          'deep-orange darken-4',
          this.allContinentsDeaths,
          this.allContinentsTodayDeaths,
          'mdi-emoticon-dead'
        )
      );

      this.cards.push(
        new Card(
          'recoveries',
          'green lighten-2',
          this.allContinentsRecovered,
          this.allContinentsTodayRecovered,
          'mdi-hospital-box'
        )
      );
    },
    showVisuals(value) {
      this.getAllValues(value);
      this.updateVisuals(value);
    },
    updateVisuals(key) {
      this.visuals.length = 0;

      const labels = {
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
    await this.fetchDataOnWorld();

    if (this.allContinents && this.allCases) {
      this.updateStats();
      this.showVisuals('cases');
    }
  }
};
</script>

<style lang="scss" scoped>
.total-title {
  font-size: 30px;
  font-weight: bold;
}
</style>
