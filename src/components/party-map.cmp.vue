<template>
  <div class="party-map">
    <!-- <h1>{{place.name}}</h1> -->

    <div class="search-box flex justify-center mb0 pb0">
      <GmapAutocomplete @place_changed="setPlace"></GmapAutocomplete>
      <button class="search-loc" @click.prevent="selectTxt">
        <i class="fas fa-search"></i>
      </button>

      <button class="geolocation" @click.stop="geoLocation()">
        <i class="far fa-compass"></i>
      </button>
    </div>

    <!-- :options="{disableDefaultUI:true}" -->
    <GmapMap
      v-if="place.pos"
      :options="{mapTypeControl: false,streetViewControl:false}"
      backgroundColor="black"
      :center="place.pos"
      :zoom="zoom"
      map-type-id="roadmap"
      style="width: 96%; height: 300px;"
    >
      <GmapMarker :position="place.pos" :draggable="false" title="hello world" />
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
import GeocodeService from "../services/GeocodeService";

export default {
  name: "party-map",
  data() {
    return {
      partys: [],
      zoom: 12,
      party: null,
      place: {
        name: null,
        pos: { lat: 0, lng: 0 }
      }
    };
  },
  components: {
    GoogleMap,
    partyPreview
  },
  methods: {
    geoLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // this.center = currentLocation;
        this.place.pos = currentLocation;
        this.getCityNameByLatLng(currentLocation);
      });
    },
    async getCityNameByLatLng(currentLocation) {
      const cityName = await GeocodeService.getCityByLatLng(currentLocation);
      this.place.name = cityName;
      this.$el.querySelector("input.pac-target-input").value = this.place.name;
    },
    togglePreview(party) {
      this.isOpenPrev = true;
      this.party = party;
    },
    setPlace(place) {
      this.place.name = place.formatted_address;
      this.place.pos.lat = place.geometry.location.lat();
      this.place.pos.lng = place.geometry.location.lng();
    },
    selectTxt() {
      // this.$el.querySelector("input.pac-target-input").value = "";
      this.$el.querySelector("input.pac-target-input").select();
    }
  },
  async created() {
    const partys = await this.$store.dispatch({
      type: "getPartyByLocation"
    });
    this.partys = partys;
    this.party = partys[0];
  },
  mounted() {
    this.geoLocation();
  }
};
</script>

<style lang="scss">
.search-box {
  position: absolute;
  z-index: 1;
  right: 78px;
  margin-top: 10px;
  button {
    height: 40px;
    padding: 0px 10px;
    font-size: 1rem;
  }
  input {
    border-radius: 7px 0px 0px 7px;
    border: none;
    outline: none;
    &:focus {
      box-shadow: 0px 0px 10px 0px black;
    }
    &:hover {
      box-shadow: 0px 0px 10px 0px black;
    }
  }
  button.search-loc {
    border-radius: 0px 7px 7px 0px;
    margin-right: 5px;
  }
}
.party-map {
  width: 100%;
}
.vue-map-container {
  width: 100%;
  margin: 0px auto;
  margin-top: 0px;
  margin-bottom: 15px;
}
.vue-map {
  border-radius: 7px;
}
.el-button {
  margin: 10px;
}
</style>
