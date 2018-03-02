<template>
  <div >
    <pie-chart :chart-data="chartData"></pie-chart>
  </div>

</template>


<script>
import { Pie } from "vue-chartjs";
export default {
  extends: Pie,
  props: ["chartData", "options"],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, this.options);
  }
};
</script>

