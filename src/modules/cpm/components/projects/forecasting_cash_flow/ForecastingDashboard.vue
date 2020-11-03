<template>
  <div
    id="dashboard-container"
    class="dashboard"
  >
    <v-layout class="mb-5">
      <v-flex xs12>
        <forecasting-gantt />
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs11>
        <forecasting-chart />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ForecastingChart from './ForecastingChart'
import ForecastingGantt from './ForecastingGantt'
export default {
  name: 'ForecastingDashboard',

  components: {
    ForecastingChart,
    ForecastingGantt
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    overflow: auto;
    background-color: white;
  }
</style>
