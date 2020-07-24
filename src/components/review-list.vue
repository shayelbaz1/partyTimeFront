<template>
  <section class="review-list">
    <h1>Reviews</h1>
    <!-- Add Review -->
    <form @submit.prevent="addReview()" v-if="loggedInUser">
      <el-input
        type="textarea"
        placeholder="Your Opinion Matters..."
        v-model="reviewToEdit.txt"
      ></el-input>
      <el-button @click="addReview()">Save</el-button>
    </form>
    <hr />
    <!-- Review List -->
    <ul v-for="review in partyReviews" :key="review._id">
      <review-preview :review="review"></review-preview>
    </ul>
  </section>
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
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .el-select {
    width: 20%;
    margin-bottom: 10px;
  }
  .el-textarea {
    width: 80%;
    margin: auto;
    margin-bottom: 10px;
  }
  .el-button {
    display: inline-block;
  }
}
ul {
  list-style: none;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
