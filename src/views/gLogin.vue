<template>
  <section>
    <g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">
      <i class="fa fa-google" aria-hidden="true"></i>
    </g-signin-button>
    <a href="#" @click.stop="signOut">Sign out</a>
    <!-- <a href="#" @click.prevent="signOut">Sign out</a> -->
  </section>
</template>
 
<script>
export default {
  data() {
    return {
      // The Auth2 parameters, as seen on
      // https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
      // As the very least, a valid client_id must present.
      // @type {Object}

      googleSignInParams: {
        client_id:
          "533525570890-ik134ku5d86nd70i76dsjfcd7is3uag4.apps.googleusercontent.com"
      },
      currRoute: this.$route.name
    };
  },
  methods: {
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {});
    },
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile(); // etc etc
      var id_token = googleUser.getAuthResponse().id_token;
      if (this.currRoute === "Login") this.$emit("doLogin", profile);
      if (this.currRoute === "Signup") this.$emit("doSignup", profile);

      // user cheat sheet:
      // Au - Email
      // Bd - Username
      // JU - ?
      // MK - Profile Picture
      // nU -  Last Name
      // nW - First Name

      // this.onSignIn(this.profile);
    },
    // onSignIn(googleUser) {
    //   var profile = auth2.currentUser.get().getBasicProfile();
    // },

    onSignInError(error) {
      // `error` contains any error occurred.
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {});
    }
  }
};
</script> 
 
<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  font-size: 1.7rem;
  padding: 8px 15px;
  border-radius: 50px;
  background-color: #dd4b39;
  color: #fff;
}
</style> 