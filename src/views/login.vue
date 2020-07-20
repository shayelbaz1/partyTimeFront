<template>
  <div class="login-page">
    <div>
      <form>
        <h2>Login</h2>
        <input type="text" v-model="creds.username" placeholder="Email" />
        <br />
        <input type="password" v-model="creds.password" placeholder="Password" />
        <br />
        <div class="login-buttons-container">
          <button @click.prevent="doLogin">Login</button>
        </div>
<br>        <googleLogin></googleLogin>
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
        password: ""
      }
    };
  },
  computed: {},
  created() {},
  methods: {
    async doLogin() {
      const currUser = await this.$store.dispatch({
        type: "login",
        creds: this.creds
      });
      if (currUser.length) this.$router.push("/");
      if (!currUser.length) return false;
    },
    // onSignIn(googleUser) {
    //   var profile = googleUser.getBasicProfile();
    //   console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    //   console.log("Name: " + profile.getName());
    //   console.log("Image URL: " + profile.getImageUrl());
    //   console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
    // }
  },
  components: {
    googleLogin
  }
};
</script>