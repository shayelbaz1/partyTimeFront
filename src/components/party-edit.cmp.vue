<template>
  <div v-if="partyToSave" class="event-add-container">
    <div class="img-box" @click="openWidget" title="Upload Image">
      <img class="img-backround" :src="partyToSave.imgUrl" title="Upload Image" />
      <img class="img-front" :src="partyToSave.imgUrl" title="Upload Image" />
    </div>

    <section class="edit-party">
      <h1>{{pageTitle}}</h1>
      <div class="form-container">
        <form @submit.prevent="saveParty">
          <!-- <pre>{{partyToSave}}</pre> -->
          <div>
            <p class="border-title">Party Title</p>
            <input
              class="outline-box"
              type="text"
              v-model="partyToSave.name"
              placeholder="Party Title"
            />
          </div>
          <br />
          <div>
            <p class="border-title">Party Location</p>
            <input
              class="outline-box"
              type="text"
              placeholder="Party Location"
              v-model="partyToSave.location.name"
            />
          </div>
          <br />

          <div class="flex date-btns-box">
            <div class="date-box outline-box">
              <p class="border-title date">Party Start Time</p>
              <datetime
                input-class="date-time outline-box"
                class="start-date-time"
                type="datetime"
                v-model="partyToSave.startDate"
                format="dd/MM/yyyy HH:mm"
                use24-hour
                :minute-step="15"
                :phrases="{ok: 'Continue', cancel: 'Exit'}"
                value-zone="Israel"
                placeholder="Start time"
              ></datetime>
            </div>
            <div class="space-box"></div>
            <div class="date-box outline-box">
              <p class="border-title date">Party End Time</p>
              <datetime
                class="end-date-time"
                type="datetime"
                v-model="partyToSave.endDate"
                format="dd/MM/yyyy HH:mm"
                use24-hour
                :minute-step="15"
                :phrases="{ok: 'Continue', cancel: 'Exit'}"
                value-zone="Israel"
                placeholder="End time"
              ></datetime>
            </div>
          </div>
          <br />

          <div>
            <p class="border-title">Music Types</p>
            <input
              class="outline-box"
              type="text"
              placeholder="Music Types"
              v-model="partyToSave.extraData.musicTypes"
            />
          </div>
          <br />
          <div>
            <p class="border-title">Party Types</p>
            <input
              class="outline-box"
              type="text"
              placeholder="Party Types"
              v-model="partyToSave.extraData.partyTypes"
            />
          </div>
          <br />
          <div>
            <p class="border-title">Party Fee</p>
            <input
              class="outline-box"
              type="number"
              placeholder="Enter Fee"
              v-model="partyToSave.fee"
            />
          </div>
          <br />
          <div>
            <p class="border-title">Party Description</p>
            <textarea
              class="outline-box"
              placeholder="Description"
              rows="3"
              v-model="partyToSave.desc"
            />
          </div>

          <div class="btns-box">
            <button class="btn cancel" @click.prevent="back">
              <i class="far fa-window-close"></i>
              Cancel
            </button>
            <button class="btn save" @click.prevent="saveParty">
              <i class="far fa-save"></i>
              Save
            </button>
          </div>
        </form>

        <!-- <pre>{{formatDate}}</pre> -->
        <!-- <pre>{{partyToSave}}</pre> -->
      </div>
    </section>
  </div>
</template>

<script>
import PartyService from "../services/PartyService.js";
import { Datetime } from "vue-datetime";
import { DateTime } from "luxon";
import "vue-datetime/dist/vue-datetime.css";
import dateCmp from "./date.cmp.vue";

export default {
  name: "party-edit",
  props: {
    party: {
      type: Object
    }
  },
  components: {
    Datetime,
    dateCmp
  },
  data() {
    return {
      isEdit: true,
      startDate: "",
      endDate: "",
      partyToSave: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "Today",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "Yesterday",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "A week ago",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  computed: {
    pageTitle() {
      if (this.isEdit) {
        return "Edit Party";
      } else {
        return "Create Party";
      }
    },
    formatDate() {
      return DateTime.fromISO(this.startDate).toObject();
      return DateTime.fromISO(this.endDate).toObject();
    }
  },
  methods: {
    openWidget() {
      const uploadWidget = cloudinary.createUploadWidget(
        {
          cloudName: "partytime",
          uploadPreset: "partyTime"
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            this.partyToSave.imgUrl = result.info.url;
          }
        }
      );
      uploadWidget.open();
    },
    back() {
      this.$router.push("/party-app");
    },
    async saveParty() {
      if (this.partyToSave.name === "") return;
      if (this.partyToSave.price === "") return;
      const party = await this.$store.dispatch({
        type: "saveParty",
        party: this.partyToSave
      });
      this.$router.push("/party-app");
    },
    loadParty() {
      let partyId = this.$route.params.id;
      if (partyId) {
        this.isEdit = true;
        PartyService.getById(partyId).then(party => {
          console.log("party:", party);
          this.partyToSave = JSON.parse(JSON.stringify(party));
        });
      } else {
        this.isEdit = false;
        let emptyParty = this.$store.getters.emptyParty;
        this.partyToSave = JSON.parse(JSON.stringify(emptyParty));
      }
    }
  },
  created() {
    this.loadParty();
  }
};
</script>

<style lang="scss" scoped>
.event-add-container {
  // height: 100vh;
  background-color: #303030;
  // color: white;
  .edit-party {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 90%;
    margin: 0px auto;
    padding: 20px;
    border-radius: 7px;
    color: white;
  }
  .outline-box {
    margin-bottom: 6px;
    background-color: #303030;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: white;
    display: inline-block;
    font-size: inherit;
    // height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }

  button {
    background-color: black;
    padding: 10px 0px;
    width: 50%;
    color: white;
    border-radius: 5px;
    font-size: 1.4rem;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background-color: #c1272d;
    }
  }
  @media screen and (max-width: 590px) {
    button {
      font-size: 1.1rem;
    }
  }
  .img-box {
    cursor: pointer;
    background-color: black;
    width: 100%;
    height: 40vh;
    min-width: 180px;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    position: relative;
    .img-backround {
      border-radius: 7px;
      height: 100%;
      width: 100%;
      opacity: 0.7;
      filter: blur(8px);
      position: absolute;
    }
    .img-front {
      position: absolute;
      // background-color: ivory;
      // width: 100%;
      height: 100%;
      position: absolute;

      // margin: auto;
    }
  }
  .form-container {
    .btns-box {
      margin-top: 10px;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      // justify-content: space-evenly;
      button {
        margin-left: 5px;
      }
    }
  }
}

@media screen and (min-width: 520px) {
  .edit-party {
    width: 50%;
  }
}

.border-title {
  position: absolute;
  // margin: 0px;
  margin-top: -9px;
  margin-left: 12px;
  background: #303030;
  padding: 0px 6px;
  font-size: 0.8rem;
  color: silver;
  &.date {
    margin-top: -21px;
    margin-left: -9px;
    height: 25px;
  }
}

.space-box {
  height: 15px;
  width: 15px;
}

@media screen and (max-width: 590px) {
  .date-btns-box {
    flex-wrap: wrap;
  }
}
</style>
