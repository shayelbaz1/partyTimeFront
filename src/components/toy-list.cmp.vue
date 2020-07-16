<template>
  <section class="toy-list">
    <!-- <h2>Toys</h2> -->
    <button @click="routeToEdit" class="add">
      <i class="fa fa-plus my-float"></i>
    </button>
    <div class="flex column-layout space-around">
      <toy-preview v-for="toy in toys" :key="toy._id" :toy="toy"></toy-preview>
    </div>
  </section>
</template>

<script>
import toyPreview from "../components/toy-preview.cmp.vue";

export default {
  name: "toy-list",
  props: {
    toys: {
      type: Array
    }
  },
  methods: {
    routeToEdit() {
      this.$router.replace("toy-app/edit/");
    }
  },
  components: {
    toyPreview
  }
};
</script>

<style lang="scss">
button.add {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #850000;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px rgb(0, 0, 0);
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  z-index: 1;
  &:active {
    box-shadow: none;
  }
}
</style>