<template>
  <section v-if="party" class="party-details">
    <img-blur :imgUrl="party.imgUrl"></img-blur>

    <div class="event-buttons-container flex">
      <button @click="back" class="btn-back">
        <i class="fas fa-arrow-left"></i>
        Back
      </button>
      <button>
        <i class="fas fa-heart"></i>
        {{party.likes}}
      </button>
      <!-- <button>
        <i class="far fa-star"></i>
        Interested
      </button>-->
      <button @click="toggleGoingToParty">
        <i class="far fa-check-circle"></i>
        {{party.extraData.members.length}}
        Going
      </button>
      <button>
        <i class="fas fa-directions"></i>
        Navigate
      </button>
      <button>
        <i class="fas fa-share"></i>
        Share
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
              <p class="title">{{party.name}}</p>
              <p class="desc">Title</p>
            </td>
          </tr>
          <tr>
            <td class="icon">
              <i class="fas fa-map-marker-alt"></i>
            </td>
            <td class="txt">
              {{party.location.name}}
              <p class="desc">Location</p>
            </td>
          </tr>
          <tr>
            <td class="icon">
              <i class="far fa-clock"></i>
            </td>
            <td class="txt">
              <p>{{party.startDate | moment("from")}}</p>
              <p class="desc">When</p>
              <p>{{party.startDate | moment("dddd, MMM DD HH:mm A")}}</p>
              <p class="desc">Start Time</p>
              <p>{{party.endDate | moment("dddd, MMM DD HH:mm A")}}</p>
              <p class="desc">End Time</p>
            </td>
          </tr>
          <tr>
            <td class="icon">
              <i class="fas fa-dollar-sign"></i>
            </td>
            <td class="txt">
              <p>{{fee}}</p>
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
                  v-for="(type,idx) in party.extraData.partyTypes"
                  :key="idx"
                >{{type}} |</p>
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
                  v-for="(type,idx) in party.extraData.musicTypes"
                  :key="idx"
                >{{type}} |</p>
              </div>
              <p class="desc">Music Types</p>
            </td>
          </tr>
          <tr>
            <td class="icon">
              <i class="fas fa-info"></i>
            </td>
            <td class="txt">
              <pre class="party-desc">{{party.desc}}</pre>
              <p class="desc">Description</p>
            </td>
          </tr>
        </table>
      </div>

      <div class="map-members-container flex column-layout">
        <!-- <div class="map-container"> -->
        <!-- <img src="../assets/map.png" alt srcset /> -->
        <party-map :partyProp="party"></party-map>
        <!-- </div> -->
        <div class="members">
          <p class="title">Going</p>
          <div class="members-img-container">
            <members-pics
              v-for="member in party.extraData.members"
              :key="member._id"
              :member="member"
            ></members-pics>
            <!-- <div class="member-con" v-for="(n,idx) in 5" :key="idx">
              <img :src="'http://lorempixel.com/100/100/people/'+idx" />
              <p>Kester Chapman</p>
            </div> -->
            <!-- <pre style="color:white">{{party.extraData.members}}</pre> -->
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
    fee() {
      if (this.party.fee === 0) {
        return "FREE";
      } else {
        return this.party.fee + "$";
      }
    }
  },
  methods: {
    toggleGoingToParty() {
      const currParty = this.party;
      const userToAdd = {
        _id: this.currUser._id,
        imgURL: this.currUser.imgURL,
        username: this.currUser.username
      };

      const partyFound = this.currUser.goingPartys.find(
        id => id === currParty._id
      );
      if (partyFound) return;
      else if (!partyFound) {
        console.log("you can join");
        currParty.extraData.members.push(userToAdd);
        this.$store.dispatch({
          type: "saveParty",
          party: currParty
        });
        this.currUser.goingPartys.push(currParty._id);

        this.$store.dispatch({
          type: "updateUser",
          user: this.currUser
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
  }
};
</script>