<template>
  <div class="login-page">
    <div>
      <form>
        <h2>Sign In</h2>
        <div class="login-input-container">
          <i class="fa fa-user login-icon" aria-hidden="true"></i>
          <input type="text" v-model="creds.email" placeholder="Email" />
        </div>
        <br />
        <div class="login-input-container">
          <i class="fa fa-lock login-icon" aria-hidden="true"></i>

          <input type="password" v-model="creds.password" placeholder="Password" />
        </div>
        <br />
        <div class="login-buttons-container">
          <button class="signup" @click.prevent="routeToSignup">Signup</button>
          <button @click.prevent="doLogin">Login</button>
        </div>
        <!-- <br />
        <googleLogin @doLogin="doLogin"></googleLogin>-->
        <!-- <img src="../assets/login.jpg" alt srcset /> -->
      </form>
    </div>
  </div>
  <!-- end of v-else -->
</template>

<script>
import googleLogin from "./gLogin.vue";
export default {
  name: "login-page",
  data() {
    return {
      creds: {
        username: "",
        password: "",
        email: ""
      }
    };
  },
  computed: {},
  created() {},
  methods: {
    routeToSignup() {
      this.$router.push("/signup");
    },
    async doLogin(googleCreds) {
      if (googleCreds.constructor.name !== "yw") {
        // without google outh
        const currUser = await this.$store.dispatch({
          type: "login",
          creds: this.creds
        });
        if (currUser) this.$router.push("/party-app");
        if (!currUser.length) return;
      } else if (googleCreds.constructor.name === "yw") {
        this.creds.username = googleCreds.Bd;
        this.creds.email = googleCreds.Au;
        this.creds.imgURL = googleCreds.MK;
        const currUser = await this.$store.dispatch({
          type: "login",
          creds: this.creds
        });
        if (currUser.length) this.$router.push("/party-app");
        if (!currUser.length) return false;
      }
    }
  },
  components: {
    googleLogin
  }
};
</script>