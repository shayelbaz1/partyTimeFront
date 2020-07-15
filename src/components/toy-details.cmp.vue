<template>
  <section>
    <img
      src="https://scontent.ftlv6-1.fna.fbcdn.net/v/t1.0-9/107255262_4175881475786223_6622631941189874568_o.jpg?_nc_cat=102&_nc_sid=340051&_nc_ohc=11dSkftZ8ccAX_dGn7d&_nc_ht=scontent.ftlv6-1.fna&oh=007935eb17fff4684d2e15e1b860d229&oe=5F35758E"
    />
    <div class="event-desc-container">
      <h3>SATURDAY, JULY 18, 2020 AT 4 PM – 10 PM UTC+03</h3>
      <h1>Find The love of your life on zoom : 18.9</h1>
      <span>Online Event</span>
    </div>

    <div class="event-buttons-container">
      <button>Interested</button>
      <button>Going</button>
      <button>Invite</button>
      <button>copy</button>
      <button>X</button>
    </div>

    <el-button @click="back" class="btn-back">
      <div class="content">
        <i class="fas fa-arrow-left"></i>
        <h2>Back</h2>
      </div>
    </el-button>

    <!-- <review-list v-if="toy"></review-list>
    <chat-page v-if="toy" :toy="toy"></chat-page> -->
  </section>
</template>
>

<script>
import ToyService from '@/services/ToyService.js'
import reviewList from '@/components/review-list.vue'
import ChatPage from '@/views/ChatPage.vue'

export default {
  name: 'toy-details',
  components: {
    reviewList,
    ChatPage,
  },
  data() {
    return {
      toy: null,
    }
  },
  methods: {
    back() {
      this.$router.push('/toy-app')
    },
    async loadToy() {
      let toyId = this.$route.params.id
      this.toy = await ToyService.getById(toyId)
    },
  },
  created() {
    this.loadToy()
  },
}
</script>

<style lang="scss" scoped>
.btn-back {
  margin-top: 10px;
  padding: 0px 20px;
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h2 {
    margin-left: 10px;
  }
}
</style>
