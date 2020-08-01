<template>
  <section>
    <h1>Profile Page</h1>
    <el-card class="box-card">
      <div class="img-box" @click="openWidget" title="Upload Image">
        <!-- <img class="img-backround" :src="user.imgURL" title="Upload Image" /> -->
        <img class="img-front" :src="user.imgURL" title="Upload Image" />
      </div>
      <h3 class="text item">{{user.username}}</h3>
      <div class="text item">email: {{user.email}}</div>
      <div class="text item">isAdmin: {{user.isAdmin}}</div>
      <button @click="signOut">Sign out</button>
    </el-card>
    <!-- <el-card class="box-card">
      <genderPicker />
    </el-card>
    <el-card class="box-card">
      <colorPicker />
    </el-card>
    <el-card>
      <time-picker class="box-card" />
    </el-card> -->
  </section>
</template>

<script>
// import genderPicker from "../components/my-cmps/gender-picker.cmp.vue";
// import colorPicker from "../components/my-cmps/color-picker.cmp.vue";
// import timePicker from "../components/my-cmps/time-picker.cmp.vue";

export default {
  data() {
    return {
      userToSave: {}
    };
  },
  computed: {
    user() {
      this.userToSave = JSON.parse(
        JSON.stringify(this.$store.getters.loggedInUser)
      );
      console.log(this.userToSave);
      return this.userToSave;
    }
  },
  methods: {
    signOut() {
      sessionStorage.clear();
      this.$store.dispatch("logout");
      this.$router.push("/party-app");
    },
    openWidget() {
      const uploadWidget = cloudinary.createUploadWidget(
        {
          cloudName: "partytime",
          uploadPreset: "partyTime"
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            this.userToSave.imgURL = result.info.url;
            this.$store.dispatch({ type: "updateUser", user: this.userToSave });
          }
        }
      );
      uploadWidget.open();
    }
  },
  // components: {
  //   genderPicker,
  //   colorPicker,
  //   timePicker
  // }
};
</script>

<style lang="scss"scoped>
section {
  align-items: center;
  display: flex;
  flex-direction: column;
}
.text {
  font-size: 14px;
}

.item {
  padding: 10px 0;
}

.box-card {
  min-width: 480px;
  margin-bottom: 10px;
  align-items: center;
  display: flex;
  flex-direction: column;
  img {
    border-radius: 50%;
  }
  .img-box {
    background-color: transparent;
  }
}
</style>