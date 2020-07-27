<template>
  <ShareNetwork network="WhatsApp" title="Check out this party!" :url="fullURL">
    <i class="fab fa-whatsapp"></i>
    <!-- Share -->
  </ShareNetwork>
</template>

<script>
export default {
  props: ["partyID"],
  data() {
    return {
      baseURL: "https://partytimes.herokuapp.com/#/party-app/details/"
    };
  },
  computed: {
    fullURL() {
      const FullURL = this.baseURL + this.partyID;
      return FullURL;
    }
  }
};
</script>

<style>
</style>