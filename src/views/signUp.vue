<template>
  <div class="signup-page">
    <div>
      <form>
        <h2>Signup</h2>
        <input type="text" v-model="creds.username" placeholder="Email" />
        <br />
        <input type="password" v-model="creds.password" placeholder="Password" />
        <br />
        <div class="signup-buttons-container">
          <button @click.prevent="doSignup">Signup</button>
          <!-- <img src="../assets/login.jpg" alt srcset /> -->
        </div>
        <br>
        <googleLogin @doLogin="doSignup"></googleLogin>
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
        password: ""
      }
    };
  },
  computed: {},
  created() {
    // console.log("this.loggedinUser", this.loggedinUser);
  },
  methods: {
    async doSignup() {
      console.log('signup, not google');
      const currUser = await this.$store.dispatch({
        type: "signup",
        creds: this.creds
      });
      console.log('signup, google');
      if (currUser) this.$router.push("/");
      if (!currUser) return false;
    }
  },
   components: {
    googleLogin
  }
};
</script>