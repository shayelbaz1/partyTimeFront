<template>
  <div class="signup-page">
    <div>
      <form>
        <h2>Signup</h2>
        <input type="text" v-model="creds.email" placeholder="Enter Your Email" />
        <br />
        <input type="text" v-model="creds.username" placeholder="Enter Your Username" />
        <br />
        <input type="password" v-model="creds.password" placeholder="Password" />
        <br />
        <div class="signup-buttons-container">
          <button @click.prevent="doSignup">Signup</button>
          <!-- <img src="../assets/login.jpg" alt srcset /> -->
        </div>
        <!-- <br /> -->
        <!-- <googleLogin @doSignup="doSignup"></googleLogin> -->
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
        email: '',
        imgURL: '',
        isGoogle: false,
        goingPartys: [],
      }
    };
  },
  computed: {},
  created() {
    // console.log("this.loggedinUser", this.loggedinUser);
  },
  methods: {
    async doSignup(googleCreds) {
      console.log(this.creds);
      if (googleCreds.constructor.name !== 'yw') {
        const currUser = await this.$store.dispatch({
          type: "signup",
          creds: this.creds
        });
        if (currUser) this.$router.push("/");
        if (!currUser) return false;
      } else if (googleCreds.constructor.name === 'yw') {
        this.creds.username = googleCreds.Bd;
        this.creds.email = googleCreds.Au;
        this.creds.imgURL = googleCreds.MK;
        this.creds.isGoogle = true
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