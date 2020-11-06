<template>
  <v-dialog
    persistent
    :value="true"
    :width="400"
    @input="close"
  >
    <v-card>
      <v-card-title class="title">
        Current Monthly Forecast
      </v-card-title>
      <v-card-text>
        <money
          v-model="total"
          v-bind="money"
          color="blue"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          flat
          @click="close"
        >
          cancel
        </v-btn>
        <v-btn
          color="primary"
          flat
          @click="onSave"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { Money } from 'v-money'
export default {
  name: 'CurrentMonthlyForecastDialog',

  components: {
    Money
  },

  props: {
    monthlyForecastToUpdate: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      total: 0,
      money: {
        decimal: '.',
        thousands: ',',
        prefix: '$',
        precision: 2,
        masked: false
      }
    }
  },

  mounted() {
    if (this.monthlyForecastToUpdate) {
      this.total = this.$h.dg(this.monthlyForecastToUpdate, 'total', 0)
    }
  },

  methods: {
    ...mapActions('cpm/projects/forecasts', [
      'updateTaskCurrentMonthlyForecast'
    ]),
    onSave() {
      this.updateTaskCurrentMonthlyForecast({
        projectId: this.$route.params.id,
        total: this.total,
        taskId: this.monthlyForecastToUpdate.taskId,
        month: this.monthlyForecastToUpdate.month
      })
        .then(() => {
          this.$snotify.success(this.$t('alerts.successfullyUpdated'))
          this.close()
        })
        .catch(console.error)
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
