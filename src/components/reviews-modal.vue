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
  },
  data() {
    return {
      partyReviews: this.reviews,
      reviewToEdit: {
        currPartyId: this.$route.params.id,
        txt: '',
        createdAt: Date.now(),
        username: this.$store.getters.loggedInUser.username,
        avatar: this.$store.getters.loggedInUser.imgURL
      },
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
    reviewsLen(){
      return this.partyReviews.length
    }
  },
  methods: {
    async addReview() {
      if (!this.reviewToEdit.txt) return
      const { username, imgURL } = this.loggedInUser
      const party = await this.$store.dispatch({
        type: 'addPartyReview',
        review: JSON.parse(JSON.stringify(this.reviewToEdit))
      })
      if(party._id) {
        this.partyReviews = party.extraData.reviews
        this.reviewToEdit.txt = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
