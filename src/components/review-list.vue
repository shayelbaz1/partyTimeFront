<template>
  <section class="review-list">
    <h1>Reviews</h1>
    <!-- Add Review -->
    <form @submit.prevent="addReview()" v-if="loggedInUser">
      <textarea
        type="textarea"
        placeholder="Your Opinion Matters..."
        v-model="reviewToEdit.txt"
        class="review-input"
      ></textarea>
      <el-button @click="addReview()" class="review-save-btn">
        <i class="fa fa-floppy-o" aria-hidden="true"></i>
        Save
      </el-button>
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
  textarea {
        margin-bottom: 6px;
    background-color: #303030;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: white;
    display: inline-block;
    font-size: inherit;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 82%;
  }
  .el-button {
    display: inline-block;
    background-color: #111111;
    color: #e6e6e6;
    border-width: 0px;
    font-size: 0.8rem;
    margin: 5px;
    border-radius: 7px;
    transition-duration: 0.3s;
    padding: 15px;
  }
}
ul {
  list-style: none;
  display: flex;
  justify-content: center;
}
</style>
