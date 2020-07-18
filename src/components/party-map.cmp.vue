<template>
  <div class="party-map">
    <GmapMap :center="center" :zoom="zoom" map-type-id="terrain" style="width: 96%; height: 300px;">
      <GmapMarker
        :key="index"
        v-for="(party, index) in partys"
        :position="party.location"
        :clickable="true"
        :draggable="false"
        @click="togglePreview(party)"
        title="hello world"
      />
    </GmapMap>
    <party-preview v-if="party" :party="party"></party-preview>
  </div>
</template>

<script>
import partyPreview from "../components/party-preview.cmp";
import { GoogleMap } from "vue-maps";

export default {
  name: "party-map",
  data() {
    return {
      partys: [],
      center: { lat: 31.05764, lng: 35.052906 },
      zoom: 7,
      party: null
    };
  },
  components: {
    GoogleMap,
    partyPreview
  },
  methods: {
    togglePreview(party) {
      this.isOpenPrev = true;
      this.party = party;
    }
  },
  async created() {
    const partys = await this.$store.dispatch({
      type: "getPartyByLocation"
    });
    this.partys = partys;
    this.party = partys[0];
  }
};
</script>

<style lang="scss">
.party-map {
  width: 100%;
}
.vue-map-container {
  width: 100%;
  margin: 15px auto;
}
.vue-map {
  border-radius: 7px;
}
.el-button {
  margin: 10px;
}
</style>
