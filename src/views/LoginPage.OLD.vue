<template>
  <div class="login-page">
    <h1>This is a testing page for working with the Production Ready Server</h1>
    <h2>{{msg}}</h2>

    <div v-if="loggedinUser">
      <h3>
        Loggedin User:
        {{loggedinUser.username}}
        <form @submit.prevent="updateUser">
          <input type="text" v-model="userToEdit.username" />
        </form>
        <button @click="doLogout">Logout</button>
      </h3>
    </div>

    <div v-else>
      <form @submit.prevent="doLogin">
        <input type="text" v-model="loginCred.email" placeholder="Email" />
        <br />
        <input type="text" v-model="loginCred.password" placeholder="Password" />
        <br />
        <button>Login</button>
      </form>

      <form @submit.prevent="doSignup">
        <input type="text" v-model="signupCred.email" placeholder="Email" />
        <br />
        <input type="text" v-model="signupCred.password" placeholder="Password" />
        <br />
        <input type="text" v-model="signupCred.username" placeholder="Username" />
        <br />
        <button>Signup</button>
      </form>
    </div>

    <hr />

    <button @click="getAllUsers">Get All Users</button>

    <ul>
      <li v-for="user in users" :key="user._id">
        <pre>{{user}}</pre>
        <router-link :to="'/user/'+user._id">Details</router-link>
        <button @click="removeUser(user._id)">x</button>
      </li>
    </ul>
  </div>
  <!-- end of v-else -->
</template>

<script>
export default {
  name: "login-page",
  data() {
    return {
      loginCred: {
        email: "admin@gmail.com",
        password: "1234"
      },
      signupCred: {},
      msg: "",
      userToEdit: {}
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
  },
  methods: {
    async doLogin() {
      const cred = this.loginCred;
      if (!cred.email || !cred.password)
        return (this.msg = "Please enter user/password");
      await this.$store.dispatch({ type: "login", userCred: cred });
      this.loginCred = {};
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    },
    doSignup() {
      const cred = this.signupCred;
      if (!cred.email || !cred.password || !cred.username)
        return (this.msg = "Please fill up the form");
      this.$store.dispatch({ type: "signup", userCred: cred });
    },
    getAllUsers() {
      this.$store.dispatch({ type: "loadUsers" });
    },
    removeUser(userId) {
      this.$store.dispatch({ type: "removeUser", userId });
    },
    updateUser() {
      this.$store.dispatch({ type: "updateUser", user: this.userToEdit });
    }
  },
  watch: {
    loggedinUser() {
      this.userToEdit = { ...this.loggedinUser };
    }
  }
};
</script>