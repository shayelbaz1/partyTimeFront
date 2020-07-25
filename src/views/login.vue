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
          <button @click.prevent="doLogin">Login</button>
          <button class="signup" @click.prevent="routeToSignup">Signup</button>
        </div>
        <!-- <br /> -->
        <!-- <googleLogin @doGoogleLogin="doGoogleLogin"></googleLogin> -->
        <GoogleLogin
          :params="params"
          :renderParams="renderParams"
          :onSuccess="onSuccess"
          :onFailure="onFailure"
        ></GoogleLogin>
      </form>
    </div>
  </div>
  <!-- end of v-else -->
</template>

<script>
// import googleLogin from "./gLogin.vue";
import {GoogleLogin} from "vue-google-login";

export default {
  name: "login-page",
  data() {
    return {
      // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
      params: {
        // client_id: "295314922853-kgqrkuvadpeeu7q6098cml7k5jte1spu.apps.googleusercontent.com"
        client_id: "533525570890-ik134ku5d86nd70i76dsjfcd7is3uag4.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      },
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
    onSuccess(googleUser) {
      console.log('googleUser:', googleUser)
      // This only gets the user information: id, name, imageUrl and email
            console.log(googleUser.getBasicProfile());
    },
    onFailure() {
      console.log("Failed");
    },
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
        // console.log("user back from backend!", currUser);
        // Update user in store after log in
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
    },
    async doGoogleLogin(idToken) {
      console.log("lol");
      const currUser = await this.$store.dispatch({
        type: "login",
        creds: idToken
      });
    }
  },
  components: {
    // googleLogin,
    GoogleLogin
  }
};
</script>