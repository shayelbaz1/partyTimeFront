<template>
  <div class="login-page">
    <div>
      <form @submit.prevent="doLogin">
        <h2>Log/Signup</h2>
        <input type="text" v-model="loginCred.username" placeholder="Email" />
        <br />
        <input type="text" v-model="loginCred.password" placeholder="Password" />
        <br />
        <div class="login-signup-buttons-container">
          <button>Login</button>
          <button>Signup</button>
        </div>
      </form>
    </div>
  </div>
  <!-- end of v-else -->
</template>

<script>
export default {
  name: "loginsignup-page",
  data() {
    return {
      loginCred: {
        username: "admin@gmail.com",
        password: "1234"
      },
    };
  },
  computed: {
  },
  created() {
    // console.log("this.loggedinUser", this.loggedinUser);
  },
  methods: {
  },
  watch: {
  }
};
</script>

<style lang="scss" scoped>
</style>