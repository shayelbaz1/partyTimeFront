<template>
   <div class="main-filter container">
     <div class="nav-ranges-container">
        <h3>Sort By:</h3>
        <div class="sort-buttons-container">
            <button><i class="fa fa-heart"></i></button>
            <button><i class="fa fa-thumbs-up"></i></button>
            <button><i class="">Distance</i></button>
        </div>         
     </div>

     <div class="nav-ranges-container">
       Distance  
       <input type="range" name="" id=""><span>Less then 14 km</span>
       Entry Fees
       <input type="range" name="" id=""><span>Less then 1300$</span>
     </div>

     <div class="nav-dropdown-container">
         Locality:
         <section>
             <option value="">New York</option>
             <option value="">Israel</option>
         </section>
         Party Type:
         <section>
             <option value="">Bar Party</option>
             <option value="">Music Festival</option>
             <option value="">Rave</option>
         </section>
         Music Type:
         <section>
             <option value="">Death Metal</option>
             <option value="">Jazz</option>
             <option value="">Rock</option>
             <option value="">Blues</option>
         </section>
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
    return {
    }
  },
  methods: {
  },
  created() {
  },
}
</script>

<style lang="scss" scoped>

</style>
