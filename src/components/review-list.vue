<template>
  <section class="review-list">
    <h1>Reviews</h1>
    <!-- Add Review -->
    <form @submit.prevent="addReview()">
      <el-select v-model="reviewToEdit.aboutUserId" placeholder="Choose party">
        <el-option v-for="party in partys" :key="party._id" :value="party.name">{{party.name}}</el-option>
      </el-select>

      <el-input type="textarea" placeholder="Your Opinion Matters..." v-model="reviewToEdit.txt"></el-input>

      <el-button @click="addReview()">Save</el-button>
    </form>
    <hr />
    <!-- Review List -->
    <ul v-for="review in reviews" :key="review._id">
      <review-preview :review="review"></review-preview>
    </ul>
  </section>
</template>

<script>
import reviewPreview from "./review-preview.cmp.vue";
export default {
  name: "Review-Cmp",
  components: {
    reviewPreview
  },
  data() {
    return {
      currPartyId: this.$route.params.id,
      reviewToEdit: {
        txt: "",
        aboutUserId: this.$route.params.id
      }
    };
  },
  computed: {
    reviews() {
      return this.$store.getters.reviews;
    },
    users() {
      return this.$store.getters.users;
    },
    partys() {
      return this.$store.getters.partys;
    }
  },
  methods: {
    addReview() {
      if (!this.reviewToEdit.txt) return;
      this.$store.dispatch({ type: "addReview", review: this.reviewToEdit });
      this.reviewToEdit = { txt: "" };
    }
  },
  created() {
    this.$store.dispatch({ type: "loadPartys" });
    this.$store.dispatch({ type: "loadUsers" });
    this.$store.dispatch({ type: "loadReviews", id: this.currPartyId });
  }
};
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
}
</style>