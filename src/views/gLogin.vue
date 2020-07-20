<template>
  <section>
    <g-signin-button
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError"
    >Sign in with Google</g-signin-button>
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
          "533525570890-dgaqicqmn6qajlpa1h7k8b1pjjd7fe2d.apps.googleusercontent.com"
      },
      currRoute: this.$route.name
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile(); // etc etc
      if (this.currRoute === 'Login') this.$emit("doLogin", profile);
      if (this.currRoute === 'Signup') this.$emit("doSignup", profile);

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
    //   console.log("hello2");
    //   var profile = auth2.currentUser.get().getBasicProfile();
    //   console.log("ID: " + profile.getId());
    //   console.log("Full Name: " + profile.getName());
    //   console.log("Given Name: " + profile.getGivenName());
    //   console.log("Family Name: " + profile.getFamilyName());
    //   console.log("Image URL: " + profile.getImageUrl());
    //   console.log("Email: " + profile.getEmail());
    // },

    onSignInError(error) {
      // `error` contains any error occurred.
      console.log("OH NOES", error);
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });
    }
  }
};
</script> 
 
<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style> 