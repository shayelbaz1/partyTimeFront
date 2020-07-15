<template>
  <section>
    <h3>Toy Details</h3>
    <table border="1" v-if="toy">
      <tr>
        <th>id</th>
        <th>name</th>
        <th>price</th>
        <th>type</th>
        <td>Date Added</td>
        <th>In Stock</th>
      </tr>
      <tr>
        <td>
          <h3>{{toy._id}}</h3>
        </td>
        <td>
          <h3>{{toy.name}}</h3>
        </td>
        <td>
          <h3>{{toy.price}}</h3>
        </td>
        <td>
          <h3>{{toy.type}}</h3>
        </td>
        <td>{{toy.createdAt | moment("DD/MM/YYYY")}}</td>
        <td>
          <h3>{{toy.inStock}}</h3>
        </td>
      </tr>
    </table>
    <el-button @click="back" class="btn-back">
      <div class="content">
        <i class="fas fa-arrow-left"></i>
        <h2>Back</h2>
      </div>
    </el-button>

    <review-list v-if="toy"></review-list>
    <chat-page v-if="toy" :toy="toy"></chat-page>
  </section>
</template>>
        
<script>
import ToyService from "@/services/ToyService.js";
import reviewList from "@/components/review-list.vue";
import ChatPage from "@/views/ChatPage.vue";

export default {
  name: "toy-details",
  components: {
    reviewList,
    ChatPage
  },
  data() {
    return {
      toy: null
    };
  },
  methods: {
    back() {
      this.$router.push("/toy-app");
    },
    async loadToy() {
      let toyId = this.$route.params.id;
      this.toy = await ToyService.getById(toyId);
    }
  },
  created() {
    this.loadToy();
  }
};
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