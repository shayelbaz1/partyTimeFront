<template>
  <div class="party-app">
    <hero-img></hero-img>
    <div class="flex">
      <party-filter></party-filter>
      <party-list :partys="partys" @addLike="addLike" @deleteParty="deleteParty"></party-list>
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
  methods: {
    deleteParty(partyId){
      this.$store.dispatch({ type: "deleteParty", partyId });
    },
    addLike(party){
      this.$store.dispatch({ type: "addLike", party });
    },
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
