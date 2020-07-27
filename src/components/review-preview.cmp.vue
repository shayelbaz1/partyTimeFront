<template>
  <li>
    <!-- HEADER -->
    <div class="review-container">
      <img class="user-img" :src="this.review.avatar" @click="routeTo('/profile')" />
      <div class="review-details">
        <div class="user-date-line">
          <p class="review-username">{{ this.review.username }}</p>
          <p class="review-date">{{ this.review.createdAt | moment('MMM Do YY') }}</p>
        </div>
        <p class="review-content">{{ this.review.txt }}</p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "review-preview",
  props: {
    review: {
      type: Object
    }
  },
  methods: {
    routeTo(page) {
      this.$router.push(page);
    }
  }
};
</script>
<style lang="scss" scoped>
li {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;

  .review-container {
    display: flex;
    align-items: flex-start;

    .user-img {
      border-radius: 50%;
      width: 58px;
      // margin-top:3px;
    }

    .review-details {
      margin-left: 10px;
      text-align: left;
      .user-date-line {
        display: flex;

        .review-date {
          margin-left: 7px;
          margin-bottom: 0px;
          color: rgba(255, 255, 255, 0.384);
        }
      }

      .review-text-container {
        display: flex;
        flex-direction: column;
        margin-left: 14px;
        align-items: flex-start;

        .review-username {
        }

        .review-content {
          color: white; // #ffffffa8
          font-family: bold;
        }
      }
    }
  }
}
</style>
