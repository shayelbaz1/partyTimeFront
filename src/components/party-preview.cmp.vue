// import {eventBus,SHOW_MSG} from '../services/eventBus.service.js'
<template>
  <section class="party-preview">
    <div class="box-card" @click="routeToDetails(party._id)">
      <div class="img-box">
        <img class="img-backround" :src="party.imgUrl" />
        <img class="img-front" :src="party.imgUrl" />
      </div>

      <div class="text-box">
        <div class="heart-box" @click.stop="signalAddLike(party)">
          <i class="fas fa-heart"></i>
          <p>{{ party.extraData.likes.length }}</p>
        </div>

        <div class="preview-party-name">
          <h1 class="name">{{ party.name }}</h1>
          <p class="location">{{ party.location.name }} {{ `${km()}km away` }}</p>
        </div>
        <p class="from">{{ party.startDate | moment('from') }} | {{ fee }}</p>
        <p class="time">{{ party.startDate | moment('DD/MM/YYYY • HH:mm A') }}</p>
        <div class="types flex">
          <p v-for="(type, idx) in party.extraData.partyTypes" :key="idx">{{ type }}</p>
        </div>

        <div v-if="isCurrUserCreator || loggedInUser.isAdmin" class="btns-actions-box">
          <el-button @click.stop="routeToEdit(party._id)" type="text">
            <i class="far fa-edit"></i>
          </el-button>

          <el-button @click.stop="signalDelete(party._id)" type="text">
            <i class="far fa-trash-alt trash"></i>
          </el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DistanceService from "../services/Distance.service.js";
export default {
  name: "party-preview",
  props: {
    party: {
      type: Object
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    fee() {
      if (this.party.fee === 0) {
        return "FREE";
      } else {
        return "$" + this.party.fee;
      }
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    isCurrUserCreator() {
      return this.party.extraData.createdBy._id === this.loggedInUser._id;
    }
  },
  methods: {
    km() {
      const userLocation = this.userPlace();
      const { lat, lng } = userLocation.pos;
      return DistanceService.getDistanceFromLatLonInKm(
        lat,
        lng,
        this.party.location.lat,
        this.party.location.lng
      );
    },
    userPlace() {
      return this.$store.getters.place;
    },
    signalDelete(partyId) {
      this.$emit("deleteParty", partyId);
    },
    signalAddLike(party) {
      // Deep copy
      let currParty = JSON.parse(JSON.stringify(party));
      const { _id, imgURL, username } = { ...this.loggedInUser };
      const userToAdd = { _id, imgURL, username };
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
      this.$store.dispatch({ type: "saveParty", party: currParty });
      // EventBus of Socket
      // SocketService.emit("party liked", {currUser: userToAdd,party: party});

      // this.$emit("addLike", party);
    },
    routeToEdit(id) {
      this.$router.replace("party-app/edit/" + id);
    },
    routeToDetails(id) {
      this.$router.replace("/party-app/details/" + id);
    },
    remove(id) {
      this.$store
        .dispatch({ type: "removeParty", id: id })
        .then(() => {
          // eventBus.$emit(SHOW_MSG, {txt: `Deleted`, type: 'success'})
        })
        .catch(err => {
          // eventBus.$emit(SHOW_MSG, {txt: `Cannot delete ${id}`, type: 'danger'})
        });
    }
  }
};
</script>

<style lang="scss">
.party-preview {
  width: 100%;
  color: black;
  p {
    margin: 0;
  }
  .box-card {
    cursor: pointer;
    display: flex;
    width: fit-content;
    text-align: left;
    width: 96%;
    margin: 0px auto;
    margin-bottom: 10px;
    background: #303030;
    border: none;
    padding: 0;
    display: flex;
    height: 200px;
    color: white;
    box-shadow: 0 0 12px -8px black;
    border-radius: 7px;

    &:active {
      box-shadow: none;
    }
    .img-box {
      background-color: rgb(0, 0, 0);
      width: 50%;
      min-width: 180px;
      border-radius: 7px;
      display: flex;
      justify-content: center;
      position: relative;
      height: 100%;
      .img-backround {
        border-radius: 7px;
        opacity: 0.3;
        filter: blur(15px);
        // z-index: 1;
        position: absolute;
      }
      .img-front {
        width: 100%;
        object-fit: contain;

        // margin: auto;
      }
    }
    .text-box {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      padding-left: 10px;
      padding-bottom: 10px;
      .preview-party-name {
        padding-right: 53px;
      }
      h1 {
        margin: 0px;
        margin-top: 20px;
        padding: 0;
      }
      .types {
        flex-wrap: wrap;
        p {
          padding: 0px 5px;
          color: #c5c5c5;
          &:not(:last-of-type) {
            border-right: 1px solid #c5c5c5;
            &:first-of-type {
              padding-left: 0;
            }
          }
        }
      }
      .heart-box {
        position: absolute;
        right: 0;
        text-align: center;
        margin-top: 20px;
        margin-right: 20px;
        i {
          font-size: 1.7rem;
          color: #c1272d;
        }
        p {
          margin: 0;
          // position: absolute;
          // top: 3px;
          // left: 9px;
        }
      }
      .btns-actions-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        // display: block;
        position: absolute;
        float: right;
        right: 0;
        bottom: 0;
        // background: sandybrown;
        margin-bottom: 20px;
        margin-right: 22px;
        .el-button + .el-button {
          margin: 0;
        }
        i {
          color: white;
          transition: 0.3s;
          font-size: 1.2rem;
          &:hover {
            color: #8e0000;
          }
        }
        .trash {
          padding-right: 4px;
        }
        // background: khaki;
      }
    }
  }
}

@media screen and (max-width: 400px) {
  .box-card {
    // height: 154px !important;

    .text-box {
      font-size: 0.9rem;
      .btns-actions-box {
        margin-bottom: 0px !important;
      }
    }
  }
}
</style>
