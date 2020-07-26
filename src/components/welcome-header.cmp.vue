<template>
  <div class="welcome-header">
    <div class="title-input-container">
      <h1 class="welcome-title">PARTY TIME</h1>
      <h1 class="welcome-sub">Your Ultimate Nightlife App</h1>
      <!-- <div class="input-button-container"> -->
      <!-- <input class="welcome-input" placeholder="Enter Location" /> -->
      <!-- <button class="welcome-button">Explore</button> -->
      <!-- </div> -->
      <button class="btn-explore" @click="goToExplore">
        EXPLORE PARTIES
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToExplore() {
      this.$router.push("/party-app");
    }
  }
};
</script>

<style lang="scss">
.welcome-header {
  background-image: url("../assets/welcome1.jpg");
  min-height: 100vh;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .title-input-container {
    position: relative;
    top: 200px;
    text-shadow: 0px 0px 2px black;
    .welcome-title {
      padding: 0;
      padding: 0px 13px;
      width: 100%;
      margin: 0;
      font-size: 3.6rem;
      letter-spacing: 1px;
      font-weight: 800;
      font-family: "Lato", sans-serif;
    }
    .welcome-sub {
      padding: 0;
      padding: 0px 30px;
      width: 100%;
      margin: 0;
      font-size: 2.8rem;
      letter-spacing: 1px;
      font-weight: 800;
      font-family: "Lato", sans-serif;
    }
    .btn-explore {
      margin-top: 90px;
      font-size: 1.5rem;
      border: 1px solid white;
      background: rgba(0, 0, 0, 0.541);
      padding: 10px 20px;
      border-radius: 3em;
      outline: none;
      letter-spacing: 1px;
      font-family: "Lato", sans-serif;
      &:focus {
        // box-shadow: 0px 0px 10px 0px black;
        background-color: #c1272d;
        border: 1px solid rgba(255, 255, 255, 0);
      }
      &:hover {
        // box-shadow: 0px 0px 10px 0px black;
        background-color: #c1272d;
        border: 1px solid rgba(255, 255, 255, 0);
      }
    }
    .input-button-container {
      display: inline-block;
      border-radius: 7px;
      padding: 0;
      margin: 0px auto;
      margin-top: 10px;
      transition: 0.3s;
      &:focus {
        box-shadow: 0px 0px 10px 0px black;
      }
      &:hover {
        box-shadow: 0px 0px 10px 0px black;
      }

      .welcome-input {
        background: rgb(231, 231, 231);
        width: 70%;
        border-radius: 7px 0px 0px 7px;
        border: none;
        outline: none;
      }
      .welcome-button {
        height: 40px;
        padding: 0px 10px;
        border-radius: 0px 7px 7px 0px;
        font-size: 1rem;
        width: 30%;
      }
    }
  }
}
</style>