<template>
  <section class="welcome-page">
    <welcome-header></welcome-header>
    <party-filter v-show="false" :class="{ show: isShowFilter }"></party-filter>
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
import EventBus from "../services/EventBus";
import partyFilter from "../components/party-filter.vue";
export default {
  name: "welcome-page",
  data() {
    return {
      isShowFilter: false
    };
  },
  methods: {
    toggleFilter() {
      this.isShowFilter = !this.isShowFilter;
    }
  },
  components: {
    partyList,
    welcomeHeader,
    partyFilter
  },
  computed: {
    partys() {
      let partys = this.$store.getters.partys;
      partys = partys.slice(0, 6);
      return partys;
    }
  },
  created() {
    EventBus.$on("toggleFilter", this.toggleFilter);
    // this.$store.dispatch({ type: "loadPartys" });
  }
};
</script>