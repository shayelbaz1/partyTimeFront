<script>
import { Bar } from "vue-chartjs";
import PartyService from "@/services/PartyService.js";

export default {
  extends: Bar,
  data() {
    return {
      chartdata: {
        labels: [1992, 1992, 1992],
        datasets: [
          {
            label: "Partys amount per year",
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
    getAmountPerYearObject(partys) {
      var counts = {};
      let years = partys.map(party => {
        return new Date(party.createdAt).getFullYear();
      });

      years.forEach(function(x) {
        counts[x] = (counts[x] || 0) + 1;
      });

      return counts;
    }
  },
  mounted() {
    PartyService.query().then(partys => {
      const counts = this.getAmountPerYearObject(partys);
      this.chartdata.labels = Object.keys(counts);
      this.chartdata.data = Object.values(counts);

      this.renderChart(this.chartdata, this.options);
    });
  }
};
</script>