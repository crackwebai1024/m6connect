<template>
  <v-layout>
    <v-flex xs-12>
      <v-btn @click="dialog = true">
        {{ $t('cpm.projects.forecast') }}
      </v-btn>
      <v-btn @click="dialogCategory = true">
        {{ $t('cpm.projects.budgetCategory') }}
      </v-btn>
    </v-flex>

    <v-dialog
      v-model="dialogCategory"
      max-width="800px"
      persistent
      scrollable
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title
          class="title"
          primary-title
        >
          {{ $t('cpm.projects.budgetCategory') }}
        </v-card-title>
        <v-card-text>
          <v-layout
            align-center
            justify-center
            row
          >
            <v-flex xs>
              <v-data-table
                v-if="items.length && spendingByPeriod.length"
                :headers="spendingByPeriod"
                :items="items"
              >
                <template
                  slot="items"
                  slot-scope="props"
                >
                  <td v-for="header in spendingByPeriod">
                    <div
                      v-if="header.byAmount"
                    >
                      {{ $h.dg(props.item, header.value, 0) | currency }}
                    </div>
                    <div
                      v-else
                    >
                      {{ $h.dg(props.item, header.value, '') }}
                    </div>
                  </td>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            flat
            :loading="loading"
            @click="dialogCategory = false"
          >
            {{ $t('general.cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog"
      max-width="400px"
      persistent
      scrollable
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title
          class="title"
          primary-title
        >
          {{ $t('cpm.projects.forecast') }}
        </v-card-title>
        <v-card-text>
          <v-layout
            align-center
            justify-center
            row
          >
            <v-flex xs3>
              <div class="font-weight-black subheading">
                <v-layout>
                  <v-flex shrink>
                    {{ $t('cpm.projects.type') }}
                  </v-flex>
                </v-layout>
              </div>
            </v-flex>
            <v-flex xs7>
              <v-select
                v-model="forecast.type"
                item-text="label"
                :items="types"
                :label="$t('cpm.projects.type')"
                persistent-hint
                return-object
              />
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            flat
            :loading="loading"
            @click="dialog = false"
          >
            {{ $t('general.cancel') }}
          </v-btn>
          <v-btn
            color="primary"
            :loading="loading"
            @click="generateForecast"
          >
            {{ $t('cpm.projects.generate') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { db } from '@/utils/Firebase'
export default {
  name: 'ProjectFinalCost',
  data() {
    return {
      spendingByPeriod: [],
      items: [],
      dialog: false,
      loading: false,
      dialogCategory: false,
      startDateMenu: false,
      endDateMenu: false,
      budget: 0,
      startDate: '',
      endDate: '',
      forecast: {
        type: ''
      },
      types: [
        {
          id: 'flat',
          label: this.$t('cpm.projects.forecastOptions.flat'),
          stDev: 1
        },
        {
          id: 'curve',
          label: this.$t('cpm.projects.forecastOptions.moderateFlat'),
          stDev: 3
        },
        {
          id: 'curve',
          label: this.$t('cpm.projects.forecastOptions.moderate'),
          stDev: 5
        },
        {
          id: 'curve',
          label: this.$t('cpm.projects.forecastOptions.moderateSteep'),
          stDev: 7
        },
        {
          id: 'curve',
          label: this.$t('cpm.projects.forecastOptions.steep'),
          stDev: 9
        }
      ]
    }
  },

  computed: {
    months() {
      return []
    }
  },
  created() {
    const projectId = this.$route.params.id
    this.getSpendingsByPeriod(projectId)
    this.getBudget()
  },
  methods: {
    generateForecast() {
      this.$emit('generateForecast', this.forecast)
      this.dialog = false
    },
    async getBudget() {
      let project = await db.collection('cpm_projects').doc(this.$route.params.id).get()
      project = project.data()
      if (project.startDate && project.endDate) {
        this.startDate = project.startDate
        this.endDate = project.endDate
      }

      let data = await db.collection('cpm_projects').doc(this.$route.params.id).collection('budgets').where('active', '==', true).get()
      if (data.docs.length) {
        data = data.docs[0].data()
        this.budget = parseFloat(data.total)
      }
      if (this.budget && this.startDate && this.endDate) {
        this.getMonths()
      }
    },
    getMonths() {
      let count = 0
      const dateIni = new Date(this.startDate)
      let currentDate = dateIni.toISOString().substr(0, 7)
      const endDate = this.endDate.substr(0, 7)

      const budget = this.budget
      const headers = {
        text: this.$t('cpm.projects.budgetCategory'),
        value: 'budget_category'
      }
      while (currentDate !== endDate) {
        currentDate = dateIni.toISOString().substr(0, 7)
        this.spendingByPeriod.push({
          text: currentDate,
          value: currentDate,
          byAmount: true
        })
        count++
        dateIni.setMonth(dateIni.getMonth() + 1)
        if (count > 100) break
      }
      this.spendingByPeriod.unshift(headers)
    },
    async getSpendingsByPeriod(projectId) {
      try {
        const periods = []
        const spendingRef = db.collection('cpm_projects')
          .doc(projectId)
          .collection('spendings')
          .orderBy('paidDateText')

        const snapshot = await spendingRef.get()
        await Promise.all(snapshot.docs.map(async item => {
          const spending = item.data()
          let budgetCategory = this.$h.dg(spending, 'budget_category.ref')
          spending.id = item.id
          if (budgetCategory) {
            budgetCategory = await budgetCategory.get()
            budgetCategory = await budgetCategory.data()
            budgetCategory = budgetCategory.name
          } else {
            budgetCategory = 'category-not-found'
          }
          let paidDate = 'date-not-found'

          if (spending.paidDateText) {
            paidDate = this.$moment(spending.paidDateText).format('YYYY-MM')
          }

          const total = await this.solveSpendings(projectId, spending)
          const find = periods.find(item => item.budget_category === budgetCategory)

          if (!find) {
            periods.push({
              budget_category: budgetCategory,
              [paidDate]: total
            })
          } else {
            if (!find[paidDate]) {
              find[paidDate] = total
            }
            find[paidDate] += total
          }
        }))
        this.items = periods
      } catch (error) {
        console.error(error)
      }
    },
    solveSpendings(projectId, spending) {
      const auxPromise = new Promise(async (resolve, reject) => {
        try {
          let total = 0

          const snap = await db.collection('cpm_projects').doc(projectId).collection('spendings')
            .doc(spending.id).collection('line_items').get()

          await Promise.all(snap.docs.map(doc => {
            const lineItem = doc.data()
            total += parseFloat(lineItem.amount)
          }))
          resolve(total)
        } catch (error) {
          reject(error)
        }
      })
      return auxPromise
    }
  }
}
</script>
