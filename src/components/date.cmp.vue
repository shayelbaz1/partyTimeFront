<template>
  <div class="block">
    <!-- <span class="demonstration">Start date time 12:00:00, end date time 08:00:00</span> -->
    <el-date-picker
      v-model="value1"
      type="datetimerange"
      align="right"
      start-placeholder="Start Date"
      end-placeholder="End Date"
      :default-time="['12:00:00', '08:00:00']"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: ""
    };
  }
};
</script>