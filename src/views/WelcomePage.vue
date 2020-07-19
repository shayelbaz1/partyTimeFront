<template>
  <section class="welcome-page">
    <!-- <img src="../assets/welcome1.jpg" fluid alt="Responsive image"></img> -->
    <div class="parallax"></div>

    <div style="height:1000px;background-color:red;font-size:36px">
      Scroll Up and Down this page to see the parallax scrolling effect.
      This div is just here to enable scrolling.
      Tip: Try to remove the background-attachment property to remove the scrolling effect.
    </div>
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
    /* The image used */
    background-image: url("../assets/welcome1.jpg");

    /* Set a specific height */
    min-height: 500px;

    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  img {
    width: 100%;
  }
}
</style>