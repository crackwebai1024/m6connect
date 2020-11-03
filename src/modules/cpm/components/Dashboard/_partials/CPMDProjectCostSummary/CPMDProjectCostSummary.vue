<template>
  <v-flex
    style="min-height: 300px"
    xs12
  >
    <v-card
      class="elevation-0"
      color="#3374BD"
    >
      <v-card-title class="headline white--text">
        Cost Summary
      </v-card-title>

      <v-card-text class="white">
        <v-data-table
          :headers="headers"
          :items="companiesCpmProjects"
          :rows-per-page-items="[]"
        >
          <template v-slot:items="{ index, item }">
            <c-p-m-d-project-cost-summary-item
              :key="(new Date()).getTime() + index"
              :item="item"
            />
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import CPMDProjectCostSummaryItem from './CPMDProjectCostSummaryItem'

export default {
  name: 'CPMDProjectCostSummary',

  components: { CPMDProjectCostSummaryItem },

  props: {
    companiesCpmProjects: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    headers: [
      { text: '', sortable: false },
      { text: 'Project', value: 'title' },
      { text: 'Start Date', value: 'startDate' },
      { text: 'End Date', value: 'endDate' },
      { text: 'Budget', value: 'totalBudgets' },
      { text: 'Commitments', value: 'totalCommitments' },
      { text: 'Spending', value: 'totalSpendings' },
      { text: 'Total Allocated', value: 'totalAllocated' },
      { text: 'PFC', value: 'totalCost' },
      { text: 'Variance', value: 'variance' },
      { text: 'Status', value: 'status' }
    ]
  })
}
</script>

