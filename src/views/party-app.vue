<template>
  <div class="party-app">
    <hero-img></hero-img>

    <!-- <section class="hero-box"> -->
    <!-- </section> -->
    <!-- <party-filter></party-filter> -->
    <!-- <img style="width: 300px" src="../assets/preview.png" alt /> -->
    <party-list :partys="partys"></party-list>
  </div>
</template>

<script>
import partyList from "@/components/party-list.cmp.vue";
// import partyFilter from "@/components/party-filter.cmp.vue";
import heroImg from "../components/hero-img.cmp.vue";

export default {
  name: "party-app",

  components: {
    partyList,
    // partyFilter,
    heroImg
  },
  computed: {
    isProcessing() {
      return this.$store.getters.isProcessing;
    },
    partys() {
      let partys = this.$store.getters.partys;
      return partys;
    }
  },
  created() {
    this.$store.dispatch({ type: "loadPartys" });
  }
};
</script>

<style lang="scss" scoped>
.party-app {
  .hero-box {
    img {
      width: 20%;
    }
  }
}
</style>
