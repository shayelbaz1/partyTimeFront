<template>
  <div class="login-page">
    <div>
      <form>
        <h2>Sign up</h2>
        <div class="login-input-container">
          <i class="fas fa-envelope login-icon" aria-hidden="true"></i>
          <input type="text" v-model="creds.email" placeholder="Email" />
        </div>
        <br />
        <div class="login-input-container">
          <i class="fa fa-user login-icon" aria-hidden="true"></i>
          <input type="text" v-model="creds.username" placeholder="Username" />
        </div>
        <br />
        <div class="login-input-container">
          <i class="fa fa-lock login-icon" aria-hidden="true"></i>
          <input type="password" v-model="creds.password" placeholder="Password" />
        </div>
        <br />
        <div class="login-buttons-container">
          <button @click.prevent="doSignup">Login</button>
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
  name: "signup-page",
  data() {
    return {
      creds: {
        username: "",
        password: "",
        email: "",
        imgURL: "https://picsum.photos/200",
        isGoogle: false,
        goingPartys: [],
        createdPartys: []
      }
    };
  },
  methods: {
    doSignup() {
      const cred = this.creds;
      if (!cred.email || !cred.password || !cred.username) return;
      this.$store.dispatch({ type: "signup", creds: cred });
      this.$store.commit({ type: "setIsLoggedIn", bool: true })
      this.$router.push("/party-app");
    },
    async doSignupGoogle(googleCreds) {
      if (googleCreds.constructor.name !== "yw") {
        const currUser = await this.$store.dispatch({
          type: "signup",
          creds: this.creds
        });
        if (currUser) this.$router.push("/");
        if (!currUser) return false;
      } else if (googleCreds.constructor.name === "yw") {
        this.creds.username = googleCreds.Bd;
        this.creds.email = googleCreds.Au;
        this.creds.imgURL = googleCreds.MK;
        this.creds.isGoogle = true;
        const currUser = await this.$store.dispatch({
          type: "signup",
          creds: this.creds
        });
        if (currUser) this.$router.push("/");
        if (!currUser) return false;
      }
    }
  },
  components: {
    googleLogin
  }
};
</script>