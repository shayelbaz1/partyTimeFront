finished join button<template>
  <section class="member-pic-container">
    <img class="members-pic" v-bind:src="member.imgURL" />
    <!-- <h3>{{this.member.username}}</h3> -->
    <h3>{{firstName}}</h3>
  </section>
</template>

<script>
export default {
  name: "members-pics",
  props: ["member"],
  computed: {
    firstName() {
      let username = this.member.username;
      let arr = username.split(" ", 2);
      let firstWord = arr[0];
      return firstWord;
    }
  }
};
</script>
  
<style >
</style>