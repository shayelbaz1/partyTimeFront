<template>
  <div class="modal-review-container">
     
  </div>
</template>

<script>
import reviewPreview from './review-preview.cmp.vue'
export default {
  props: ["reviews"],
  name: 'Review-Cmp',
  components: {
    reviewPreview,
    reviewList
  },
  data() {   
  },
  computed: {
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
</style>
