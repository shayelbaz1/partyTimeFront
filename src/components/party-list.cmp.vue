<template>
  <section class="party-list">
    <button @click="routeToEdit" class="add">
      <i class="fa fa-plus my-float"></i>
    </button>

    <div class="party-list-container flex column-layout">
      <party-preview
        @deleteParty="signalDelete"
        @addLike="signalAddLike"
        v-for="party in partys"
        :key="party._id"
        :party="party"
      ></party-preview>
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
    signalDelete(partyId) {
      this.$emit("deleteParty", partyId);
    },
    signalAddLike(party) {
      // console.log(partyId);
      this.$emit("addLike", party);
    },
    routeToEdit() {
      this.$router.replace("party-app/edit/");
    }
  },
  components: {
    partyPreview
  }
};
</script>