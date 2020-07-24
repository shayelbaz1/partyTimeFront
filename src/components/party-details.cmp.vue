<template>
  <section v-if="party" class="party-details">
    <img-blur :imgUrl="party.imgUrl"></img-blur>

    <div class="event-buttons-container flex">
      <button @click="back" class="btn-back">
        <i class="fas fa-arrow-left"></i>
        Back
      </button>
      <button @click="addLikeOrGoing('like')">
        <i class="fas fa-heart"></i>
        {{ likesCom }}
      </button>
      <!-- <button>
        <i class="far fa-star"></i>
        Interested
      </button>-->
      <button @click="addLikeOrGoing('going')">
        <i class="far fa-check-circle"></i>
        {{ party.extraData.members.length }}
        Going
      </button>
      <button @click="navigateToParty">
        <i class="fas fa-directions"></i>
        Navigate
      </button>
      <button>
        <i class="fa fa-google"></i>
        Calender
      </button>
      <button @click="shareToWhatsapp">
        <i class="fab fa-whatsapp"></i>
        Whatsapp
      </button>
    </div>

    <div class="details-and-map-container flex">
      <div class="table-container">
        <table class="detail-table">
          <tr>
            <td class="icon">
              <!-- <i class="fas fa-map-marker-alt"></i> -->
            </td>
            <td class="txt">
              <p class="title">{{ party.name }}</p>
              <p class="desc">Title</p>
            </td>
          </tr>
          <tr>
            <td class="icon">
              <i class="fas fa-map-marker-alt"></i>
            </td>
            <td class="txt">
              {{ party.location.name }}
              <p class="desc">Location</p>
            </td>
          </tr>
          <tr>
            <td class="icon">
              <i class="far fa-clock"></i>
            </td>
            <td class="txt">
              <p>{{ party.startDate | moment('from') }}</p>
              <p class="desc">When</p>
              <p>{{ party.startDate | moment('dddd, MMM DD HH:mm A') }}</p>
              <p class="desc">Start Time</p>
              <p>{{ party.endDate | moment('dddd, MMM DD HH:mm A') }}</p>
              <p class="desc">End Time</p>
            </td>
          </tr>
          <tr>
            <td class="icon">
              <i class="fas fa-dollar-sign"></i>
            </td>
            <td class="txt">
              <p>{{ fee }}</p>
              <p class="desc">Price</p>
            </td>
          </tr>
          <tr>
            <td class="icon">
              <i class="fas fa-tag"></i>
            </td>
            <td class="txt">
              <div class="flex">
                <p
                  class="type"
                  v-for="(type, idx) in party.extraData.partyTypes"
                  :key="idx"
                >{{ type }} |</p>
              </div>
              <p class="desc">Party Types</p>
            </td>
          </tr>
          <tr>
            <td class="icon">
              <i class="fas fa-headphones-alt"></i>
            </td>
            <td class="txt">
              <div class="flex">
                <p
                  class="type"
                  v-for="(type, idx) in party.extraData.musicTypes"
                  :key="idx"
                >{{ type }} |</p>
              </div>
              <p class="desc">Music Types</p>
            </td>
          </tr>
          <tr>
            <td class="icon">
              <i class="fas fa-info"></i>
            </td>
            <td class="txt">
              <pre class="party-desc">{{ party.desc }}</pre>
              <p class="desc">Description</p>
            </td>
          </tr>
        </table>
        <review-list></review-list>
      </div>

      <div class="map-members-container flex column-layout">
        <party-map :partyProp="party"></party-map>
        <div class="members">
          <p class="title">Going</p>
          <div class="members-img-container">
            <members-pics
              v-for="member in party.extraData.members"
              :key="member._id"
              :member="member"
            ></members-pics>
          </div>
        </div>
        <div class="members">
          <p class="title">Likes</p>
          <div class="members-img-container">
            <members-pics
              v-for="member in party.extraData.likes"
              :key="member._id"
              :member="member"
            ></members-pics>
          </div>
        </div>
      </div>
    </div>

    <!-- <review-list v-if="party"></review-list> -->
    <chat-page v-if="party" :party="party"></chat-page>
  </section>
</template>
>

<script>
import PartyService from "@/services/PartyService.js";
import reviewList from "@/components/review-list.vue";
import ChatPage from "@/views/ChatPage.vue";
import imgBlur from "./img-blur.cmp.vue";
import partyMap from "./party-map.cmp.vue";
import membersPics from "./my-cmps/members-pics.cmp.vue";
import SocketService from "../services/SocketService.js";

export default {
  name: "party-details",
  components: {
    reviewList,
    ChatPage,
    imgBlur,
    partyMap,
    membersPics
  },
  data() {
    return {
      party: null,
      currUser: this.getCurrUserObj()
    };
  },
  computed: {
    likesCom() {
      if (this.party.extraData.likes) {
        return this.party.extraData.likes.length;
      } else {
        return 0;
      }
    },
    fee() {
      if (this.party.fee === 0) {
        return "FREE";
      } else {
        return this.party.fee + "$";
      }
    }
  },
  methods: {
    shareToWhatsapp() {
      // TODO ADD PARTY LINK
      window.open(
        "https://api.whatsapp.com/send?text=Hi%20Let%27s%20go%20to%20this%20crazy%20party!%20tell%20my%20what%20you%20think?"
      );
    },
    navigateToParty() {
      const userLocation = this.$store.getters.place;
      const { lat, lng } = userLocation.pos;
      console.log("for navigation:", this.party);
      window.open(
        `https://www.google.co.il/maps/dir/${lat},${lng}/${this.party.location.lat},${this.party.location.lng}/`
      );
    },
    addLikeOrGoing(type) {
      const currParty = this.party;
      const userToAdd = {
        _id: this.currUser._id,
        imgURL: this.currUser.imgURL,
        username: this.currUser.username
      };
      if (type === "going") {
        // const partyFound = this.currUser.goingPartys.find(
        //   id => id === currParty._id
        // );
        const userFound = currParty.extraData.members.find(
          user => user._id === userToAdd._id
        );

        if (userFound) return;
        else if (!userFound) {
          console.log("you can join");
          // Update Party
          currParty.extraData.members.push(userToAdd);
          this.$store.dispatch({
            type: "saveParty",
            party: currParty
          });
          // Update User
          this.currUser.goingPartys.push(currParty._id);

          this.$store.dispatch({
            type: "updateUser",
            user: this.currUser
          });

          // EventBus of Socket
          SocketService.emit("party joined", {
            currUser: this.currUser,
            currParty: this.party
          });
        }
        // If Likes By User ------------------------------------
      } else if (type === "like") {
        const userFound = currParty.extraData.likes.find(
          user => user._id === userToAdd._id
        );

        if (userFound) return;

        currParty.extraData.likes.push(userToAdd);
        this.$store.dispatch({
          type: "saveParty",
          party: currParty
        });
        // EventBus of Socket
        SocketService.emit("party liked", {
          currUser: this.currUser,
          currParty: this.party
        });
      }
    },
    getCurrUserObj() {
      const loggedInUser = sessionStorage.getItem("user");

      return JSON.parse(loggedInUser);
    },
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
    // Init Setup of socket
    SocketService.setup();
    SocketService.on("notify liked", ({ currUser, currParty }) => {
      // console.log("FrontEnd socket Liked:", currUser, currParty);
      this.party = currParty;
    });
    SocketService.on("notify joined", ({ currUser, currParty }) => {
      // console.log("FrontEnd socket Liked:", currUser, currParty);
      this.party = currParty;
    });
  }
};
</script>
