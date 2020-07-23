finished join button<template>
  <section class="member-pic">
    <img v-bind:src="member.imgURL" />
  </section>
</template>

<script>
export default {
  name: "members-pics",
  props: ["member"]
};
</script>

<style>
</style>