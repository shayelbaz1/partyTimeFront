<template>
  <section class="img-block">
    <el-carousel height="50vh">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">
          <img :src="'assets/poster1.jpg'" alt srcset />
        </h3>
      </el-carousel-item>
    </el-carousel>
  </section>
</template>


<script>
export default {
  data() {
    return {
      // interval = 5000
    };
  }
};
</script>


<style lang="scss">
.img-block {
  margin-bottom: 10px;
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>