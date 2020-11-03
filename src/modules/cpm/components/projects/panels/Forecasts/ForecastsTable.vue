<template>
  <div>
    <v-layout
      class="ma-1"
      wrap
    >
      <v-flex shrink>
        <v-checkbox
          v-model="showPreviewsFY"
          class="ma-1 pa-0"
          color="blue-grey darken-1"
          hide-details
          :label="$t('cpm.forecasting.previousFiscalYears')"
        />
      </v-flex>
      <v-flex shrink>
        <v-checkbox
          v-model="showFuturesFY"
          class="ma-1 pa-0"
          color="light-blue darken-2"
          hide-details
          :label="$t('cpm.forecasting.futureFiscalYears')"
        />
      </v-flex>
    </v-layout>
    <m6-data-table
      v-if="budgetFiscalYear"
      disable-initial-sort
      :headers="headers"
      :items="tasksWithPositiveAmount"
    >
      <template
        v-slot:headers="headerProps"
      >
        <tr>
          <th
            v-if="previousFiscalYearsCollspan && showPreviewsFY"
            :class="previousFYStyles[0]"
            :colspan="previousFiscalYearsCollspan"
          >
            {{ $t('cpm.forecasting.previousFiscalYears') }}
          </th>
          <th
            :class="headerStyles[0]"
            :colspan="currentFiscalYearCollspan"
          >
            {{ $t('cpm.forecasting.currentFiscalYear') }}: {{ getCurrentFiscalYearHeader }}
          </th>
          <th
            v-if="futureFiscalYearsCollspan && showFuturesFY"
            :class="headerStyles[1]"
            :colspan="futureFiscalYearsCollspan"
          >
            {{ $t('cpm.forecasting.futureFiscalYears') }}
          </th>
        </tr>
        <tr>
          <th
            v-for="header in headerProps.headers"
            :key="header.text"
            :class="header.class"
            @click="setBudgetFiscalYear(header)"
          >
            {{ header.text }}
          </th>
        </tr>
      </template>

      <template
        v-slot:items="props"
      >
        <tr>
          <template v-if="showPreviewsFY">
            <td
              v-for="({ value: previousFiscalYearValue }, index) in previousFiscalYears"
              :key="index + 'previousFiscalYear'"
              class="text-xs-right"
            >
              <v-tooltip
                color="white"
                top
              >
                <template v-slot:activator="{ on }">
                  <span v-on="on">
                    {{ getAmount($h.dg(props.item, `forecast.totals.${previousFiscalYearValue}`, 0)) | currency }}
                  </span>
                </template>
                <span
                  class="black--text title"
                  v-html="getTooltipText($h.dg(props.item, `forecast.totals.${previousFiscalYearValue}`, 0))"
                />
              </v-tooltip>
            </td>
          </template>
          <td>
            <v-layout>
              <v-flex
                class="mr-4"
                xs1
              >
                {{ props.item.index }}
              </v-flex>
              <v-flex>
                {{ props.item.title }}
              </v-flex>
            </v-layout>
          </td>
          <td class="text-xs-right">
            {{ Math.round(props.item.budgetPercentage) }}%
          </td>
          <td class="text-xs-right">
            {{ getTaskBudget(props.item) | currency }}
          </td>

          <td
            v-for="(month, index) in monthsForForecastsTable"
            :key="index"
            class="text-xs-right"
          >
            <v-tooltip
              color="white"
              top
            >
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  {{ getAmount($h.dg(props.item, `forecast.${month}`)) | currency }}
                </span>
              </template>
              <span
                class="black--text title"
                v-html="getTooltipText($h.dg(props.item, `forecast.${month}`, 0))"
              />
            </v-tooltip>
          </td>

          <template v-if="showFuturesFY">
            <td
              v-for="({ value: futureFiscalYearValue }, index) in futureFiscalYears"
              :key="index + 'futureFiscalYear'"
              class="text-xs-right"
            >
              <v-tooltip
                color="white"
                top
              >
                <template v-slot:activator="{ on }">
                  <span v-on="on">
                    {{ getAmount($h.dg(props.item, `forecast.totals.${futureFiscalYearValue}`, 0)) | currency }}
                  </span>
                </template>
                <span
                  class="black--text title"
                  v-html="getTooltipText($h.dg(props.item, `forecast.totals.${futureFiscalYearValue}`, 0))"
                />
              </v-tooltip>
            </td>
          </template>
        </tr>
      </template>

      <template
        v-slot:footer
      >
        <tr class="grey lighten-2">
          <template v-if="showPreviewsFY">
            <td
              v-for="(previousFiscalYear, index) in previousFiscalYears"
              :key="index + 'previousFiscalYearFooter'"
              class="text-xs-right"
            >
              {{ budgets[$h.dg(previousFiscalYear, 'value', '')] | currency }}
            </td>
          </template>

          <td class="font-weight-bold">
            {{ $tc('general.total', 2) }}
          </td>
          <td class="text-xs-right">
            {{ Math.round($h.dg(budgetTotals, 'allTasksPercentage', 0)) }}%
          </td>
          <td class="text-xs-right">
            {{ budgets[currentFiscalYearValue] | currency }}
          </td>

          <td
            v-for="(month, index) in monthsForForecastsTable"
            :key="index + 'monthsForForecastsTable'"
            class="text-xs-right"
          >
            <v-tooltip
              color="white"
              top
            >
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  {{ getAmount($h.dg(budgetTotals, `months.${month}`, 0)) | currency }}
                </span>
              </template>
              <span
                class="black--text title"
                v-html="getTooltipText($h.dg(budgetTotals, `months.${month}`, 0))"
              />
            </v-tooltip>
          </td>

          <template v-if="showFuturesFY">
            <td
              v-for="(futureFiscalYear, index) in futureFiscalYears"
              :key="index + 'futureFiscalYearFooter'"
              class="text-xs-right"
            >
              {{ budgets[$h.dg(futureFiscalYear, 'value', '')] | currency }}
            </td>
          </template>
        </tr>
      </template>
    </m6-data-table>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'ForecastsTable',

  props: {
    tasks: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      calculationType: 'basic',
      headerStyles: [
        'light-blue darken-1 white--text',
        'light-blue darken-2 white--text',
        'light-blue darken-3 white--text',
        'light-blue darken-4 white--text',
        'cyan darken-1 white--text',
        'cyan darken-2 white--text',
        'cyan darken-3 white--text',
        'cyan darken-4 white--text'
      ],
      previousFYStyles: [
        'blue-grey darken-1 white--text',
        'blue-grey darken-2 white--text',
        'blue-grey darken-3 white--text',
        'blue-grey darken-4 white--text'
      ],
      // No matter if there is no data, there will always be a minimum number of headers
      minimumNumberHeaders: 3,
      // selectedFiscalYears: [ 'fy21' ],
      showFuturesFY: true,
      showPreviewsFY: false
    }
  },

  computed: {
    ...mapGetters('cpm/planned/forecasts', [
      'allFiscalYears',
      'budgets',
      'budgetFiscalYear',
      'budgetTotals',
      'futureFiscalYears',
      'monthsForForecastsTable',
      'previousFiscalYears',
      'selectedFiscalYear'
    ]),
    currentFiscalYearName() {
      return this.$h.dg(this.budgetFiscalYear, 'name', '')
    },
    currentFiscalYearValue() {
      return this.$h.dg(this.budgetFiscalYear, 'value', '')
    },
    selectedFiscalYearName() {
      return this.$h.dg(this.selectedFiscalYear, 'name', '')
    },
    selectedFiscalYearValue() {
      return this.$h.dg(this.selectedFiscalYear, 'value', '')
    },
    currentFiscalYearCollspan() {
      return this.minimumNumberHeaders + this.monthsForForecastsTable.length
    },
    futureFiscalYearsCollspan() {
      return this.futureFiscalYears.length * 1
    },
    previousFiscalYearsCollspan() {
      return this.previousFiscalYears.length * 1
    },
    tasksWithPositiveAmount() {
      return this.tasks.filter(task => this.$h.dg(task, 'budgetPercentage', 0) > 0)
    },
    headers() {
      const headers = [
        {
          text: this.$t('cpm.forecasting.table.numberTask'),
          value: 'title',
          class: this.headerStyles[0],
          sortable: false,
          fixed: true
        },
        {
          text: this.$t('cpm.forecasting.table.budgetPercentage'),
          value: 'budgetPercentage',
          class: this.headerStyles[0],
          align: 'right',
          sortable: false,
          fixed: true
        },
        {
          text: this.$t('cpm.forecasting.table.amount'),
          value: 'budget',
          align: 'right',
          class: this.headerStyles[0],
          sortable: false,
          fixed: true
        }
      ]

      const monthHeaders = []
      if (this.monthsForForecastsTable.length) {
        this.monthsForForecastsTable.map(month => {
          monthHeaders.push({
            text: month,
            align: 'right',
            class: this.headerStyles[0],
            sortable: false
          })
        })
      }

      if (monthHeaders.length) {
        headers.push(...monthHeaders)
      }

      // Adding future fiscal year headers
      if (this.showFuturesFY) {
        const fyHeaders = []
        if (this.futureFiscalYears.length) {
          this.futureFiscalYears.map((fy, index) => {
            fyHeaders.push({
              text: this.$h.dg(fy, 'name', ''),
              align: 'right',
              class: this.headerStyles[index + 1],
              sortable: false
            })
          })
        }
        headers.push(...fyHeaders)
      }

      // Adding previous fiscal year headers
      if (this.showPreviewsFY) {
        const previousFYHeaders = []
        if (this.previousFiscalYears.length) {
          this.previousFiscalYears.map((fy, index) => {
            previousFYHeaders.push({
              text: this.$h.dg(fy, 'name', ''),
              align: 'right',
              class: this.previousFYStyles[index + 1],
              sortable: false
            })
          })
        }
        headers.unshift(...previousFYHeaders)
      }

      return headers
    },
    selectedFiscalYears() {
      return [
        this.selectedFiscalYearValue
      ]
    },
    getCurrentFiscalYearHeader() {
      if (!this.currentFiscalYearName || this.currentFiscalYearName === this.selectedFiscalYearName) {
        return this.selectedFiscalYearName
      } else if (this.currentFiscalYearName > this.selectedFiscalYearName) {
        return `${this.selectedFiscalYearName} - ${this.currentFiscalYearName}`
      } else {
        return `${this.currentFiscalYearName} - ${this.selectedFiscalYearName}`
      }
    }
  },

  methods: {
    ...mapMutations('cpm/planned/forecasts', [
      'setFiscalYear'
    ]),
    getAmount(amountByFiscalYear) {
      if (!amountByFiscalYear) return 0

      return this.selectedFiscalYears.reduce((sum, fyValue) => sum + parseFloat(this.$h.dg(amountByFiscalYear, fyValue, 0)), 0)
    },
    getTooltipText(amountByFiscalYear) {
      if (!amountByFiscalYear) return 0

      let tooltipText = ''
      const sortedAmountByFiscalYear = Object.fromEntries(Object.entries(amountByFiscalYear).sort())

      for (const fy in sortedAmountByFiscalYear) {
        tooltipText += `<span class="font-weight-bold">${fy}:</span> ${this.$options.filters.currency(amountByFiscalYear[fy])}<br>`
      }

      return tooltipText
    },
    getTaskBudget(task) {
      const budgetPercentage = Math.round(task.budgetPercentage)

      return parseFloat(this.budgets[this.selectedFiscalYearValue] * (budgetPercentage / 100))
    },
    setBudgetFiscalYear(selectedFiscalYear) {
      const fiscalYear = this.allFiscalYears.find(fy => this.$h.dg(fy, 'name') === this.$h.dg(selectedFiscalYear, 'text'))
      if (fiscalYear) {
        this.setFiscalYear(fiscalYear)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  tr {
    border: none !important;
  }
</style>
