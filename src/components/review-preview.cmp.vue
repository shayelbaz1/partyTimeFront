<template>
  <section>
    <li>
      <el-card class="box-card" body-style="{ padding: '0px' }" shadow="hover">
        <!-- HEADER -->
        <div slot="header" class="clearfix">
          <router-link :to="`user/${review.byUser._id}`">
            <el-button @click="routeToDetails(toy._id)" type="text">
              <i class="fas fa-info-circle"></i>
              {{review.byUser.username}}
            </el-button>
          </router-link>
        </div>
        <!-- TEXT -->
        <div class="text item">
          <div class="text item">
            <span>{{review.txt | capitalize}}</span>
          </div>
        </div>
      </el-card>
    </li>
  </section>
</template>

<script>
export default {
  name: "review-preview",
  props: {
    review: {
      type: Object
    }
  }
};
</script>
<style lang="scss">
li {
  .text {
    font-size: 14px;
    .item {
      margin-bottom: 18px;
    }
  }
  i {
    font-size: 1.3rem;
    position: relative;
    top: 3px;
  }
}
</style>