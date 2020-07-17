<template>
  <div class="login-page">
    <div>
      <form>
        <h2>Log/Signup</h2>
        <input type="text" v-model="creds.username" placeholder="Email" />
        <br />
        <input type="password" v-model="creds.password" placeholder="Password" />
        <br />
        <div class="login-signup-buttons-container">
          <button @click.prevent="doLogin">Login</button>
          <button @click.prevent="doSignup">Signup</button>
          <!-- <img src="../assets/login.jpg" alt srcset /> -->
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
      creds: {
        username: "admin@gmail.com",
        password: "1234"
      }
    };
  },
  computed: {},
  created() {
    // console.log("this.loggedinUser", this.loggedinUser);
  },
  methods: {
    async doLogin() {
      const currUser = await this.$store.dispatch({
        type: "login",
        creds: this.creds
      });
      if (currUser.length) this.$router.push("/");
      if (!currUser.length) return false;
    },
    async doSignup() {
      console.log(this.creds);
      const currUser = await this.$store.dispatch({
        type: "signup",
        creds: this.creds
      });
      console.log(currUser);
      if (currUser) this.$router.push("/");
      if (!currUser) return false;
    }
  },
  watch: {}
};
</script>