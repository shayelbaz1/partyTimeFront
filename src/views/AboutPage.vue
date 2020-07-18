<template>
  <div class="about">
    <h1>About page</h1>
    <h2>Our Locations</h2>
    <GmapMap
      :center="center"
      :zoom="zoom"
      map-type-id="terrain"
      style="width: 500px; height: 300px;"
    >
      <GmapMarker
        :key="index"
        v-for="(marker, index) in markers"
        :position="marker"
        :clickable="true"
        :draggable="true"
        @click="toggleInfoWindow(marker, index)"
        title="hello world"
        icon="http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png"
      />
      <gmap-info-window
      :position="infoWindowPos"
      :opened="infoWinOpen"
      :options="infoOptions"
      @closeclick="infoWinOpen=false">
          <div v-html="infoContent"></div>
      </gmap-info-window>
    </GmapMap>
  </div>
</template>

<script>
import Chart from '@/components/Chart.vue'
import chartPartysYear from '../components/chart-partys-year.vue'
import { GoogleMap } from 'vue-maps'

export default {
  name: 'About',
  data() {
    return {
      infoContent: '',
      infoWindowPos: {
          lat: 0,
          lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
      },
      markers: [],
      center: { lat: 31.05764, lng: 35.052906 },
      zoom: 7,
    }
  },
  components: {
    Chart,
    chartPartysYear,
    GoogleMap,
  },
  methods: {
    goToDetails(partyId) {
      this.$router.push(`/party-app/details/${partyId}`)
    }, 
    toggleInfoWindow(marker, idx) {
        this.infoWindowPos = {lat:marker.lat, lng: marker.lng};
        this.infoContent = this.getInfoWindowContent(marker);
        
        //check if its the same marker that was selected if yes toggle
        if (this.currentMidx == idx) this.infoWinOpen = !this.infoWinOpen;
        //if different marker set infowindow to open and reset current marker index
        else {
          this.infoWinOpen = true;
          this.currentMidx = idx;
        }
    },
    getInfoWindowContent(marker) {
      return (`<div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src=${marker.imgUrl} alt="Placeholder image">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">${marker.name}</p>
                    <button onclick="this.goToDetails(${marker.id})">Details</button>
                  </div>
                </div>
              </div>
            </div>`);
      }   
  },
  async created() {
    const locations = await this.$store.dispatch({
      type: 'getPartyByLocation',
    })
    this.markers = locations
  },
}
</script>

<style scoped>
.vue-map-container {
  margin: auto;
}
.el-button {
  margin: 10px;
}
</style>
