<template>
  <div class="party-app">
    <div class="hidden-screen" v-if="isShowFilter" @click="toggleFilter"></div>
    <button @click="toggleFilter" class="add filter">
      <!-- <i class="fa fa-plus my-float"></i> -->
      <!-- <i class="fas fa-search my-float"></i> -->
      <img style="width: 66%;" src="../assets/filter.png" alt />
    </button>
    <!-- <welcome-header></welcome-header> -->
    <hero-img></hero-img>
    <div class="flex">
      <party-filter v-if="partys" :class="{ show: isShowFilter }"></party-filter>
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
        <h1>Events around {{placeName}}</h1>
        <party-list
          v-if="currPartiesDisplay === 'list' && partys.length"
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
      window.scrollTo(0, 350);
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
      return this.$store.getters.partys;
    },
    placeName() {
      return this.$store.getters.place.name;
    }
  },
  created() {
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
  column-gap: 0;
  img {
    width: 100%;
    cursor: pointer;
  }
}

.display-btns {
  width: 90%;
  // margin-top: 7.5px;
  width: 100%;
  padding: 7.5px 10px;
  position: sticky;
  top: 55px;
  z-index: 2;
  background-color: #272727;
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
  button.add {
    position: fixed;
    width: 50px;
    height: 50px;
    bottom: 5px;
    left: 5px;
    background-color: #850000;
    color: #fff;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px rgb(0, 0, 0);
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    z-index: 1;
    &:active {
      box-shadow: none;
    }
    img {
      filter: invert(1);
    }
  }

  .filter {
    visibility: hidden;
  }

  @media screen and (max-width: 600px) {
    button.add {
      bottom: 60px;
    }
  }
  @media screen and (max-width: 900px) {
    .filter {
      visibility: visible;
    }
  }
}
@media screen and (max-width: 600px) {
  .display-btns {
    position: fixed;
    bottom: 0;
    top: auto;
    margin-bottom: 0px;
    padding: 0;
    button {
      margin: 0;
      outline: none;
      border-radius: 0;
    }
  }
}

@media screen and (max-width: 420px) {
  .posters {
    columns: 2;
  }

  .display-btns {
    button {
      padding: 15px;
    }
  }
}
</style>
