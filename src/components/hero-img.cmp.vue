<template>
  <section class="img-block">
    <el-carousel height="50vh">
      <el-carousel-item interval="5000">
        <img class="img-back" src="../assets/poster1.png" alt />
        <img class="img-front" src="../assets/poster1.png" srcset />
      </el-carousel-item>
      <el-carousel-item interval="5000">
        <img class="img-back" src="../assets/poster2.png" alt />
        <img class="img-front" src="../assets/poster2.png" srcset />
      </el-carousel-item>
      <el-carousel-item interval="5000">
        <img class="img-back" src="../assets/poster3.png" alt />
        <img class="img-front" src="../assets/poster3.png" srcset />
      </el-carousel-item>
      <el-carousel-item interval="5000">
        <img class="img-back" src="../assets/poster4.png" alt />
        <img class="img-front" src="../assets/poster4.png" srcset />
      </el-carousel-item>
    </el-carousel>
  </section>
</template>


<script>
export default {};
</script>


<style lang="scss">
.img-block {
  padding-top: 50px;
  position: relative;
  background: black;
  .img-back {
    position: absolute;
    border-radius: 7px;
    height: 100%;
    width: 100%;
    left: 0;
    opacity: 0.3;
    filter: blur(15px);
  }
  .img-front {
    position: relative;
    height: 100%;
    border-radius: 7px;
  }
}
</style>