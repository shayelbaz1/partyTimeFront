<template>
  <section>
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
      <button>
        <i class="far fa-star"></i>
        Interested
      </button>
      <button>
        <i class="far fa-check-circle"></i>
        Going
      </button>
      <button>
        <i class="fas fa-directions"></i>
      </button>
      <button>
        <i class="fas fa-share"></i>
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
              <p>{{party.desc}}</p>
              <p class="desc">Description</p>
            </td>
          </tr>
        </table>
      </div>

      <div class="map-members-container flex column-layout">
        <div class="map-container">
          <img src="../assets/map.png" alt srcset />
        </div>
        <div class="members">
          <p>Going</p>
          <div class="members-img-container">
            <img src="../assets/profile/profile1.jpeg" />
            <img src="../assets/profile/profile2.jpeg" />
            <img src="../assets/profile/profile3.jpeg" />
            <img src="../assets/profile/profile4.jpeg" />
            <img src="../assets/profile/profile5.jpeg" />
            <img src="../assets/profile/profile6.jpeg" />
          </div>
        </div>
      </div>
    </div>

    <!-- <review-list v-if="party"></review-list> -->
    <!-- <chat-page v-if="party" :party="party"></chat-page> -->
  </section>
</template>
>

<script>
import PartyService from "@/services/PartyService.js";
import reviewList from "@/components/review-list.vue";
import ChatPage from "@/views/ChatPage.vue";
import imgBlur from "./img-blur.cmp.vue";

export default {
  name: "party-details",
  components: {
    reviewList,
    ChatPage,
    imgBlur
  },
  data() {
    return {
      party: null
    };
  },
  computed: {
    fee() {
      if (this.party.fee === "0") {
        return "FREE";
      } else {
        return this.party.fee + "$";
      }
    }
  },
  methods: {
    back() {
      this.$router.push("/party-app");
    },
    async loadParty() {
      let partyId = this.$route.params.id;
      this.party = await PartyService.getById(partyId);
      console.log("this.party:", this.party);
    }
  },
  created() {
    this.loadParty();
  }
};
</script>

<style lang="scss" scoped>
.event-buttons-container {
  background-color: #3b3b3b;
  padding: 10px;
  margin-bottom: 10px;
  // padding-left: 50px;
  display: flex;
  justify-content: flex-end;
  button {
    background-color: #111111;
    color: #e6e6e6;
    border-width: 0px;
    font-size: 0.8rem;
    margin: 5px;
    border-radius: 7px;
    transition-duration: 0.3s;
    padding: 10px;
    &:hover {
      background-color: #c1272d;
    }
  }
  .fa-heart {
    color: #c1272d;
    margin-right: 5px;
  }
}

.details-and-map-container {
  .table-container {
    color: #e4e6eb;
    width: 60%;
    table.detail-table {
      width: 100%;
      font-size: 1rem;
      border-collapse: collapse;
      text-align: left;
      p {
        margin: 0;
      }
      td {
        padding-top: 10px;
      }
      td.txt {
        border: none;
        border-bottom: 1px solid #dddddd;
        border-color: #acacac;
        p.desc {
          margin-top: 3px;
          margin-bottom: 7px;
          font-size: 1rem;
          color: #acacac;
        }
        p.type {
          margin-right: 10px;
        }
        p.title {
          font-size: 1.5rem;
        }
      }
      td.icon {
        border: none;
        text-align: center;
        width: 60px;
        // border-bottom: 1px solid #dddddd;
      }
    }
  }
  .map-members-container {
    padding: 0px 10px;
    &.column-layout {
      width: 40%;
    }
    .map-container {
      img {
        border-radius: 7px;
        width: 100%;
      }
    }
    .members {
      background-color: #3b3b3b;
      border-radius: 7px;
      color: white;
      width: 100%;
      p {
        margin: 0;
        text-align: left;
        padding-left: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 7px 7px 0px 0px;
        box-shadow: 0px 0px 20px -10px rgb(5, 5, 5);
      }
      .members-img-container {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        padding: 5px;
        img {
          border-radius: 25px;
          width: 50px;
          margin: 5px;
        }
      }
    }
  }
}
</style>
