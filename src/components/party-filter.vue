<template>
  <div class="main-filter-container">
    <div class="nav-sort-container">
      <h3>Sort By:</h3>
      <div class="sort-buttons-container">
        <button
          :class="{active: filterBy.sortBy==='members'}"
          title="Members"
          @click="setSortBy('members')"
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
          @click="setSortBy('like')"
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
        </button> -->

        <button
          :class="{active: filterBy.sortBy==='price'}"
          title="Price"
          @click="setSortBy('price')"
        >
          <i class="fa fa-dollar-sign"></i>
          <input hidden type="radio" name="sort" id="price" value="price" v-model="filterBy.sortBy" />
        </button>
      </div>
    </div>

    <div class="nav-ranges-container">
      <div class="ranges-lable-container">
        <h4>Distance</h4>
        <span>Less then {{filterBy.partyDetails.distance}} km</span>
      </div>
      <div>
        <input
          type="range"
          min="1"
          max="100"
          class="slider"
          id="myRange"
          v-model="filterBy.partyDetails.distance"
        />
      </div>
      <div class="ranges-lable-container">
        <h4>Entry Fees</h4>
        <span>Less then {{filterBy.partyDetails.fee}}$</span>
      </div>
      <div>
        <input
          type="range"
          min="0"
          max="100"
          class="slider"
          id="myRange"
          v-model="filterBy.partyDetails.fee"
        />
      </div>
    </div>

    <div class="nav-dropdown-container">
      <div class="nav-dropdown-content">
        Locality:
        <select v-model="filterBy.partyDetails.locality">
          <option value="New York">New York</option>
          <option value="Israel">Israel</option>
        </select>
        Party Type:
        <select v-model="filterBy.partyDetails.partyType">
          <option value="Bar Party">Bar Party</option>
          <option value="Music Festival">Music Festival</option>
          <option value="Rave">Rave</option>
        </select>
        Music Type:
        <select v-model="filterBy.partyDetails.musicType">
          <option value="Death Metal">Death Metal</option>
          <option value="Jazz">Jazz</option>
          <option value="Rock">Rock</option>
          <option value="Blues">Blues</option>
        </select>
        Start Time:
        <input type="date" name id />
      </div>
    </div>

    <div class="filter-btns">
      <button class="btn reset">RESET</button>
      <button class="btn filter">FILTER</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "party-filter",
  data() {
    return {
      //TODO: Two Phase filtering
      //TODO: FIRST SORT BY, SORTBY
      //TODO: SECOND SORT BY PARTY DETAILS
      //TODO: THIRD SORTBY DATE
      filterBy: {
        sortBy: "members",
        partyDetails: {
          distance: 50,
          fee: 50,
          locality: "Israel",
          musicType: "Rock",
          partyType: "Rave"
        },
        date: {
          startTime: 3232323,
        }
      }
    };
  },
  methods: {
    setSortBy(newSort) {
      console.log("newSort:", newSort);
      this.filterBy.sortBy = newSort;
      this.$store.commit({type: "setFilter", filterBy: this.filterBy})
    }
  },
};
</script>
