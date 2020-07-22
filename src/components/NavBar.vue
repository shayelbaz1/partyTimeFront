<template>
  <section>
    <b-navbar toggleable="lg" type="dark" class="party-nav">
      <b-navbar-brand class="nav-logo" href="#" @click="routeTo('/')">
        <!-- <img src="../assets/site-logo.jpeg" alt="Kitten" /> -->
        <img src="../assets/logo.png" alt="logo" style="border-radius:3px" />
        PARTY TIME
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="link-container">
          <b-nav-item @click="toggleFilter" class="filter">
            <i class="fas fa-search"></i>
          </b-nav-item>
          <b-nav-item @click="routeTo('/party-app')">Explore</b-nav-item>
          <b-nav-item @click="routeTo('/login')">Login</b-nav-item>
          <!-- <b-nav-item @click="routeTo('/signup')">Signup</b-nav-item> -->
          <!-- <b-nav-item @click="routeTo('/reviews')">Reviews</b-nav-item> -->
          <!-- <b-nav-item @click="routeTo('/profile')">Profile</b-nav-item> -->
          <b-nav-item @click="routeTo('/party-app/edit')">Create +</b-nav-item>
          <!-- <b-nav-item @click="routeTo('/map')">Map</b-nav-item> -->
          <!-- <b-nav-item @click="routeTo('/chat')">Chat</b-nav-item> -->
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <map-search></map-search>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#" @click="routeTo('/profile')">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </section>
</template>

<script>
import EventBus from "../services/EventBus.js";
import mapSearch from "../components/map-search.cmp.vue";

export default {
  name: "NavBar",
  components: {
    mapSearch
  },
  methods: {
    routeTo(page) {
      this.$router.push(page);
    },
    toggleFilter() {
      EventBus.$emit("toggleFilter");
    },
    signOut() {
      this.$store.dispatch("logout");
      this.routeTo("/party-app");
    }
  }
};
</script>

<style lang="scss" scoped>
.search-box {
  position: relative;
  z-index: 0;
  right: 0px;
  margin-top: 0px;
  button:focus {
    outline: none;
  }
}
.el-menu {
  background-color: #c1272d;
}
.party-nav {
  background-color: rgb(0, 0, 0);
  position: fixed;
  width: 100%;
  z-index: 4;
  transition: 0.3s;
  color: black;
  top: 0;
}
.nav-link {
  color: white !important;
}
.search-btn {
  margin: 4px;
  border: 0;
  // border: 1px solid white;
  background-color: black;
  padding: 6px;
  border-radius: 6px;
  color: white;
  &:hover {
    background-color: #c1272d;
  }
}
.nav-logo {
  font-family: "Rowdies", cursive;
  letter-spacing: 1px;
  padding-bottom: 0px;
  margin-top: 4px;
  padding-top: 0;

  img {
    width: 27px;
    // padding-bottom: 4px;
    margin-bottom: 4px;
  }
}
.filter {
  width: 0;
  visibility: hidden;
}

@media screen and (max-width: 900px) {
  .filter {
    width: 100%;
    visibility: visible;
  }
}
</style>
