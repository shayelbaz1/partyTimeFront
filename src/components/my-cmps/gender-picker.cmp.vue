<template>
  <div class="gender-picker flex column">
    <h2>Choose Gender</h2>
    <button :class="{selected : gender === 'male'}" @click="setGender('male')">
      <i class="fas fa-mars"></i> Male
    </button>
    <button :class="{selected : gender === 'female'}" @click="setGender('female')">
      <i class="fas fa-venus"></i> Female
    </button>
    <button :class="{selected : gender === 'unknown'}" @click="setGender('unknown')">
      <i class="fas fa-question"></i> I'd rather not say
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gender: ""
    };
  },
  methods: {
    setGender(gender) {
      this.gender = gender;
    }
  }
};
</script>

<style  lang="scss" scoped>
.gender-picker {
  text-align: left;
  display: flex;
  flex-direction: column;
  h2 {
    text-decoration: underline;
  }
  button {
    border-radius: 7px;
    font-size: 1.1rem;
    text-align: left;
    padding: 10px;
    border: 1px solid snow;
    background: #43a1a1;
    i {
      margin-inline-end: 0.5rem;
    }
  }
  .selected {
    // background-color: #3d3d3d;
    color: rgb(255, 255, 255);
    background: #2b6666;
    outline: none;
    border: 1px solid black;
  }
}
</style>