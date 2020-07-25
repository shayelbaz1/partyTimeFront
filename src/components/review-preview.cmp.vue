<template>
  <li>
    <!-- HEADER -->
    <div class="review-header">
      <img :src="this.review.avatar" @click="routeTo('/profile')"/>
      <div class="review-details">
        <span>{{ this.review.username }}</span>
        <p>{{ this.review.createdAt | moment('MMM Do YY') }}</p>
      </div>
    </div>
    <!-- TEXT -->
    <div>
      <div class="review-text-container">
        <p>{{ this.review.txt }}</p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'review-preview',
  props: {
    review: {
      type: Object,
    },
  },
  methods: {
    routeTo(page) {
      this.$router.push(page);
    },
  }
}
</script>
<style lang="scss" scoped>
li {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 40px;
  
  .review-text-container {
    margin-top: 14px;
  }

  .review-header {
    display: flex;
    align-items: flex-start;

    .review-details {
      margin-left: 10px;
      p{
        color: rgba(255, 255, 255, 0.384);
      }
    }

    img {
      border-radius: 50%;
      width: 48px;
    }

    .review-text-container {
      display: flex;
      flex-direction: column;
      margin-left: 14px;
      align-items: flex-start;

      span {
        font-weight: bold;
      }

      p {
        color: white; // #ffffffa8
        font-family: bold;
      }
    }
  }
}
</style>
