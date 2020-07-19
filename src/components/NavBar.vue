<template>
  <section>
    <el-menu :default-active="activeIndex" class="el-menu flex" mode="horizontal" :collapse="false">
      <el-menu-item index="0" @click="toggleFilter" class="filter">
        <i class="fas fa-filter"></i>
      </el-menu-item>
      <el-menu-item index="0" @click="routeTo('/welcome')">Welcome</el-menu-item>
      <el-menu-item index="1" @click="routeTo('/')">Party App</el-menu-item>
      <el-menu-item index="2" @click="routeTo('/profile')">Profile</el-menu-item>
      <!-- <el-menu-item index="3" @click="routeTo('/dashboard')">Dashboard</el-menu-item> -->
      <!-- <el-menu-item index="4" @click="routeTo('/map')">Map</el-menu-item> -->
      <el-menu-item index="5" @click="routeTo('/login')">Login</el-menu-item>
      <el-menu-item index="6" @click="routeTo('/reviews')">Reviews</el-menu-item>
      <el-menu-item index="7" @click="routeTo('/chat')">Chat</el-menu-item>
    </el-menu>
    <div class="line"></div>
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
</style>