<template>
  <section>
    <ShareNetwork network="WhatsApp" 
    title="Check out this party!"
    :url="fullURL"></ShareNetwork>
  </section>
</template>

<script>
export default {
  props: ["partyID"],
  data() {
    return {
      baseURL: "https://partytimes.herokuapp.com/#/party-app/details"
    };
  },
  mounted() {
    console.log("testesteset", this.partyID);
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