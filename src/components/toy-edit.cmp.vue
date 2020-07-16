<template>
  <section class="edit-toy">
    <h1>Edit Toy</h1>
    <form @submit.prevent="saveToy">
      <div>
        Party Title:
        <el-input type="text" v-model="toyToSave.name" placeholder="Party Title" />
      </div>
      <br />
      <div>
        Location
        <el-input type="text" v-model="toyToSave.price" placeholder="Party Location" />
      </div>
      <br />
      <br />
      <br />
      <br />
      <div class="block">
          <h3>Starts From</h3>
          <el-date-picker
            v-model="toyToSave.createdAt"
            type="date"
            placeholder="Pick a day"
            :picker-options="pickerOptions"
          ></el-date-picker>
          <h3>Ends At</h3>
          <el-date-picker
            v-model="toyToSave.createdAt"
            type="date"
            placeholder="Pick a day"
            :picker-options="pickerOptions"
          ></el-date-picker>
      </div>
      <h3>Music Type</h3>
      <select name="" id="">
        <option value="">Death Metal</option>
        <option value="">Punk</option>
      </select>
      <h3>Party Type</h3>
      <select name="" id="">
         <option value="">Rave</option>
         <option value="">House Party</option>
         <option value="">Rock Party</option>
         <option value="">Club Party</option>
      </select>
      <div>
        <el-button @click="saveToy">Save</el-button>
        <el-button @click="back">Cancel</el-button>
      </div>
    </form>
  </section>
</template>

<script>
import ToyService from "@/services/ToyService.js";

export default {
  name: "toy-edit",
  props: {
    toy: {
      type: Object
    }
  },
  data() {
    return {
      toyToSave: {},
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
  methods: {
    back() {
      this.$router.push("/toy-app");
    },
    saveToy() {
      if (this.toyToSave.name === "") return;
      if (this.toyToSave.price === "") return;
      this.$store
        .dispatch({ type: "saveToy", toy: this.toyToSave })
        .then(toy => {
          console.log("Saved toy:", toy);
          this.$router.push("/toy-app");
        });
    },
    loadToy() {
      let toyId = this.$route.params.id;
      if (toyId) {
        ToyService.getById(toyId).then(toy => {
          this.toyToSave = JSON.parse(JSON.stringify(toy));
        });
      } else {
        let emptyToy = this.$store.getters.emptyToy;
        this.toyToSave = { ...emptyToy };
      }
    }
  },
  created() {
    this.loadToy();
  }
};
</script>

<style lang="scss" scoped>
.edit-toy {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 90%;
  // border: 1px solid black;
  margin: 0px auto;
  margin-top: 10px;
  padding: 20px;
  border-radius: 7px;
  background-color: #f5f5f5;
  box-shadow: 0px 0px 1000px -50px black;
}
@media screen and (min-width: 520px) {
  .edit-toy {
    width: 50%;
  }
}
</style>