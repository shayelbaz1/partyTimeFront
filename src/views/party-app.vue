<template>
  <div class="party-app">
    <hero-img></hero-img>
    <div class="flex">
      <party-filter></party-filter>
      <party-list :partys="partys"></party-list>
    </div>
  </div>
</template>

<script>
import partyList from "@/components/party-list.cmp.vue";
import partyFilter from "../components/party-filter.vue";
import heroImg from "../components/hero-img.cmp.vue";

export default {
  name: "party-app",

  components: {
    partyList,
    partyFilter,
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
