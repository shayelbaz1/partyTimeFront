<script>
import { Bar } from "vue-chartjs";
import ToyService from "@/services/ToyService.js";

export default {
  extends: Bar,
  data() {
    return {
      chartdata: {
        labels: [1992, 1992, 1992],
        datasets: [
          {
            label: "Toys amount per year",
            backgroundColor: "#f87979",
            data: [1, 2, 3]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  methods: {
    getAmountPerYearObject(toys) {
      var counts = {};
      let years = toys.map(toy => {
        return new Date(toy.createdAt).getFullYear();
      });

      years.forEach(function(x) {
        counts[x] = (counts[x] || 0) + 1;
      });

      return counts;
    }
  },
  mounted() {
    ToyService.query().then(toys => {
      const counts = this.getAmountPerYearObject(toys);
      this.chartdata.labels = Object.keys(counts);
      this.chartdata.data = Object.values(counts);

      this.renderChart(this.chartdata, this.options);
    });
  }
};
</script>