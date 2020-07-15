<template>
  <section>
    <h1>Profile Page</h1>
    <el-card v-if="user" class="box-card">
      <h3 class="text item">Name: {{user.username}}</h3>
      <h3 class="text item">email: {{user.email}}</h3>
      <h3 class="text item">Is Admin: {{user.isAdmin}}</h3>
      <h3 class="text item">ID: {{user._id}}</h3>
      <h3 class="text item">Given Reviews: {{user.givenReviews}}</h3>
    </el-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    async loadUser(userId) {
      this.user = await this.$store.dispatch({ type: "getById", userId });
    }
  },
  created() {
    let userId = this.$route.params.id;
    this.loadUser(userId);
  }
};
</script>

<style scoped>
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
}
</style>