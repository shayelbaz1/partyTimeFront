// import {eventBus,SHOW_MSG} from '../services/eventBus.service.js'
<template>
  <section class="party-preview">
    <!-- <pre>{{party}}</pre> -->
    <div class="box-card" @click="routeToDetails(party._id)">
      <div class="img-box">
        <img class="img-backround" :src="party.imgUrl" />
        <img class="img-front" :src="party.imgUrl" />
      </div>

      <div class="text-box">
        <div class="heart-box" @click.stop="signalAddLike(party)">
          <i class="fas fa-heart"></i>
          <p>{{party.likes}}</p>
        </div>

        <div>
          <h1>{{party.name}}</h1>
          <p>{{party.location.name}}</p>
        </div>
        <p>{{party.startDate | moment("from")}} | {{fee}}</p>
        <p>{{party.startDate | moment("DD/MM/YYYY")}}</p>
        <div class="types flex">
          <p v-for="(type,idx) in party.extraData.partyTypes" :key="idx">{{type}}</p>
        </div>

        <div class="btns-actions-box">
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
export default {
  name: "party-preview",
  props: {
    party: {
      type: Object
    }
  },
  data() {
    return {};
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
    signalDelete(partyId) {
      // console.log(partyId);
      this.$emit("deleteParty", partyId);
    },
    signalAddLike(party) {
      // console.log(partyId);
      this.$emit("addLike", party);
    },
    routeToEdit(id) {
      this.$router.replace("party-app/edit/" + id);
    },
    routeToDetails(id) {
      console.log("id:", id);
      this.$router.push("party-app/details/" + id);
    },
    remove(id) {
      this.$store
        .dispatch({ type: "removeParty", id: id })
        .then(() => {
          // eventBus.$emit(SHOW_MSG, {txt: `Deleted`, type: 'success'})
          console.log("deleted");
        })
        .catch(err => {
          console.log("ERROR, cannot delete ", id, err);
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
    width: 90%;
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
        opacity: 0.7;
        filter: blur(8px);
        // z-index: 1;
        position: absolute;
      }
      .img-front {
        position: absolute;
        // background-color: ivory;
        // width: 100%;
        // height: 100%;
        position: absolute;

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
      h1 {
        margin: 0px;
        margin-top: 20px;
        padding: 0;
      }
      .heart-box {
        position: absolute;
        right: 0;
        text-align: center;
        margin-top: 20px;
        margin-right: 20px;
        i {
          font-size: 2rem;
          color: #c1272d;
        }
        p {
          margin: 0;
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
</style>