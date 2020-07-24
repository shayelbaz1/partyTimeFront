<template>
  <section class="review-container">
      <li>
        <el-card
          class="box-card"
          body-style="{ padding: '0px' }"
          shadow="hover"
        >
          <!-- HEADER -->
          <div class="clearfix header">
            <img :src="this.review.avatar" alt="" srcset="" />
            <div class="review-details">
                <span>{{ this.review.username }}</span>
                <p>{{ this.review.createdAt | moment("MMM Do YY")  }}</p>
            </div>
          </div>
          <!-- TEXT -->
          <div class="">
            <div class="">
              <p>{{ this.review.txt }}</p>
            </div>
          </div>
        </el-card>
      </li>
  </section>
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
<style lang="scss">
.review-container {
  width: 100%;
}
.box-card {
  background-color: #272727;
  color: white;

  .header {
    display: flex;
    img {
      border-radius: 50%;
      width: 73px;
    }

    .review-details {
      display: flex;
      flex-direction: column;
      margin-left: 13px;
      justify-content: center;
      align-items: flex-start;
    }
  }
}
</style>
