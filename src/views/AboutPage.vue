<template>
  <div class="about">
    <h1>About page</h1>
    <h2>Our Locations</h2>
    <input v-model="locationName" type="text" @input="getParties">
    <GmapMap
      :center="center"
      :zoom="zoom"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        :key="index"
        v-for="(marker, index) in markers"
        :position="marker"
        :clickable="true"
        :draggable="true"
        title="hello world"
        icon="http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png"
      />
    </GmapMap>
    <!-- <el-button @click="setCenter('TLV')">Tel Aviv</el-button>
    <el-button @click="setCenter('jerusalem')">Jerusalem</el-button>
    <el-button @click="setCenter('eilat')">Eilat</el-button> -->
  </div>
</template>

<script>
import Chart from "@/components/Chart.vue";
import chartPartysYear from "../components/chart-partys-year.vue";
import { GoogleMap } from "vue-maps";

export default {
  name: "About",
  data() {
    return {
      locationName: "",
      markers: [],
      center: { lat: 31.05764, lng: 35.052906 },
      zoom: 7
    };
  },
  components: {
    Chart,
    chartPartysYear,
    GoogleMap
  },
  methods: {
    async getParties(){
      const locations = await this.$store.dispatch({
        type:"getPartyByLocation",
        locationName: this.locationName
      })
      this.markers = locations
    },
    setCenter(city) {
      if (city === "TLV") {
        this.center = { lat: 32.109333, lng: 34.855499 };
        this.zoom = 11;
      }
      if (city === "jerusalem") {
        this.center = { lat: 31.771959, lng: 35.217018 };
        this.zoom = 11;
      }
      if (city === "eilat") {
        this.center = { lat: 29.55805, lng: 34.94821 };
        this.zoom = 11;
      }
    }
  }
};
</script>

<style scoped>
.vue-map-container {
  margin: auto;
}
.el-button {
  margin: 10px;
}
</style>