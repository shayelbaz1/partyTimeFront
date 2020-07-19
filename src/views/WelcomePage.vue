<template>
  <section class="welcome-page">
    <div class="parallax">
      <h1>YOUR ULTIMATE NIGHTLIFE APP</h1>
      <input type="text" />
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
      padding: 0;
      padding: 0px 30px;
      width: 100%;
      margin: 0;
      position: relative;
      top: 170px;
      font-size: 2.2rem;
      letter-spacing: 1px;
      font-weight: 800;
      font-family: "Lato", sans-serif;
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