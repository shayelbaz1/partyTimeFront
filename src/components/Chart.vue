<script>
// CommitChart.js
import { Bar } from "vue-chartjs";
import ToyService from "@/services/ToyService.js";

export default {
  extends: Bar,
  methods: {
    getPricesArray(type, toys) {
      let prices = [];
      toys.forEach(toy => {
        if (toy.type === type) prices.push(+toy.price);
      });
      return prices;
    },

    avg(arr) {
      const sum = arr.reduce((a, b) => a + b, 0);
      const avg = sum / arr.length || 0;
      return avg;
    },

    loadBar() {
      ToyService.query().then(toys => {
        const funnyPrices = this.getPricesArray("Funny", toys);
        const eduPrices = this.getPricesArray("Educational", toys);

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