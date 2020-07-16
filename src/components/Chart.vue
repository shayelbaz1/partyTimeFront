<script>
// CommitChart.js
import { Bar } from "vue-chartjs";
import PartyService from "@/services/PartyService.js";

export default {
  extends: Bar,
  methods: {
    getPricesArray(type, partys) {
      let prices = [];
      partys.forEach(party => {
        if (party.type === type) prices.push(+party.price);
      });
      return prices;
    },

    avg(arr) {
      const sum = arr.reduce((a, b) => a + b, 0);
      const avg = sum / arr.length || 0;
      return avg;
    },

    loadBar() {
      PartyService.query().then(partys => {
        const funnyPrices = this.getPricesArray("Funny", partys);
        const eduPrices = this.getPricesArray("Educational", partys);

        this.renderChart({
          labels: ["Funny", "Educational"],
          datasets: [
            {
              label: "Avg Prices",
              backgroundColor: "#f87979",
              data: [this.avg(funnyPrices), this.avg(eduPrices)]
            }
          ]
        });
      });
    }
  },
  mounted() {
    this.loadBar();
  }
};
</script>