<template>
  <div class="img-box" @click="openInNewTab">
    <img class="img-backround" :src="imgUrl" title="Upload Image" />
    <img class="img-front" :src="imgUrl" title="Upload Image" />
  </div>
</template>

<script>
export default {
  props: ["imgUrl"],
  methods: {
    openInNewTab() {
      window.open(this.imgUrl, "_blank");
    }
  }
};
</script>

<style lang='scss'>
.img-box {
  cursor: pointer;
  background-color: black;
  width: 100%;
  height: 40vh;
  // min-width: 180px;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  position: relative;
  // margin-top: 50px;
  .img-backround {
    border-radius: 7px;
    height: 100%;
    width: 100%;
    opacity: 0.3;
    filter: blur(15px);
    position: absolute;
  }
  .img-front {
    position: absolute;
    height: 100%;
    position: absolute;
  }
}
</style>