<template>
  <div class="event-add-container">
    <section class="edit-toy">
      <h1>Create Party</h1>
      <div class="form-container">
        <form @submit.prevent="saveToy">
          <div>
            <input
              type="text"
              v-model="toyToSave.name"
              placeholder="Party Title"
            />
          </div>
          <br />
          <div>
            <input
              type="text"
              v-model="toyToSave.price"
              placeholder="Party Location"
            />
          </div>
          <br />
          <input
            v-model="toyToSave.createdAt"
            type="date"
            placeholder="Pick a day"
            :picker-options="pickerOptions"
          />
          <input
            v-model="toyToSave.createdAt"
            type="date"
            placeholder="Pick a day"
            :picker-options="pickerOptions"
          />
          <br />
          <input type="text" placeholder="Music Type" />
          <input type="text" placeholder="Party Type" />
          <input type="number" placeholder="Entry fee 6$" />
          <div class="add-event-buttons-container">
            <button @click="saveToy">Save</button>
            <button @click="back">Cancel</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import ToyService from '@/services/ToyService.js'

export default {
  name: 'toy-edit',
  props: {
    toy: {
      type: Object,
    },
  },
  data() {
    return {
      toyToSave: {},
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
  methods: {
    back() {
      this.$router.push('/toy-app')
    },
    saveToy() {
      if (this.toyToSave.name === '') return
      if (this.toyToSave.price === '') return
      this.$store
        .dispatch({ type: 'saveToy', toy: this.toyToSave })
        .then((toy) => {
          console.log('Saved toy:', toy)
          this.$router.push('/toy-app')
        })
    },
    loadToy() {
      let toyId = this.$route.params.id
      if (toyId) {
        ToyService.getById(toyId).then((toy) => {
          this.toyToSave = JSON.parse(JSON.stringify(toy))
        })
      } else {
        let emptyToy = this.$store.getters.emptyToy
        this.toyToSave = { ...emptyToy }
      }
    },
  },
  created() {
    this.loadToy()
  },
}
</script>

<style lang="scss" scoped>
.event-add-container {
  height: 100vh;
  background-color: #303030;
}
.edit-toy {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 90%;
  // border: 1px solid black;
  margin: 0px auto;
  // margin-top: 10px;
  padding: 20px;
  border-radius: 7px;
  color: white;
  // background-color: #f5f5f5;
  // box-shadow: 0px 0px 1000px -50px black;
}

input {
  margin-bottom: 6px;
  background-color: #303030;
  border-radius: 10px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

.add-event-buttons-container {
  margin-top: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
}

button {
  background-color: black;
  background-color: black;
  padding: 9px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

// button:hover {
//   padding: 18px;
// }

@media screen and (min-width: 520px) {
  .edit-toy {
    width: 50%;
  }
}
</style>
