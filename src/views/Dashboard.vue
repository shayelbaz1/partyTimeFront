<template>
  <div class="about">
    <h1>Dashboard page</h1>
    <div class="flex space-around">
      <Chart />
      <chart-partys-year />
    </div>
  </div>
</template>

<script>
import Chart from "@/components/Chart.vue";
import chartPartysYear from "../components/chart-partys-year.vue";

export default {
  name: "Dashboard",
  components: {
    Chart,
    chartPartysYear
  }
};
</script>
