// import {eventBus,SHOW_MSG} from '../services/eventBus.service.js'
<template>
  <section>
    <el-card class="box-card">
      <img :src="`https://robohash.org/${toy._id}.png`" />
      <div class="text item">
        <h1>Day Party</h1>
        <p>Baga, Club Habbana</p>
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
.el-card {
  display: flex;
  width: fit-content;
  .el-card__body {
    background: rgb(77, 77, 77);
    padding: 0;
    img {
      width: 50%;
      margin-bottom: 8px;
      margin-bottom: 0;
    }
  }
  .stock {
    background: lightgrey;
    border: 1px solid black;
    border-radius: 7px;
    width: fit-content;
    padding: 2px 7px;
    margin: auto;
    color: red;
    &.inStock {
      color: green;
    }
  }
}
.actions {
  text-align: center;
}
.actions button {
  margin: 4px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 200px;
  margin: 10px;
}
i {
  font-size: 1.3rem;
}
</style>