<template>
  <section class="welcome-page">
    <welcome-header></welcome-header>

    <div class="body">
      <h1 class="popular-title">Most Poplar Parties</h1>
      <party-list :partys="partys"></party-list>
      <hr />
      <h1 class="popular-title">Most Close To You</h1>
      <party-list :partys="partys"></party-list>
    </div>
  </section>
</template>

<script>
import partyList from "../components/party-list.cmp.vue";
import welcomeHeader from "../components/welcome-header.cmp.vue";
export default {
  name: "welcome-page",
  components: {
    partyList,
    welcomeHeader
  },
  computed: {
    partys() {
      let partys = this.$store.getters.partys;
      partys = partys.slice(0, 6);
      return partys;
    }
  },
  created() {
    this.$store.dispatch({ type: "loadPartys" });
  }
};
</script>