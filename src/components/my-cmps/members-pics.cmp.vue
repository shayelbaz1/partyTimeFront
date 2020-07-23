finished join button<template>
  <section class="member-pic-container">
    <img class="members-pic" v-bind:src="member.imgURL" />
    <h3>{{this.member.username}}</h3>
  </section>
</template>

<script>
export default {
  name: "members-pics",
  props: ["member"]
};
</script>
  
<style >
</style>