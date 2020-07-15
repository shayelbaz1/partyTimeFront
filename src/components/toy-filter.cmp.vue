<template>
  <section>
    <p>Filter</p>
    <!-- <input @keyup="filterOn" v-model="filterBy.txt" type="text" placeholder="Search toys" /> -->

    <el-input
      class="search"
      prefix-icon="el-icon-search"
      @input="filterOn"
      placeholder="Search toys"
      v-model="filterBy.txt"
    ></el-input>
    <el-button type="primary" @click="clearAll">Clear All</el-button>
    <br />

    <el-select v-model="filterBy.sort" @change="filterOn">
      <el-option label="Name" value="name"></el-option>
      <el-option label="Price" value="price"></el-option>
      <el-option label="ID" value="_id"></el-option>
    </el-select>

    <el-select v-model="filterBy.order" placeholder="Select" @change="filterOn">
      <el-option label="Ascending" value="asc"></el-option>
      <el-option label="Descending" value="desc"></el-option>
    </el-select>

    <el-select v-model="filterBy.type" @change="filterOn">
      <el-option label="All Types" value></el-option>
      <el-option label="Funny" value="Funny"></el-option>
      <el-option label="Educational" value="Educational"></el-option>
    </el-select>

    <el-select v-model="filterBy.isInStock" @change="filterOn">
      <el-option label="All Items" value></el-option>
      <el-option label="In Stock" value="true"></el-option>
      <el-option label="Out of stock" value="false"></el-option>
    </el-select>
  </section>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  name: "toy-filter",
  data() {
    return {
      filterBy: {},
      email: ""
    };
  },
  components: {
    ValidationProvider
  },
  methods: {
    filterOn() {
      console.log("this.filterBy.isInStock:", this.filterBy.isInStock);
      this.$store.commit({
        type: "updateFilterBy",
        filterBy: { ...this.filterBy }
      });
      this.$store.dispatch({ type: "loadToys" });
    },
    clearAll() {
      this.filterBy.isInStock = "";
      this.filterBy.txt = "";
      this.filterBy.type = "";
      this.filterBy.order = "asc";
      this.filterOn();
    }
  },
  created() {
    const filter = this.$store.getters.filterBy;
    this.filterBy = { ...filter };
  }
};
</script>

<style lang="scss" scoped>
.el-select {
  margin: 5px 10px;
}
.el-button {
  margin: 0px 10px;
}
.el-input.search {
  width: 40%;
  margin-bottom: 10px;
}
</style>