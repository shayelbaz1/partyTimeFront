<template>
  <div class="color-picker flex column">
    <h2>Pick Color</h2>
    <div class="colors-container flex wrap">
      <span
        v-for="(color, idx) in colors"
        :key="idx"
        :style="{backgroundColor : color}"
        @click="setColor(color)"
        :class="{picked : color === pickedColor}"
      ></span>
    </div>
  </div>
</template>

<script>
const colors = require("nice-color-palettes");
const _ = require("lodash");

export default {
  data() {
    return {
      colors: _.flatten(colors).slice(0, 20),
      pickedColor: "69d2e7"
    };
  },
  methods: {
    setColor(color) {
      this.pickedColor = color;
      this.$emit("input", color);
    }
  }
};
</script>

<style lang="scss" scoped>
.color-picker {
  background-color: #fff;
  border-radius: 0.33rem;
  padding: 1rem;
  width: 18.5rem;
  h2 {
    text-transform: capitalize;
    margin-top: 0;
    text-decoration: underline;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    color: white;
    font-weight: bold;
    margin: 0.1rem;
    cursor: pointer;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
  }
  .picked {
    border: 2px solid black;
  }
}
</style>