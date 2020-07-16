// import {eventBus,SHOW_MSG} from '../services/eventBus.service.js'
<template>
  <section>
    <el-card class="box-card">
      <img :src="`https://robohash.org/${toy._id}.png`" />
      <div class="text item">
        <h1>Day Party</h1>
        <p>Baga, Club Habbana</p>
        <p>12 PM | FREE</p>
        <p>House | Breach Party</p>
      </div>
    </el-card>
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
.el-card.box-card {
  display: flex;
  width: fit-content;
  text-align: left;
  margin-bottom: 10px;
  .el-card__body {
    background: rgb(77, 77, 77);
    padding: 0;
    display: flex;
    width: 100%;
    color: white;
    img {
      width: 50%;
      margin-bottom: 8px;
      margin-bottom: 0;
    }
  }
}
</style>