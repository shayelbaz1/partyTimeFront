<template>
  <div class="about">
    <h1>Dashboard page</h1>
    <div class="flex space-around">
      <Chart />
      <chart-toys-year />
    </div>
  </div>
</template>

<script>
import Chart from "@/components/Chart.vue";
import chartToysYear from "../components/chart-toys-year.vue";

export default {
  name: "Dashboard",
  components: {
    Chart,
    chartToysYear
  }
};
</script>
