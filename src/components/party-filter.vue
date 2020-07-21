<template>
  <section class="main-filter-container">
    <div class="nav-sort-container">
      <div class="header justify-center">
        <p>Sort By</p>
        <p>{{ filterTitle }}</p>
      </div>
      <div class="sort-buttons-container">
        <!-- Time Button -->
        <button
          :class="{ active: filterTitle === 'Time' }"
          title="Time"
          @click="setActiveSort('startDate')"
        >
          <i class="far fa-clock"></i>
          <input
            hidden
            type="radio"
            name="sort"
            id="date"
            value="startDate"
            v-model="filterBy.sortBy"
          />
        </button>
        <!-- Members -->
        <button
          :class="{ active: filterTitle === 'Members' }"
          title="Members"
          @click="setActiveSort('extraData.membersCnt')"
        >
          <i class="fa fa-user"></i>
          <input
            hidden
            type="radio"
            name="sort"
            id="members"
            value="members"
            v-model="filterBy.sortBy"
          />
        </button>

        <button
          :class="{ active: filterTitle === 'Likes' }"
          title="sort by party likes"
          @click="setActiveSort('likes')"
        >
          <i class="fa fa-heart"></i>
          <input hidden type="radio" name="sort" id="like" value="like" v-model="filterBy.sortBy" />
        </button>

        <button
          :class="{ active: filterTitle === 'Price' }"
          title="Price"
          @click="setActiveSort('fee')"
        >
          <i class="fa fa-dollar-sign"></i>
          <input hidden type="radio" name="sort" id="price" value="price" v-model="filterBy.sortBy" />
        </button>
      </div>
    </div>

    <div class="hr"></div>

    <div class="nav-ranges-container">
      <!-- <div class="header">
        <p>Distance</p>
        <p>Less then {{ filterBy.partyDetails.distance }} km</p>
      </div>
      <div class="slidecontainer">
        <el-slider v-model="filterBy.partyDetails.distance"></el-slider>
      </div>
      <div class="hr"></div>-->
      <div class="header fees">
        <p>Entry Fees</p>
        <p>Less then {{ filterBy.partyDetails.fee }}$</p>
      </div>
      <div class="slidecontainer">
        <el-slider v-model="filterBy.partyDetails.fee" @change="setSortBy"></el-slider>
      </div>
    </div>

    <div class="hr"></div>
    <!-- Time Picker -->
    <div class="header time">
      <p>Time</p>
      <p>{{filterBy.startTime}}</p>
    </div>
    <el-select
      v-model="filterBy.startTime"
      filterable
      allow-create
      default-first-option
      placeholder="All"
      @change="setSortBy"
    >
      <el-option v-for="(time, idx) in times" :key="idx" :label="time" :value="time"></el-option>
    </el-select>
    <!-- hr  -->
    <div class="hr locality"></div>
    <!-- Locality -->
    <div class="header locality">
      <p>Locality</p>
      <p>{{ filterBy.selectedLocations.length }}/{{ locationNames.length }}</p>
    </div>
    <el-select
      v-model="filterBy.selectedLocations"
      multiple
      filterable
      allow-create
      default-first-option
      placeholder="Filtar Locations"
      @change="setSortBy"
    >
      <el-option v-for="(name, idx) in locationNames" :key="idx" :label="name" :value="name"></el-option>
    </el-select>
    <!-- hr  -->
    <div class="hr locality"></div>
    <!-- Types -->

    <div class="header types">
      <p>Party Types</p>
      <p>{{ filterBy.selectedTypes.length }}/{{ partyTypes.length }}</p>
    </div>
    <el-select
      v-model="filterBy.selectedTypes"
      multiple
      filterable
      allow-create
      default-first-option
      placeholder="Party Types"
      @change="setSortBy"
    >
      <el-option v-for="(type, idx) in partyTypes" :key="idx" :label="type" :value="type"></el-option>
    </el-select>

    <div class="filter-btns">
      <button @click="resetFilter" class="btn reset">RESET</button>
    </div>
  </section>
</template>

<script>
import PartyService from "../services/PartyService.js";
export default {
  name: "party-filter",
  props: {
    partys: {
      type: Array
    }
  },
  data() {
    return {
      times: ["All", "Today", "Tomorrow"],
      locationNames: [],
      partyTypes: [],
      filterBy: {
        startTime: "All",
        selectedLocations: [],
        selectedTypes: [],
        sortBy: "startDate",
        partyDetails: {
          distance: 50,
          fee: 50,
          locality: "Israel",
          musicType: "Rock",
          partyType: "Rave"
        },
        date: {
          startTime: 3232323
        }
      }
    };
  },
  computed: {
    filterTitle() {
      if (this.filterBy.sortBy === "likes") {
        return "Likes";
      }
      if (this.filterBy.sortBy === "fee") {
        return "Price";
      }
      if (this.filterBy.sortBy === "extraData.membersCnt") {
        return "Members";
      }
      if (this.filterBy.sortBy === "startDate") {
        return "Time";
      }
    }
  },
  methods: {
    setActiveSort(newSort) {
      this.filterBy.sortBy = newSort;
      this.$store.commit({
        type: "setFilter",
        filterBy: JSON.parse(JSON.stringify(this.filterBy))
      });
      this.$store.dispatch("loadPartys");
    },

    setSortBy() {
      this.$store.commit({
        type: "setFilter",
        filterBy: JSON.parse(JSON.stringify(this.filterBy))
      });
      this.$store.dispatch("loadPartys");
    },

    resetFilter() {
      this.filterBy.partyDetails.fee = 100;
      this.filterBy.selectedLocations = [];
      this.filterBy.selectedTypes = [];
      this.setSortBy();
    }
  },
  async created() {
    let locations = await this.$store.dispatch({ type: "getPartyLocations" });
    this.locationNames = locations;
    this.partyTypes = PartyService.getMusicPartyTypes().partyTypes;
  }
};
</script>
