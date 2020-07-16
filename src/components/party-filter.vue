<template>
  <div class="main-filter-container">
    <div class="nav-sort-container">
      <h3>Sort By:</h3>
      <div class="sort-buttons-container">
        <button title='sort by party memebers'><i class="fa fa-user"></i></button>
        <button title="sort by party likes"><i class="fa fa-heart"></i></button>
        <button title="sort by distance"><i class="fa fa-road"></i></button>
      </div>
    </div>

    <div class="nav-ranges-container">
      <div class="ranges-lable-container">
        <h4>Distance</h4>
        <span>Less then 14 km</span>
      </div>
      <div>
        <input
          type="range"
          min="1"
          max="100"
          value="50"
          class="slider"
          id="myRange"
        />
      </div>
      <div class="ranges-lable-container">
        <h4>Entry Fees</h4>
        <span>Less then 1300$</span>
      </div>
      <div>
        <input
          type="range"
          min="1"
          max="100"
          value="50"
          class="slider"
          id="myRange"
        />
      </div>
    </div>

    <div class="nav-dropdown-container">
      <div class="nav-dropdown-content">
        Locality:
        <select>
          <option value="">New York</option>
          <option value="">Israel</option>
        </select>
        Party Type:
        <select>
          <option value="">Bar Party</option>
          <option value="">Music Festival</option>
          <option value="">Rave</option>
        </select>
        Music Type:
        <select>
          <option value="">Death Metal</option>
          <option value="">Jazz</option>
          <option value="">Rock</option>
          <option value="">Blues</option>
        </select>
        Start Time:
        <input type="date" name="" id="">
        End Time:
        <input type="date" name="" id="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'party-filter',
  data() {
    return {
      //TODO: Two Phase filtering
      //TODO: FIRST SORT BY, SORTBY
      //TODO: SECOND SORT BY PARTY DETAILS
      //TODO: THIRD SORTBY DATE
      filterBy: {
        sortBy: {
          location: false,
          members: false,
          likes: false,
        },
        partyDetails: {
          distance: 3,
          fee: 13,
          locality: 'Israel',
          musicType: 'Rock',
          partyType: 'Rave',
        },
        date: {
          startTime: 3232323,
          endTime: 565656,
        }
      },
    }
  },
  methods: {},
  created() {},
}
</script>

<style lang="scss" scoped></style>
