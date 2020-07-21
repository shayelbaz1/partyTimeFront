<template>
  <section class="party-list">
    <button @click="toggleFilter" class="add filter">
      <!-- <i class="fa fa-plus my-float"></i> -->
      <i class="fas fa-search my-float"></i>
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
import EventBus from "../services/EventBus";

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
      this.$emit("addLike", party);
    },
    routeToEdit() {
      this.$router.replace("party-app/edit/");
    },

    toggleFilter() {
      EventBus.$emit("toggleFilter");
    }
  },
  components: {
    partyPreview
  }
};
</script>