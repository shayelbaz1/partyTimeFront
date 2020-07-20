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
export default {
  components: {
    NavBar,
    FooterCmp
  }
};
</script>
