<template>
  <div v-if="partyToSave" class="event-add-container">
    <section class="edit-party">
      <h1>{{pageTitle}}</h1>
      <div class="form-container">
        <form @submit.prevent="saveParty">
          <!-- <pre>{{partyToSave}}</pre> -->
          <div>
            <input
              type="text"
              v-model="partyToSave.name"
              placeholder="Party Title"
            />
          </div>
          <div>
            <input type="text" placeholder="Party Location" v-model="partyToSave.location.name" />
          </div>
          <br />
          <div class="date-box">
            <datetime
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

          <div class="date-box">
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
          <br />

          <div class="flex column-layout">
            <input type="text" placeholder="Music Types" v-model="partyToSave.extraData.musicTypes" />
            <input type="text" placeholder="Party Types" v-model="partyToSave.extraData.partyTypes" />
            <input type="number" placeholder="Enter Fee" v-model="partyToSave.fee" />
          </div>
          <br />
          <textarea placeholder="Description" rows="4" v-model="partyToSave.desc" />

          <div class="add-event-buttons-container">
            <button @click="saveParty">Save</button>
            <button @click="back">Cancel</button>
            <button @click="openWidget" class="cloudinary-button">
              Upload files
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
import PartyService from '@/services/PartyService.js'
const uploadWidget = cloudinary.createUploadWidget(
  {
    cloudName: 'partytime',
    uploadPreset: 'partyTime',
  },
  (error, result) => {
    if (!error && result && result.event === 'success') {
      console.log('Done! Here is the image info: ', result.info)
    }
  },
)
import { Datetime } from "vue-datetime";
import { DateTime } from "luxon";
import "vue-datetime/dist/vue-datetime.css";
import dateCmp from "./date.cmp.vue";

export default {
  name: 'party-edit',
  props: {
    party: {
      type: Object,
    },
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
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
    }
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
      uploadWidget.open()
    },
    back() {
      this.$router.push('/party-app')
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
      let partyId = this.$route.params.id
      if (partyId) {
        this.isEdit = true;
        PartyService.getById(partyId).then(party => {
          console.log("party:", party);
          this.partyToSave = JSON.parse(JSON.stringify(party));
        });
      } else {
        this.isEdit = false;
        let emptyParty = this.$store.getters.emptyParty;
        this.partyToSave = { ...emptyParty };
      }
    },
  },
  created() {
    this.loadParty()
  },
}
</script>

<style lang="scss" scoped>
.event-add-container {
  height: 100vh;
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
    .form-container {
      .add-event-buttons-container {
        margin-top: 10px;
        margin-top: 10px;
        display: flex;
        justify-content: space-evenly;
      }
    }
  }
}
.outline-box {
  margin-bottom: 6px;
  background-color: #303030;
  border-radius: 10px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: white;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

button {
  background-color: black;
  background-color: black;
  padding: 9px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

@media screen and (min-width: 520px) {
  .edit-party {
    width: 50%;
  }
}
</style>
