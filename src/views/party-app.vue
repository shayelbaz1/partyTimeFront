<template>
  <div class="party-app">
    <hero-img></hero-img>
    <div class="display-btns">
      
      <button @click="displayBy('list')" :class="{active: currPartiesDisplay==='list'}"><i class="fas fa-list"></i>  List</button>
      <button @click="displayBy('map')" :class="{active: currPartiesDisplay==='map'}"><i class="fas fa-map-marker-alt"></i>  Map</button>
      <button @click="displayBy('posters')" :class="{active: currPartiesDisplay==='posters'}"><i class="fas fa-images"></i>  Posters</button>
    </div>
    <div class="flex">
      <party-filter></party-filter>
      <party-list
        v-if="currPartiesDisplay==='list'"
        :partys="partys"
        @addLike="addLike"
        @deleteParty="deleteParty"
      ></party-list>
      <div v-if="currPartiesDisplay==='posters'" class="grid posters">
        <div :key="party._id" v-for="party in partys">
          <img :src="party.imgUrl" />
        </div>
      </div>
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
  data() {
    return {
      currPartiesDisplay: "list"
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
  }
};
</script>

<style lang="scss" scoped>
.posters {
  columns: 3;
  width: 70%;
  img {
    width: 100%;
  }
}

.display-btns{
  button {
    margin: 4px;
        border: 0;
        background-color: rgb(0, 0, 0);
        padding: 10px;
        border-radius: 6px;
          color: white;

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
