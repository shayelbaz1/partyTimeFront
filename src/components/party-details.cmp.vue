<template>
  <section>
    <img class="main-img" src="../assets/Capture.png" />
    <div class="details-container flex space-around">
      <div class="worded-container">
        <div class="event-desc-container">
          <h2>DJ Play</h2>
          <h3>Saturday, May 1, Starting at 8PM</h3>
          <h1>Get ready for a night full of dancing, partying and botomless beer!</h1>
          <span>RSVP:</span>
        </div>

        <div class="event-buttons-container">
          <button>Interested</button>
          <button>Going</button>
          <button>Invite</button>
          <button>copy</button>
          <button>X</button>
        </div>

        <div class="participants-details">
          <p>3 PARTICIPATORS PICTURES GO HERE</p>
          <p>HEART SYMBOL WITH LIKES NUMBER GOES HERE</p>
          <p>Reviews:</p>
        </div>
        <el-button @click="back" class="btn-back">
          <div class="content">
            <i class="fas fa-arrow-left"></i>
            <h2>Back</h2>
          </div>
        </el-button>
      </div>
      <div class="map-container"></div>
    </div>

    <!-- <review-list v-if="party"></review-list>
    <chat-page v-if="party" :party="party"></chat-page>-->
  </section>
</template>
>

<script>
import PartyService from "@/services/PartyService.js";
import reviewList from "@/components/review-list.vue";
import ChatPage from "@/views/ChatPage.vue";

export default {
  name: "party-details",
  components: {
    reviewList,
    ChatPage
  },
  data() {
    return {
      party: null
    };
  },
  methods: {
    back() {
      this.$router.push("/party-app");
    },
    async loadParty() {
      let partyId = this.$route.params.id;
      this.party = await PartyService.getById(partyId);
    }
  },
  created() {
    this.loadParty();
  }
};
</script>

<style lang="scss" scoped>
section {
  background-color: rgb(47, 47, 47);
}
.details-container {
  text-align: left;
}

.map-container {
  background-color: lightcyan;
  height: 321px;
  width: 400px;
}

.btn-back {
  margin-top: 10px;
  padding: 0px 20px;
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h2 {
    margin-left: 10px;
  }
}

.event-desc-container {
  color: #e4e6eb;
}

.participants-details {
  color: #ffffff;
  font-size: 20px;
}

.event-buttons-container {
  button {
    background-color: #c1272d;
    color: #ffffff;
    border-width: 0px;
    font-size: 20px;
    margin: 5px;
    border-radius: 10px;
    padding: 10px;
  }
}

.main-img {
  max-height: 360px;
}
</style>
