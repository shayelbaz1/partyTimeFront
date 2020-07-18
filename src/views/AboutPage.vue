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
        v-for="(party, index) in parties"
        :position="party.location"
        :clickable="true"
        :draggable="true"
        @click="togglePreview(party)"
        title="hello world"
        icon="http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png"
      />
    </GmapMap>
    <party-preview v-if="isOpenPrev" :party="party"></party-preview> 
  </div>
</template>

<script>
import Chart from '@/components/Chart.vue'
import partyPreview from '../components/party-preview.cmp'
import chartPartysYear from '../components/chart-partys-year.vue'
import { GoogleMap } from 'vue-maps'

export default {
  name: 'About',
  data() {
    return {
      isOpenPrev: false,
      parties: [],
      center: { lat: 31.05764, lng: 35.052906 },
      zoom: 7,
      party: null
    }
  },
  components: {
    Chart,
    chartPartysYear,
    GoogleMap,
    partyPreview
  },
  methods: {
    togglePreview(party){
      this.isOpenPrev = true
      this.party = party
    } 
  },
  async created() {
    const parties = await this.$store.dispatch({
      type: 'getPartyByLocation',
    })
    this.parties = parties
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
