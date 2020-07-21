<template>
  <div class="party-app">
    <div class="hidden-screen" v-if="isShowFilter" @click="toggleFilter"></div>
    <!-- <welcome-header></welcome-header> -->
    <hero-img></hero-img>
    <div class="flex">
      <party-filter v-if="partys" :partys="partys" :class="{ show: isShowFilter }"></party-filter>
      <div class="flex column-layout">
        <div class="display-btns flex">
          <button @click="displayBy('list')" :class="{ active: currPartiesDisplay === 'list' }">
            <i class="fas fa-list"></i>
            List
          </button>
          <button @click="displayBy('map')" :class="{ active: currPartiesDisplay === 'map' }">
            <i class="fas fa-map-marker-alt"></i>
            Map
          </button>
          <button
            @click="displayBy('posters')"
            :class="{ active: currPartiesDisplay === 'posters' }"
          >
            <i class="fas fa-images"></i>
            Posters
          </button>
        </div>

        <party-list
          v-if="currPartiesDisplay === 'list'"
          :partys="partys"
          @addLike="addLike"
          @deleteParty="deleteParty"
        ></party-list>

        <div v-if="currPartiesDisplay === 'posters'" class="grid posters">
          <div :key="party._id" v-for="party in partys">
            <img :src="party.imgUrl" @click="moveToDetails(party._id)" />
          </div>
        </div>

        <party-map v-if="currPartiesDisplay === 'map'"></party-map>
      </div>
    </div>
  </div>
</template>

<script>
import partyList from "@/components/party-list.cmp.vue";
import partyMap from "@/components/party-map.cmp.vue";
import partyFilter from "../components/party-filter.vue";
import heroImg from "../components/hero-img.cmp.vue";
import EventBus from "../services/EventBus";
import welcomeHeader from "../components/welcome-header.cmp.vue";

export default {
  name: "party-app",

  components: {
    partyList,
    partyMap,
    partyFilter,
    heroImg,
    welcomeHeader
  },
  data() {
    return {
      currPartiesDisplay: "list",
      isShowFilter: false
    };
  },
  methods: {
    displayBy(displayBy) {
      this.currPartiesDisplay = displayBy;
    },
    deleteParty(partyId) {
      this.$store.dispatch({ type: "deleteParty", partyId });
    },
    addLike(party) {
      this.$store.dispatch({ type: "addLike", party });
    },
    toggleFilter() {
      this.isShowFilter = !this.isShowFilter;
    },
    moveToDetails(id) {
      this.$router.push("party-app/details/" + id);
    }
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
    EventBus.$on("toggleFilter", this.toggleFilter);
  }
};
</script>

<style lang="scss" scoped>
.hidden-screen {
  cursor: pointer;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 3;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.356);
}
.posters {
  columns: 3;
  width: 100%;
  img {
    width: 100%;
  }
}

.display-btns {
  width: 90%;
  button {
    margin: 4px;
    border: 0;
    background-color: rgb(0, 0, 0);
    padding: 10px;
    border-radius: 6px;
    color: white;
    width: 100%;

    &.active {
      background-color: #c1272d;
    }
    i {
      color: white;
    }
    &:hover {
      background-color: #c1272d;
    }
  }
}

.party-app {
  .hero-box {
    img {
      width: 20%;
    }
  }
}
</style>
