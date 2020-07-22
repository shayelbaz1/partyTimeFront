<template>
  <div class="search-box flex justify-center mb0 pb0">
    <GmapAutocomplete @place_changed="setPlace"></GmapAutocomplete>
    <button class="search-loc" @click.prevent="selectTxt">
      <i class="fas fa-search"></i>
    </button>

    <button class="geolocation" @click.stop="geoLocation()">
      <i class="far fa-compass"></i>
    </button>
  </div>
</template>

<script>
import { GoogleMap } from "vue-maps";
import GeocodeService from "../services/GeocodeService";
export default {
  data() {
    return {
      zoom: 12,
      place: {
        name: "",
        pos: { lat: 0, lng: 0 }
      }
    };
  },
  name: 'map-search',
  components: {
    GoogleMap
  },
  mounted() {
    this.geoLocation();
  },
  methods: {
    geoLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.place.pos = currentLocation;
        this.getCityNameByLatLng(currentLocation);
      });
    },
    async getCityNameByLatLng(currentLocation) {
      const cityName = await GeocodeService.getCityByLatLng(currentLocation);
      this.place.name = cityName;
      // this.$el.querySelector("input.pac-target-input").value = "";
      if (this.place.name) {
        this.$el.querySelector(
          "input.pac-target-input"
        ).value = this.place.name;
      }
      this.$store.commit({
        type: "setPlace",
        place: JSON.parse(JSON.stringify(this.place))
      });
    },
    setPlace(place) {
      this.place.name = place.formatted_address;
      this.place.pos.lat = place.geometry.location.lat();
      this.place.pos.lng = place.geometry.location.lng();
      this.$store.commit({
        type: "setPlace",
        place: JSON.parse(JSON.stringify(this.place))
      });
    },
    selectTxt() {
      this.$el.querySelector("input.pac-target-input").select();
    }
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
    outline: none;
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
</style>