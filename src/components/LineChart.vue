<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: {
    chartData: {
      type: Object
    },
    options: {
      type: Object
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
