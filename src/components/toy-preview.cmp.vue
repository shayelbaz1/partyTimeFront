// import {eventBus,SHOW_MSG} from '../services/eventBus.service.js'
<template>
  <section class="toy-preview">
    <div class="box-card" @click="routeToDetails(toy._id)">
      <div class="img-box">
        <img class="img-backround" src="../assets/beach.jpg" />
        <img class="img-front" src="../assets/beach.jpg" />
      </div>

      <div class="text-box">
        <div class="heart-box">
          <i class="fas fa-heart"></i>
          <p>3</p>
        </div>

        <h1>Day Party</h1>
        <p>Baga, Club Habbana</p>
        <p>12 PM | FREE</p>
        <p>House | Breach Party</p>

        <div class="btns-actions-box">
          <el-button @click.stop="routeToEdit(toy._id)" type="text">
            <i class="far fa-edit"></i>
          </el-button>

          <el-button @click.stop="remove(toy._id)" type="text">
            <i class="far fa-trash-alt trash"></i>
          </el-button>
        </div>
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
.toy-preview {
  width: 100%;
  p {
    margin: 0;
  }
  .box-card {
    cursor: pointer;
    display: flex;
    width: fit-content;
    text-align: left;
    width: 90%;
    margin: 0px auto;
    margin-bottom: 10px;
    background: #303030;
    border: none;
    padding: 0;
    display: flex;
    height: 200px;
    color: white;
    box-shadow: 0 0 12px -8px black;
    border-radius: 7px;

    &:active {
      box-shadow: none;
    }
    .img-box {
      background-color: rgb(0, 0, 0);
      width: 50%;
      min-width: 180px;
      border-radius: 7px;
      display: flex;
      justify-content: center;
      position: relative;
      .img-backround {
        border-radius: 7px;
        height: 100%;
        width: 100%;
        opacity: 0.2;
        filter: blur(6px);
        z-index: 1;
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
    .text-box {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-left: 10px;
      padding-bottom: 10px;
      .heart-box {
        position: absolute;
        right: 0;
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
      .btns-actions-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        // display: block;
        position: absolute;
        float: right;
        right: 0;
        bottom: 0;
        // background: sandybrown;
        margin-bottom: 20px;
        margin-right: 22px;
        .el-button + .el-button {
          margin: 0;
        }
        i {
          color: white;
          transition: 0.3s;
          font-size: 1.2rem;
          &:hover {
            color: #8e0000;
          }
        }
        .trash {
          padding-right: 4px;
        }
        // background: khaki;
      }
    }
  }
}
</style>