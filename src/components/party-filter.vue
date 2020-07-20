<template>
  <section class="main-filter-container">
    <div class="nav-sort-container">
      <div class="header">
        <p>Sort By</p>
        <p>Distance</p>
      </div>
      <div class="sort-buttons-container">
        <button
          :class="{active: filterBy.sortBy==='members'}"
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
          :class="{active: filterBy.sortBy==='like'}"
          title="sort by party likes"
          @click="setActiveSort('likes')"
        >
          <i class="fa fa-heart"></i>
          <input hidden type="radio" name="sort" id="like" value="like" v-model="filterBy.sortBy" />
        </button>

        <!-- <button
          :class="{active: filterBy.sortBy==='dist'}"
          title="Distance"
          @click="setSortBy('dist')"
        >
          <i class="fa fa-map-marker"></i>
          <input hidden type="radio" name="sort" id="dist" value="dist" v-model="filterBy.sortBy" />
        </button>-->

        <button
          :class="{active: filterBy.sortBy==='price'}"
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
      <div class="header">
        <p>Distance</p>
        <p>Less then {{filterBy.partyDetails.distance}} km</p>
      </div>
      <div class="slidecontainer">
        <el-slider v-model="filterBy.partyDetails.distance"></el-slider>
      </div>
      <div class="hr"></div>
      <div class="header fees">
        <p>Entry Fees</p>
        <p>Less then {{filterBy.partyDetails.fee}}$</p>
      </div>
      <div class="slidecontainer">
        <el-slider v-model="filterBy.partyDetails.fee"></el-slider>
      </div>
    </div>
    <div class="hr"></div>

    <div class="header locality">
      <p>Locality</p>
      <p>{{selectedLocations.length}}/{{locationNames.length}}</p>
    </div>
    <el-select
      v-model="selectedLocations"
      multiple
      filterable
      allow-create
      default-first-option
      placeholder="Choose tags for your article"
    >
      <el-option v-for="(name,idx) in locationNames" :key="idx" :label="name" :value="name"></el-option>
    </el-select>
    <div class="hr"></div>
    <div class="header locality">
      <p>Locality</p>
      <p>{{selectedLocations.length}}/{{locationNames.length}}</p>
    </div>
    <el-select
      v-model="selectedLocations"
      multiple
      filterable
      allow-create
      default-first-option
      placeholder="Choose tags for your article"
    >
      <el-option v-for="(name,idx) in locationNames" :key="idx" :label="name" :value="name"></el-option>
    </el-select>

    <div class="filter-btns">
      <button class="btn reset">RESET</button>
      <button class="btn filter">FILTER</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "party-filter",
  props: ["partys"],
  data() {
    return {
      locationNames: null,
      selectedLocations: [],
      filterBy: {
        sortBy: "dist",
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
  methods: {
    setActiveSort(newSort) {
      console.log("newSort:", newSort);
      this.filterBy.sortBy = newSort;
      this.$store.commit({ type: "setFilter", filterBy: this.filterBy });
    },
    getLocaionNamesArray(oldPartys) {
      console.log("oldPartys:", oldPartys);
      let locationNames = oldPartys.map(p => p.location.name);
      let newSet = new Set(locationNames);
      newSet = Array.from(newSet);
      console.log("newSet:", newSet);
      return newSet;
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
    }
  },
  created() {
    this.locationNames = this.getLocaionNamesArray(this.partys);
  }
};
</script>
