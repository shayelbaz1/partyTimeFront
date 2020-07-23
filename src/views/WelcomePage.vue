<template>
  <section class="welcome-page">
    <welcome-header></welcome-header>
    <party-filter v-show="false" :class="{ show: isShowFilter }"></party-filter>
    <div class="body">
      <div class="btn-header">
        <h1 class="popular-title">Most popular parties around you</h1>
        <button class="btn" @click.stop="$router.push('party-app')">Explore all</button>
      </div>
      <party-list :partys="partys"></party-list>
    </div>
    <div class="body">
      <div class="btn-header">
        <h1 class="popular-title">Most close to you</h1>
        <button class="btn" @click.stop="$router.push('party-app')">Explore all</button>
      </div>
      <party-list :partys="partysClose"></party-list>
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
      partys = partys.slice(0, 4);
      return partys;
    },
    partysClose() {
      let partys = this.$store.getters.partys;
      partys = partys.slice(1, 5);
      return partys;
    }
  },
  created() {
    EventBus.$on("toggleFilter", this.toggleFilter);
    // this.$store.dispatch({ type: "loadPartys" });
  }
};
</script>