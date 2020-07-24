<template>
  <div id="app" class="main-app">
    <nav-bar></nav-bar>
    <router-view />
    <footer-cmp></footer-cmp>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import FooterCmp from "./components/FooterCmp.vue";
import SocketService from "./services/SocketService.js";

export default {
  components: {
    NavBar,
    FooterCmp
  },
  created() {
    // Init Setup of socket
    SocketService.setup();
    // Listening to fired events from the socket server
    // SocketService.on("notify liked", ({currUser, currParty}) => {
    // });
  }
};
</script>
