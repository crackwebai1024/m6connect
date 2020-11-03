<template>
  <m6-card-dialog title="Forecasts">
    <v-layout wrap>
      <v-flex xs12>
        <forecasts-table
          :tasks="tasks"
        />
      </v-flex>
      <v-flex xs12>
        <forecasts-chart-budgets-by-month
          v-if="tasks.length"
          :tasks="tasks"
        />
      </v-flex>
      <v-flex xs12>
        <forecasts-chart-gantt
          v-if="tasks.length"
          :tasks="tasks"
        />
      </v-flex>
    </v-layout>
  </m6-card-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ForecastsChartBudgetsByMonth from './ForecastsChartBudgetsByMonth'
import ForecastsChartGantt from './ForecastsChartGantt'
import ForecastsTable from './ForecastsTable'
export default {
  name: 'ForecastsPanel',

  components: {
    ForecastsChartBudgetsByMonth,
    ForecastsChartGantt,
    ForecastsTable
  },

  computed: {
    ...mapGetters('cpm/planned/forecasts', [
      'tasks'
    ])
  },

  mounted() {
    const projectId = this.$route.params.id
    this.getDefaultTasks({
      projectId
    })
  },

  methods: {
    ...mapActions('cpm/planned/forecasts', [
      'getDefaultTasks'
    ])
  }
}
</script>
