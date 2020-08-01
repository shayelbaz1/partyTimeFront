<template>
  <section class="review-list">
    <h1>Reviews</h1>
    <!-- Add Review -->
    <form @submit.prevent="addReview()">
      <div class="input-container">
        <img :src="loggedInUser.imgURL" alt="" srcset="" />
        <textarea
          type="textarea"
          placeholder="Your Opinion Matters..."
          v-model="reviewToEdit.txt"
          class="review-input"
        ></textarea>
      </div>
      <el-button @click="addReview()" class="review-save-btn">
        <i class="far fa-comment"></i>
        Comment
      </el-button>
    </form>
    <hr />
    <!-- Review List -->
    <ul>
      <!-- always get the 6 last reviews -->
      <review-preview
        v-for="review in partyReviews.slice(0, max)"
        :key="review._id"
        :review="review"
      ></review-preview>
      <button
        class="btn load"
        v-if="partyReviews.length >= 6"
        @click="showMore"
      >
        Load More
      </button>
    </ul>
  </section>
</template>

<script>
import SocketService from '../services/SocketService.js'
import reviewPreview from './review-preview.cmp.vue'
export default {
  props: ['reviews'],
  name: 'Review-Cmp',
  components: {
    reviewPreview,
  },
  data() {
    return {
      max: 6,
      partyReviews: this.reviews,
      reviewToEdit: {
        currPartyId: this.$route.params.id,
        txt: '',
        createdAt: Date.now(),
        username: this.$store.getters.loggedInUser.username,
        avatar: this.$store.getters.loggedInUser.imgURL,
      },
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
    reviewsLen() {
      return this.partyReviews.length
    },
  },
  methods: {
    showMore() {
      this.max += 6
    },
    async addReview() {
      if (!this.reviewToEdit.txt) return
      const { username, imgURL } = this.loggedInUser
      const party = await this.$store.dispatch({
        type: 'addPartyReview',
        review: JSON.parse(JSON.stringify(this.reviewToEdit)),
      })
      if (party._id) {
        SocketService.emit('review added', {
          reviews: party.extraData.reviews,
        })
        // this.partyReviews = party.extraData.reviews
        this.reviewToEdit.txt = ''
      }
    },
  },
  created() {
    // Init Setup of socket
    SocketService.setup()
    SocketService.on('notify reviewAdded', ({ reviews }) => {
      this.partyReviews = reviews
    })
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
  .input-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-left: 60px;

    img {
      width: 48;
      border-radius: 50%;
    }

    textarea {
      margin-left: 16px;
      width: 100%;
      border: none;
      overflow: auto;
      outline: none;

      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;

      resize: none; /*remove the resize handle on the bottom right*/
      margin-bottom: 6px;
      background-color: #272727;
      border-bottom: 1px solid #dddddd;
      box-sizing: border-box;
      color: white;
      display: inline-block;
      font-size: inherit;
      outline: 0;
      padding: 0;
      /* line-height: 0; */
      height: 42px;
      /* background: wheat; */
      /* align-content: unset; */
      align-self: flex-end;
      font-size: 1.2rem;
      color: white;
      outline: none;
      /* margin-bottom: 0px; */
    }
  }
  .el-button {
    display: inline-block;
    background-color: #111111;
    color: #e6e6e6;
    border-width: 0px;
    font-size: 0.8rem;
    border-radius: 7px;
    transition-duration: 0.3s;
    margin: 5px 0px;
    align-self: flex-end;
  }
}
ul {
  list-style: none;
  // display: flex;
  // justify-content: center;
  // flex-direction: column;
  // padding: 58px;
  padding: 10px 58px;
  column-gap: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  button {
    // width: 20%; */
    background-color: #111111;
    color: #e6e6e6;
    border-width: 0px;
    font-size: 1rem;
    margin: 5px auto;
    border-radius: 7px;
    transition-duration: 0.3s;
    padding: 16px 50px;
  }

  button:hover {
    background-color: #c1272d;
  }
}
</style>
