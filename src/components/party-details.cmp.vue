<template>
  <section style="height: 90%">
    <img class="main-img" src="../assets/Capture.png" />
    <div class="details-container flex space-around">
      <div class="worded-container">
        <div class="event-desc-container">
          <div class="event-header-detail">About the event:</div>
          <div class="event-deep-details">
            <p>DJ Play</p>
            <p>Saturday, May 1, Starting at 8PM</p>
            <p>Get ready for a night full of dancing, partying and botomless beer!</p>
          </div>
        </div>

        <div class="event-buttons-container">
          <p>RSVP:</p>
          <button>Interested</button>
          <button>Going</button>
          <button>Invite</button>
          <button>copy</button>
          <button>X</button>
        </div>

        <div class="participants-details">
          <p>3 PARTICIPATORS PICTURES GO HERE</p>
          <div class="likes-container flex">
            <i class="fa fa-heart"></i>
            <p class="like-number">3</p>
          </div>
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
    async loadparty() {
      let partyId = this.$route.params.id;
      this.party = await partyService.getById(partyId);
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
  min-height: 56%;
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
  position: absolute;
  bottom: 0;
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h2 {
    margin-left: 10px;
  }
}

.fa-heart {
  color: #c1272d;
  margin-right: 5px;
}

.like-number {
  margin: 0;
}

.event-header-detail {
  font-size: 25px;
  color: #ffbb00;
  margin-bottom: 5px;
}
.event-deep-details {
  font-size: 19px;
}
.worded-container {
  color: #e4e6eb;

  p {
    margin: 0;
  }
}

.participants-details {
  color: #ffffff;
  background-color: #3b3b3b;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.event-buttons-container {
  background-color: #3b3b3b;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  button {
    background-color: #c1272d;
    color: #ffffff;
    border-width: 0px;
    font-size: 20px;
    margin: 5px;
    border-radius: 10px;
    transition-duration: 0.3s;
    &:hover {
      transition-duration: 0.3s;
      background-color: #ff0008;
    }
    padding: 10px;
  }
}

.event-desc-container {
  background-color: #3b3b3b;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.main-img {
  max-height: 360px;
  margin-top: 5px;
}
</style>
