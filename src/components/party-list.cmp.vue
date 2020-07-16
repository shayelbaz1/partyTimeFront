<template>
  <section class="party-list">
    <button @click="routeToEdit" class="add">
      <i class="fa fa-plus my-float"></i>
    </button>
    <div class="flex column-layout space-around">
      <party-preview v-for="party in partys" :key="party._id" :party="party"></party-preview>
    </div>
  </section>
</template>

<script>
import partyPreview from "../components/party-preview.cmp.vue";

export default {
  name: "party-list",
  props: {
    partys: {
      type: Array
    }
  },
  methods: {
    routeToEdit() {
      this.$router.replace("party-app/edit/");
    }
  },
  components: {
    partyPreview
  }
};
</script>

<style lang="scss">
button.add {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #850000;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px rgb(0, 0, 0);
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  z-index: 1;
  &:active {
    box-shadow: none;
  }
}
</style>