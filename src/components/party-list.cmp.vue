<template>
  <section class="party-list">
    <button @click="routeToEdit" class="add">
      <i class="fa fa-plus my-float"></i>
    </button>

    <div class="flex column-layout">
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