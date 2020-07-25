<template>
  <section>
    <ShareNetwork
      network="WhatsApp"
      :url="this.partyURL"
      title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
      description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
      quote="The hot reload is so fast it\'s near instant. - Evan You"
      hashtags="vuejs,vite"
    >Share on Facebook</ShareNetwork>
  </section>
</template>

<script>
export default {
  props: ["partyURL"],
  created() {
    console.log("testesteset", this.partyURL);
  }
};
</script>

<style>
</style>