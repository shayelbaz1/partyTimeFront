<template>
  <div class="main-filter-container">
    <div class="nav-sort-container">
      <h3>Sort By:</h3>
      <div class="sort-buttons-container">
        <button><i class="fa fa-heart"></i></button>
        <button><i class="fa fa-thumbs-up"></i></button>
        <button><i class="">Distance</i></button>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'party-filter',
  props: {
    toy: {
      type: Object,
    },
  },
  data() {
    return {}
  },
  methods: {},
  created() {},
}
</script>

<style lang="scss" scoped></style>
