// import {eventBus,SHOW_MSG} from '../services/eventBus.service.js'
<template>
  <section>
    <div class="box-card" @click="routeToDetails(toy._id)">
      <img :src="`https://robohash.org/${toy._id}.png`" />
      <div class="text-box">
        <div>
          <div class="heart-box">
            <i class="fas fa-heart"></i>
            <p>3</p>
          </div>
          <h1>Day Party</h1>
          <p>Baga, Club Habbana</p>
        </div>
        <p>12 PM | FREE</p>
        <p>House | Breach Party</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "toy-preview",
  props: {
    toy: {
      type: Object
    }
  },
  methods: {
    routeToEdit(id) {
      this.$router.replace("toy-app/edit/" + id);
    },
    routeToDetails(id) {
      console.log("id:", id);
      this.$router.replace("toy-app/details/" + id);
    },
    remove(id) {
      this.$store
        .dispatch({ type: "removeToy", id: id })
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
.box-card {
  cursor: pointer;
  display: flex;
  width: fit-content;
  text-align: left;
  margin-bottom: 10px;
  background: #303030;
  border: none;
  padding: 0;
  display: flex;
  width: 100%;
  color: white;
  box-shadow: 0 0 12px -8px black;
  border-radius: 7px;
  &:active {
    box-shadow: none;
  }
  img {
    width: 40%;
    margin-bottom: 8px;
    margin-bottom: 0;
  }
  .text-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 10px;
    .heart-box {
      // display: inline-block;
      position: relative;
      float: right;
      text-align: center;
      margin-top: 20px;
      margin-right: 20px;
      i {
        font-size: 2rem;
        color: #8e0000;
      }
      p {
        margin: 0;
      }
    }
  }
}
</style>