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
      <!-- <button>
        <i class="fa fa-google"></i>
        Calender
      </button>-->
      <button>
        <share-network :partyURL="this.partyURL"></share-network>
      </button>
    </div>
    <login v-if="isShowLogin" :party_id="party._id" @hideLogin="hideLogin"></login>
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
              <p
                :class="{red:isToday}"
              >{{formatDateToday(party.startDate)}}{{ party.startDate | moment('from') }}</p>
              <p class="desc">When</p>
              <p>{{ party.startDate | moment('dddd, MMM DD • HH:mm A') }}</p>
              <p class="desc">Start Time</p>
              <p>{{ party.endDate | moment('dddd, MMM DD • HH:mm A') }}</p>
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
              <div class>
                <p
                  class="type"
                  v-for="(type, idx) in party.extraData.musicTypes"
                  :key="idx"
                >{{ type }}</p>
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
        <review-list :reviews="party.extraData.reviews"></review-list>
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
import ChatPage from "@/components/chat.cmp.vue";
import imgBlur from "./img-blur.cmp.vue";
import partyMap from "./party-map.cmp.vue";
import membersPics from "./members-pics.cmp.vue";
import shareNetwork from "./shareNetwork.cmp.vue";
import SocketService from "../services/SocketService.js";
import moment from "moment";
import login from "../views/login.vue";

export default {
  name: "party-details",
  components: {
    reviewList,
    ChatPage,
    imgBlur,
    partyMap,
    membersPics,
    shareNetwork,
    login
  },
  data() {
    return {
      party: null,
      currUser: this.getCurrUserObj(),
      isToday: false,
      isShowLogin: false
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
    partyURL() {
      this.partyURL = `https://partytimes.herokuapp.com/#/party-app/details/${this.party._id}`;
    },
    fee() {
      if (this.party.fee === 0) {
        return "FREE";
      } else {
        return this.party.fee + "$";
      }
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {
    shareToWhatsapp() {
      const thisPartysURL = `https://partytimes.herokuapp.com/#/party-app/details/${this.party._id}`;
      window.open(`https://api.whatsapp.com/send?text=${thisPartysURL}`);
    },  
    hideLogin() {
      this.isShowLogin = false;
    },
    formatDateToday(date) {
      date = new Date(date);
      const today = moment().endOf("day");
      const tomorrow = moment()
        .add(1, "day")
        .endOf("day");
      let dateString = "";
      if (date <= today) {
        this.isToday = true;
        return "Today • ";
      }
      // else if (date < tomorrow) { this.isToday = false; dateString = 'Tomorrow' }
      // return dateString
    },
    formatDate(date) {
      date = date ? date.toISOString().replace(/-|:|\.\d+/g, "") : null;
      return date;
    },
    addToGoogle() {
      const party = this.party;
      let url =
        "http://www.google.com/calendar/event?action=TEMPLATE&trp=false";
      let start = this.formatDate(new Date(this.party.startDate));
      let end = this.formatDate(new Date(this.party.endDate));
      let parameters = {
        text: party.name,
        location: party.location.name,
        details: party.desc,
        dates: start + "/" + end
      };

      for (var key in parameters) {
        if (parameters.hasOwnProperty(key) && parameters[key]) {
          url += "&" + key + "=" + parameters[key];
        }
      }

      window.open(url);
    },
    navigateToParty() {
      const userLocation = this.$store.getters.place;
      const { lat, lng } = userLocation.pos;
      window.open(
        `https://www.google.co.il/maps/dir/${lat},${lng}/${this.party.location.lat},${this.party.location.lng}/`
      );
    },
    toggleLoggin() {
      // if (this.currUser.name === 'Guest') this.isShowLogin = true
      if (!this.$store.getters.isLoggedIn) this.isShowLogin = true;
    },
    addLikeOrGoing(type) {
      if (!this.$store.getters.isLoggedIn) {
        this.isShowLogin = true;
        return;
      }
      let currParty = this.party;
      let currUser = _.cloneDeep(this.currUser);
      const { _id, imgURL, username } = this.loggedInUser;
      const userToAdd = { _id, imgURL, username };

      if (type === "going") {
        // found user in party members
        const userFoundIdx = currParty.extraData.members.findIndex(
          user => user._id === userToAdd._id
        );
        if (userFoundIdx >= 0) {
          // pop current user
          currParty.extraData.members.splice(userFoundIdx, 1);
          // find party in user goingPartys
          const partyIdx = currUser.goingPartys.findIndex(
            id => id === currParty._id
          );
          if (partyIdx <= 0) {
            // pop party from array
            currUser.goingPartys.splice(partyIdx, 1);
          }
        } else {
          // push current user
          currParty.extraData.members.push(userToAdd);
          // Update User
          currUser.goingPartys.push(currParty._id);
        }
        // Save party and user
        // this.$store.dispatch({ type: "saveParty", party: currParty });
        // this.$store.dispatch({ type: "updateUser", user: this.currUser });
        // EventBus of Socket
        SocketService.emit("party joined", {
          currUser: currUser,
          currParty: this.party
        });

        // If Likes By User
      } else if (type === "like") {
        // found user idx in party likes
        const userFoundIdx = currParty.extraData.likes.findIndex(
          user => user._id === userToAdd._id
        );
        if (userFoundIdx >= 0) {
          // Pop member from likes
          currParty.extraData.likes.splice(userFoundIdx, 1);
        } else {
          currParty.extraData.likes.push(userToAdd);
        }
        // EventBus of Socket
        SocketService.emit("party liked", {
          currUser: currUser,
          currParty: this.party
        });
      }
      // if (this.loggedInUser.username !== 'Guest') {
      this.$store.dispatch({ type: "saveParty", party: currParty });
      // }
    },
    getCurrUserObj() {
      // const loggedInUser = sessionStorage.getItem("user");

      return this.$store.getters.loggedInUser;
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
    window.scrollTo(0, 0);
    this.loadParty();
    // Init Setup of socket
    SocketService.setup();
    SocketService.on("notify liked", ({ currUser, currParty }) => {
      this.party = currParty;
    });
    SocketService.on("notify joined", ({ currUser, currParty }) => {
      this.party = currParty;
    });
  }
};
</script>

<style lang="scss">
</style>
