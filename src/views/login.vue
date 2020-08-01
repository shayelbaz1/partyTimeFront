<template>
  <div class="login-page">
    <div>
      <form>
        <h2>Sign In</h2>
        <button v-if="isShowCloseBtn" class="close-btn" @click.prevent="hideLogin">X</button>

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
        <div class="login-buttons-container">
          <button class="btn guest" @click.prevent="doGuestLogin">Guest Login</button>
        </div>
        <!-- <br /> -->
        <!-- <googleLogin @doGoogleLogin="doGoogleLogin"></googleLogin> -->
        <GoogleLogin
          class="btn-google"
          :params="params"
          :renderParams="renderParams"
          :onSuccess="onSuccess"
          :onFailure="onFailure"
        ></GoogleLogin>
      </form>
    </div>
  </div>
</template>

<script>
import { GoogleLogin } from "vue-google-login";

export default {
  name: "login-page",
  props: ["party_id"],
  data() {
    return {
      isShowCloseBtn: false,
      params: {
        client_id:
          "533525570890-vp3jb7kpae7rd3pjk943bhstsbp3gtgi.apps.googleusercontent.com"
      },
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
      this.$store.commit({ type: "setIsLoggedIn", bool: true });
      if (!this.party_id) this.$router.push("/party-app");
      else {
        this.$emit("hideLogin");
      }
    },
    onFailure() {
      console.log("Failed to log in");
    },
    routeToSignup() {
      this.$router.push("/signup");
    },
    hideLogin() {
      this.$emit("hideLogin");
    },
    async doLogin() {
      if (!this.creds.password) return;
      if (!this.creds.email) return;
      const currUser = await this.$store.dispatch({
        type: "login",
        creds: this.creds
      });
      // if (currUser) {
      //   this.$router.push("/party-app");
      // } else {
      //   this.$router.push("/login");
      // }
      this.$store.commit({ type: "setIsLoggedIn", bool: true });
      if (!this.party_id) this.$router.push("/party-app");
      else {
        this.$emit("hideLogin");
      }
    },
    doGuestLogin() {
      this.$store.commit({ type: "setIsLoggedIn", bool: true });
      if (!this.party_id) this.$router.push("/party-app");
      else {
        this.$emit("hideLogin");
      }
    }
  },
  created() {
    if (this.party_id) this.isShowCloseBtn = true;
  },
  components: {
    GoogleLogin
  }
};
</script>