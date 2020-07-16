<template>
  <section>
    <img class="main-img"
      src="../assets/Capture.png"
    />
    <div class="details-container">
<div class="event-desc-container">
    <h2>DJ Play</h2>
      <h3>Saturday, May 1, Starting at 8PM</h3>
      <h1>Get ready for a night full of dancing, partying and botomless beer!</h1>
      <span>RSVP:</span>
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
    </div>
    

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
section{
  background-color: rgb(47, 47, 47);
}
.details-container{
  text-align: left;
}

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

.event-desc-container{
color: #e4e6eb;
}

.main-img{
  max-height: 360px;
}
</style>
