<template>
  <div class="toy-app">
    <img alt="Vue logo" src="../assets/toy.png" />
    <toy-filter></toy-filter>
    <img style="width: 300px" src="../assets/preview.png" alt />
    <toy-list :toys="toys"></toy-list>
  </div>
</template>

<script>
import toyList from "@/components/toy-list.cmp.vue";
import toyFilter from "@/components/toy-filter.cmp.vue";

export default {
  name: "toy-app",

  components: {
    toyList,
    toyFilter
  },
  computed: {
    isProcessing() {
      return this.$store.getters.isProcessing;
    },
    toys() {
      let toys = this.$store.getters.toys;
      return toys;
    }
  },
  created() {
    this.$store.dispatch({ type: "loadToys" });
  }
};
</script>

<style scoped>
img {
  width: 20%;
}
</style>
