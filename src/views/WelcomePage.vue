<template>
  <section class="welcome-page">
    <div class="parallax">
      <h1>PARTY TIME</h1>
    </div>

    <div class="body"></div>
  </section>
</template>

<script>
export default {
  name: "welcome-page"
};
</script>

<style lang="scss">
.welcome-page {
  .parallax {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    h1 {
      margin: 0;
      padding: 0;
      position: relative;
      top: 100px;
      font-size: 2rem;
      letter-spacing: 2px;
      // font-family: "Permanent Marker", cursive;
      font-family: "Red Rose", cursive;
      // font-family: "Rowdies", cursive;
    }
    background-image: url("../assets/welcome2.jpg");
    min-height: 100vh;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .body {
    height: 1000px;
    // background-color: red;
    font-size: 36px;
  }
}
</style>