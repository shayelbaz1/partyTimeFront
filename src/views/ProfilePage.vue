<template>
  <section>
    <h1>Profile Page</h1>
    <el-card class="box-card">
      <img :src="user.imgURL" alt srcset />
      <h3 class="text item">{{user.username}}</h3>
      <div class="text item">email: {{user.email}}</div>
      <div class="text item">isAdmin: {{user.isAdmin}}</div>
    </el-card>
    <el-card class="box-card">
      <genderPicker />
    </el-card>
    <el-card class="box-card">
      <colorPicker />
    </el-card>
    <el-card>
      <time-picker class="box-card" />
    </el-card>
  </section>
</template>

<script>
import genderPicker from "../components/my-cmps/gender-picker.cmp.vue";
import colorPicker from "../components/my-cmps/color-picker.cmp.vue";
import timePicker from "../components/my-cmps/time-picker.cmp.vue";

export default {
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.user = this.$store.getters.loggedinUser;
  },
  components: {
    genderPicker,
    colorPicker,
    timePicker
  }
};
</script>

<style lang="scss"scoped>
section {
  align-items: center;
  display: flex;
  flex-direction: column;
}
.text {
  font-size: 14px;
}

.item {
  padding: 10px 0;
}

.box-card {
  min-width: 480px;
  margin-bottom: 10px;
  align-items: center;
  display: flex;
  flex-direction: column;
  img {
    border-radius: 50%;
  }
}
</style>