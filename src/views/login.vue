<template>
  <div class="login-page">
    <div>
      <form>
        <h2>Login</h2>
        <div class="login-input-container">
          <i class="fa fa-user login-icon" aria-hidden="true"></i>
          <input type="text" v-model="creds.email" placeholder="Enter Your Email" />
        </div>
        <br />
        <div class="login-input-container">
          <i class="fa fa-lock login-icon" aria-hidden="true"></i>

          <input type="password" v-model="creds.password" placeholder="Password" />
        </div>
        <br />
        <div class="login-buttons-container">
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
  created() {
    // const route = currentRouteName()
    // console.log(route);
  },
  methods: {
    async doLogin(googleCreds) {
      if (googleCreds.constructor.name !== "yw") {
        const currUser = await this.$store.dispatch({
          type: "login",
          creds: this.creds
        });
        console.log(currUser);
        if (currUser) this.$router.push("/");
        if (!currUser.length) return false;
      } else if (googleCreds.constructor.name === "yw") {
        this.creds.username = googleCreds.Bd;
        this.creds.email = googleCreds.Au;
        this.creds.imgURL = googleCreds.MK;
        const currUser = await this.$store.dispatch({
          type: "login",
          creds: this.creds
        });
        if (currUser.length) this.$router.push("/");
        if (!currUser.length) return false;
      }
    }
  },
  components: {
    googleLogin
  }
};
</script>