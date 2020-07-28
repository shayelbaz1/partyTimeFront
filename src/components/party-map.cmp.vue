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
    <GmapMap v-if="place.pos" :options="{mapTypeControl: false,streetViewControl:false,styles:mapStyle.styles}" backgroundColor="black" :center="place.pos" :zoom="zoom" map-type-id="roadmap" style="width: 96%; height: 300px;">
      <GmapMarker :position="place.pos" :draggable="false" title="Your Location" />
      <GmapMarker :key="index" v-for="(party, index) in partys" :position="party.location" :clickable="true" :draggable="false" @click="togglePreview(party)" title="hello world" />
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
  props: ["partyProp"],
  data() {
    return {
      mapStyle: {
        styles: [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }]
          },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }]
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }]
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }]
          }
        ]
      },
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
      this.$el.querySelector("input.pac-target-input").select();
    }
  },
  computed: {
    partys() {
      return this.$store.getters.partys;
    }
  },
  async created() { },
  mounted() {
    // Set place of current party
    if (this.partyProp) {
      const location = this.partyProp.location;
      this.place.name = location.name;
      this.place.pos.lat = location.lat;
      this.place.pos.lng = location.lng;
      this.party = this.partyProp;
      this.zoom = 18;
    } else {
      this.place = this.$store.getters.place;
      setTimeout(() => {
        var el = this.$el.querySelector("input.pac-target-input");
        el.value = this.place.name;
      }, 1000);
      // this.geoLocation();
      this.party = this.partys[0];
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
