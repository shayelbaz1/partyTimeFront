<template>
  <section class="party-list">
    <div v-if="!isProcessing" class="party-list-container flex column-layout">
      <party-preview @deleteParty="signalDelete" @addLike="signalAddLike" v-for="party in partys" :key="party._id" :party="party"></party-preview>
    </div>
    <div class="flex justify-center spinner" v-else>
      <cube-spin></cube-spin>
    </div>
  </section>
</template>

<script>
import cubeSpin from "vue-loading-spinner/src/components/Circle2";
import partyPreview from "../components/party-preview.cmp.vue";
import EventBus from "../services/EventBus";

export default {
  name: "party-list",
  props: {
    partys: {
      type: Array
    }
  },
  computed: {
    isProcessing() {
      return this.$store.getters.isProcessing;
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
    partyPreview,
    cubeSpin
  }
};
</script>
<style lang="scss">
.party-list {
  width: 100%;
  min-height: 500px;
}
.spinner {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
@media screen and (max-width: 600px) {
  .party-list {
    .box-card {
      flex-direction: column;
      height: 100%;
      border: 1px solid white;
      .img-box {
        width: 100%;
        height: 200px;
      }
    }
  }
}
</style>