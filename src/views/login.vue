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
        <GoogleLogin class="btn-google" :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
      </form>
    </div>
  </div>
</template>

<script>
// import googleLogin from "./gLogin.vue";
import { GoogleLogin } from "vue-google-login";

export default {
  name: "login-page",
  data() {
    return {
      params: {
        // client_id: "295314922853-kgqrkuvadpeeu7q6098cml7k5jte1spu.apps.googleusercontent.com"
        // client_id: "533525570890-ik134ku5d86nd70i76dsjfcd7is3uag4.apps.googleusercontent.com"
        // client_id: "533525570890-flse2grs8hijvj016chamr2vlklv9vbb.apps.googleusercontent.com"
        client_id: "533525570890-vp3jb7kpae7rd3pjk943bhstsbp3gtgi.apps.googleusercontent.com"
      },
      // Btn styles with google ui
      renderParams: {
        width: 277,
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
  methods: {
    async onSuccess(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      const user = await this.$store.dispatch({
        type: "loginGoogle",
        id_token: id_token
      });
      this.$router.push("/party-app");
    },
    onFailure() {
      console.log("Failed to log in");
    },
    routeToSignup() {
      this.$router.push("/signup");
    },
    async doLogin() {
      const currUser = await this.$store.dispatch({
        type: "login",
        creds: this.creds
      });
      this.$router.push("/party-app");
    }
  },
  components: {
    GoogleLogin
  }
};
</script>