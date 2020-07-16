<template>
  <div class="toy-app">
    <hero-img></hero-img>

    <!-- <section class="hero-box"> -->
    <!-- </section> -->
    <!-- <toy-filter></toy-filter> -->
    <!-- <img style="width: 300px" src="../assets/preview.png" alt /> -->
    <toy-list :toys="toys"></toy-list>
  </div>
</template>

<script>
import toyList from "@/components/toy-list.cmp.vue";
import toyFilter from "@/components/toy-filter.cmp.vue";
import heroImg from "../components/hero-img.cmp.vue";

export default {
  name: "toy-app",

  components: {
    toyList,
    toyFilter,
    heroImg
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

<style lang="scss" scoped>
.toy-app {
  .hero-box {
    img {
      width: 20%;
    }
  }
}
</style>
