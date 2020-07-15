<template>
  <div id="app" class="main-app">
    <nav-bar></nav-bar>
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: {
    NavBar
  }
};
</script>
