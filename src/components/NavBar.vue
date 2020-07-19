<template>
  <section>
    <!-- <el-menu
      :default-active="activeIndex"
      class="el-menu flex"
      mode="horizontal"
      :collapse="false"
    >
      <el-menu-item index="0" @click="toggleFilter" class="filter">
        <i class="fas fa-filter"></i>
      </el-menu-item>
      <el-menu-item index="0" @click="routeTo('/welcome')">Welcome</el-menu-item>
      <el-menu-item index="1" @click="routeTo('/')">Party App</el-menu-item>
      <el-menu-item index="2" @click="routeTo('/profile')">
        Profile
      </el-menu-item>
    <!-- <el-menu-item index="3" @click="routeTo('/dashboard')">Dashboard</el-menu-item>-->
    <!-- <el-menu-item index="4" @click="routeTo('/map')">Map</el-menu-item> -->
    <!-- <el-menu-item index="5" @click="routeTo('/login')">Login</el-menu-item> -->
    <!-- <el-menu-item index="6" @click="routeTo('/reviews')"> -->
    <!-- Reviews -->
    <!-- </el-menu-item> -->
    <!-- <el-menu-item index="7" @click="routeTo('/chat')">Chat</el-menu-item> -->
    <!-- </el-menu> -->
    <!-- <div class="line"></div> -->

    <b-navbar toggleable="lg" type="dark" class="party-nav">
      <b-navbar-brand class="nav-logo" href="#">
        <img src="../assets/site-logo.jpeg" alt="Kitten">
        PARTY TIME
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click="routeTo('/')">Party App</b-nav-item>
          <b-nav-item @click="routeTo('/map')">Map</b-nav-item>
          <b-nav-item @click="routeTo('/login')">Login</b-nav-item>
          <b-nav-item @click="routeTo('/reviews')">Reviews</b-nav-item>
          <b-nav-item @click="routeTo('/reviews')">Reviews</b-nav-item>
          <b-nav-item @click="routeTo('/chat')">Chat</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Enter Location"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0 search-btn" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </section>
</template>

<script>
import EventBus from "../services/EventBus.js";

export default {
  name: "NavBar",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    routeTo(page) {
      this.$router.push(page);
    },
    toggleFilter() {
      EventBus.$emit("toggleFilter");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  background-color: #c1272d;
}
.party-nav {
  background-color: black;
}
.search-btn {
    margin: 4px;
    border: 0;
    background-color: black;
    padding: 6px;
    border-radius: 6px;
    color: white;
}
.nav-logo {
    color: #272727;
    font-family: 'Rowdies', cursive;
    letter-spacing: 3px;
    padding-bottom: 0px;

    img {
      width: 39px;
    }
}
</style>
