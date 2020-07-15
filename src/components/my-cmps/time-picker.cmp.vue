<template>
  <div class="time-picker flex column">
    <h2>Set a Time Remainder</h2>
    <div class="flex align-center justify-center">
      <div class="hours-container">
        <button @click="changeHours(1)">
          <i class="fas fa-chevron-up"></i>
        </button>
        <div class="hours flex align-center justify-center">{{ time.hours }}</div>
        <button @click="changeHours(-1)">
          <i class="fas fa-chevron-down"></i>
        </button>
      </div>
      <div class="seperator">:</div>
      <div class="minutes-container">
        <button @click="changeMinutes(1)">
          <i class="fas fa-chevron-up"></i>
        </button>
        <div class="minutes flex align-center justify-center">{{ time.minutes }}</div>
        <button @click="changeMinutes(-1)">
          <i class="fas fa-chevron-down"></i>
        </button>
      </div>
      <div class="format-container">
        <button @click="toggleFormat">
          <i class="fas fa-chevron-up"></i>
        </button>
        <div class="format flex align-center justify-center">{{ time.format }}</div>
        <button @click="toggleFormat">
          <i class="fas fa-chevron-down"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: {
        hours: 7,
        minutes: 55,
        format: "AM"
      }
    };
  },
  methods: {
    settime(time) {
      this.time = time;
      this.$emit("input", time);
    },
    toggleFormat() {
      if (this.time.format === "AM") this.time.format = "PM";
      else this.time.format = "AM";
    },
    changeMinutes(diff) {
      if (this.time.minutes === 0 && diff < 0) return (this.time.minutes = 59);
      else if (this.time.minutes === 59 && diff > 0)
        return (this.time.minutes = 0);
      else this.time.minutes += diff;
    },
    changeHours(diff) {
      if (this.time.hours === 0 && diff < 0) return (this.time.hours = 12);
      else if (this.time.hours === 12 && diff > 0) return (this.time.hours = 0);
      else this.time.hours += diff;
    }
  }
};
</script>

<style lang="scss" scoped>
.time-picker {
  text-align: center;
  border-radius: 7px;
  background-color: #fff;
  margin: 1rem;
  font-size: 1.2rem;
  h2 {
    font-size: 1.2rem;
    text-decoration: underline;
  }
  button {
    background-color: transparent;
    border: none;
    i {
      color: black;
    }
  }
}
</style>