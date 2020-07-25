<template>
  <li>
    <!-- HEADER -->
    <div class="review-header">
      <img :src="this.review.avatar" alt="" srcset="" />
      <div class="review-details">
        <span>{{ this.review.username }}</span>
        <p>{{ this.review.createdAt | moment('MMM Do YY') }}</p>
      </div>
    </div>
    <!-- TEXT -->
    <div>
      <div class="text-container">
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
}
</script>
<style lang="scss" scoped>
li {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 24px;
  
  .text-container {
    margin-top: 14px;
  }

  .review-header {
    display: flex;
    align-items: center;

    img {
      border-radius: 50%;
      width: 70px;
    }

    .review-details {
      display: flex;
      flex-direction: column;
      margin-left: 14px;
      align-items: flex-start;

      span {
        font-weight: bold;
      }
    }
  }
}
</style>
