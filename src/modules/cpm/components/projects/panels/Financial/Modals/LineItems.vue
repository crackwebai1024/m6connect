<template>
  <div>
    <v-card class="licensing-edit-modal">
      <v-card-title
        class="headline"
        style="background: #006699; color:#fff"
      >
        {{ $t('cpm.projects.budgetPanel.editBudget.lineItems') }}

        <v-spacer />
        <v-btn
          class="flex-end"
          color="blue darken-2"
          dark
          fab
          small
          @click="openNewItem"
        >
          <v-icon dark>
            add
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <new-item
          v-if="showNewItem"
          :budget-categories-select="budgetCategoriesSelect"
          :budget-id="budget.id"
          :cost-codes="costCodesAllArray"
          :settings="settings"
          @cancel="cancelLineItem"
          @created="lineItemCreated"
        />
        <edit-item
          v-if="showEditItem"
          :budget-categories-select="budgetCategoriesSelect"
          :budget-id="budget.id"
          :cost-codes="costCodesAllArray"
          :line-item="lineItemToEdit"
          :settings="settings"
          @cancel="cancelEditLineItem"
          @edited="lineItemEdited"
        />
        <v-data-table
          :expand="expand"
          :headers="headers"
          item-key="category.name"
          :items="budgetCategories"
        >
          <template v-slot:items="props">
            <tr
              @click="
                props.expanded = !props.expanded
                selectedBudgetCategory = props.item
              "
            >
              <td>
                <v-icon v-if="!props.expanded">
                  keyboard_arrow_right
                </v-icon>
                <v-icon v-if="props.expanded">
                  keyboard_arrow_down
                </v-icon>
              </td>
              <td>
                <template v-if="$h.dg(props, 'item.category', false)">
                  {{ props.item.category.code }} - {{ props.item.category.name }}
                </template>
                <template v-else>
                  {{ $t('cpm.projects.budgetPanel.editBudget.noDefined') }}
                </template>
              </td>
              <td>
                {{ props.item.amount | currency }}
              </td>
            </tr>
          </template>

          <template v-slot:expand="props">
            <v-layout justify-center>
              <v-flex xs11>
                <v-data-table
                  class="elevation-1"
                  :headers="subHeaders"
                  :items="selectedBudgetCategory.items"
                >
                  <template v-slot:items="props">
                    <tr style="background-color: rgba(0, 0, 0, 0.05);">
                      <td>
                        {{ getDate(props.item.createdAt) }}
                      </td>
                      <td class="">
                        {{ props.item.type }}
                      </td>
                      <td>
                        {{ props.item.amount | currency }}
                      </td>
                      <td>
                        <v-flex style="float: right;">
                          <v-icon
                            class="ml-0 mr-2"
                            color="#757575"
                            size="20"
                            style="cursor: pointer"
                            @click.stop="editLineItem(props.item)"
                          >
                            edit
                          </v-icon>
                          <v-icon
                            class="ml-0 mr-2"
                            color="#f44336"
                            size="20"
                            style="cursor: pointer"
                            @click.stop="deleteLineItem(props.item)"
                          >
                            delete
                          </v-icon>
                        </v-flex>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-flex>
            </v-layout>
          </template>
        </v-data-table>
        <div class="totals-container">
          <v-chip>{{ $t('general.subTotal') }}: {{ total | currency }}</v-chip>
          <v-chip>{{ $tc('general.total', total) }}: {{ total | currency }}</v-chip>
        </div>
        <br>
      </v-card-text>
    </v-card>
    <m6-loading :loading="showLoading" />
  </div>
</template>

<script>
import { db } from '@/utils/Firebase'
import NewLineItem from './forms/NewLineItem'
import EditLineItem from './forms/EditLineItem'
import moment from 'moment'
export default {
  name: "LineItems",
  components: {
    'new-item': NewLineItem,
    'edit-item': EditLineItem
  },

  props: {
    budget: { type: Object, default: () => {} },
    value: { type: Boolean, default: false },
    type: { type: String, default: 'project' },
    lineItems: { type: Object, default: () => {} }
  },

  data() {
    return {
      budgetCategories: [],
      expand: false,
      projectRef: db.collection('cpm_projects').doc(this.$route.params.id),
      settings: {},
      headers: [
        { text: '', width: '1%', sortable: false },
        {
          text: this.$t('cpm.projects.budgetPanel.editBudget.budgetCategory'),
          value: 'category',
          sortable: false
        },
        {
          text: this.$t('cpm.projects.budgetPanel.editBudget.amount'),
          value: 'amount'
        }
      ],
      subHeaders: [
        {
          text: this.$t('cpm.projects.budgetPanel.editBudget.createdAt'),
          sortable: false
        },
        {
          text: this.$t('cpm.projects.budgetPanel.editBudget.type'),
          value: 'type'
        },
        {
          text: this.$t('cpm.projects.budgetPanel.editBudget.amount'),
          value: 'amount'
        },
        { text: this.$t('general.actions'), sortable: false, align: 'right' }
      ],
      showNewItem: false,
      showEditItem: false,
      budgetCategoriesSelect: [],
      costCodesSortArray: [],
      costCodesAllArray: [],
      firebaseBudget: {},
      showLoading: false,
      lineItemToDelete: {},
      selectedBudgetCategory: null
    }
  },

  firestore() {
    return {
      firebaseBudget: db
        .collection('cpm_projects')
        .doc(this.$route.params.id)
        .collection('budgets')
        .doc(this.budget.id),
      settings: db
        .collection('settings')
        .doc(window.Drupal.settings.m6_platform.company_nid)
        .collection(`${this.settingCollectionName}`)
        .doc('budgets'),
      lineItems: db
        .collection('cpm_projects')
        .doc(this.$route.params.id)
        .collection('budgets')
        .doc(this.budget.id)
        .collection('lineItems')
    }
  },

  computed: {
    total() {
      if (this.budgetCategories.length) {
        let total = 0
        this.budgetCategories.map(category => {
          total += category.amount || 0
        })

        return total
      } else return 0
    },

    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },

    settingCollectionName() {
      if (this.type === 'forecasted') {
        return 'planned_settings'
      } else {
        return 'settings'
      }
    }
  },
  watch: {
    lineItems(val) {
      this.$emit('updateLineItems', val)
    },
    settings() {
      this.costCodesSortArray = []
      this.costCodesAllArray = []
      if (this.$h.dg(this.settings, 'costCodes')) {
        this.settings.costCodes.forEach(cl1 => {
          this.costCodesSortArray.push(cl1.name)
          const itemName = cl1.code ? `${cl1.code} - ${cl1.name}` : cl1.name
          this.costCodesAllArray.push({
            item: cl1,
            name: itemName,
            level: 1
          })
          this.budgetCategoriesSelect.push(cl1.name)
          if (this.$h.dg(cl1, 'cat_1')) {
            cl1.cat_1.forEach(cl2 => {
              this.costCodesSortArray.push(cl1.name + ' - ' + cl2.name)
              let itemL2Name = itemName + ' | '
              itemL2Name += cl2.code ? `${cl2.code} - ${cl2.name}` : cl2.name
              this.costCodesAllArray.push({
                item: cl1,
                itemL2: cl2,
                name: itemL2Name,
                level: 2
              })
              if (this.$h.dg(cl2, 'cat_2')) {
                cl2.cat_2.forEach(cl3 => {
                  this.costCodesSortArray.push(
                    cl1.name + ' - ' + cl2.name + ' - ' + cl3.name
                  )
                  let itemL3Name = itemL2Name + ' | '
                  itemL3Name += cl3.code
                    ? `${cl3.code} - ${cl3.name}`
                    : cl3.name
                  this.costCodesAllArray.push({
                    item: cl1,
                    itemL2: cl2,
                    itemL3: cl3,
                    name: itemL3Name,
                    level: 3
                  })
                })
              }
            })
          }
        })
      }
    }
  },
  created() {
    this.fetchLineItems()
  },
  methods: {
    async fetchLineItems() {
      const lineItems = []
      const query = db
        .collection('cpm_projects')
        .doc(this.$route.params.id)
        .collection('budgets')
        .doc(this.budget.id)
        .collection('lineItems')

      const { docs } = await query.get()

      await Promise.all(docs.map(async doc => {
        const data = { ...doc.data(), id: doc.id }

        if (this.$h.dg(data, 'budget_category.ref.id')) {
          const response = await db
            .collection('settings')
            .doc(window.Drupal.settings.m6_platform.company_nid)
            .collection('settings')
            .doc('budgets')
            .collection('budget_categories')
            .doc(data.budget_category.ref.id)
            .get()

          data.budget_category.ref = { ...response.data(), id: response.id }
        }
        lineItems.push({
          ...data
        })
      }))

      const lineItemsGroupedByCategory = this.lodash.groupBy(
        lineItems,
        'budget_category.ref.name'
      )

      const budgetCategories = []
      Object.keys(lineItemsGroupedByCategory).map((key) => {
        let amount = 0
        const items = lineItemsGroupedByCategory[key]
        items.map(item => {
          amount += parseFloat(item.amount) || 0
        })

        const categoryName = {
          code: this.$h.dg(items[0], 'budget_category.ref.code', this.$t('general.nA')),
          name: this.$h.dg(items[0], 'budget_category.ref.name', this.$t('cpm.projects.budgetPanel.editBudget.noDefined'))
        }

        budgetCategories.push({
          items,
          category: categoryName,
          amount
        })
      })

      this.budgetCategories = budgetCategories
    },
    cancelLineItem() {
      this.showNewItem = false
    },

    cancelEditLineItem() {
      this.showEditItem = false
    },

    editLineItem(lineItem) {
      this.lineItemToEdit = lineItem
      this.cancelLineItem()
      this.showEditItem = true
    },

    deleteLineItem(item) {
      this.lineItemToDelete = item
      this.$emit('showDeleteLineItemModal', true)
    },

    cancelDelete() {
      this.$emit('showDeleteLineItemModal', false)
      this.lineItemToDelete = {}
    },

    deleteConfirmed() {
      this.showLoading = true
      this.projectRef
        .collection('budgets')
        .doc(this.budget.id)
        .collection('lineItems')
        .doc(this.lineItemToDelete.id)
        .delete()
        .then(() => {
          this.showLoading = false
          this.$snotify.success(this.$t('general.lineItemDeleted'), this.$t('alerts.success'))
          this.cancelDelete()
          this.calculateBudgetTotal()
          this.updateBudgetInformation()
          this.fetchLineItems()
        })
        .catch(() => {
          this.cancelDelete()
          this.$snotify.error(
            this.$t('general.lineItemNotDeleted'),
            this.$t('alerts.error')
          )
        })
    },

    updateBudgetInformation() {
      this.$emit('updateBudgetInformation')
    },

    lineItemCreated() {
      this.calculateBudgetTotal()
      this.cancelLineItem()
      this.updateBudgetInformation()
      this.fetchLineItems()
    },

    lineItemEdited() {
      this.calculateBudgetTotal()
      this.cancelEditLineItem()
      this.updateBudgetInformation()
      this.fetchLineItems()
    },

    calculateBudgetTotal() {
      let budgetSubTotal = parseFloat(0.0)
      this.lineItems.forEach(item => {
        if (item.type === 'Amount' && !item.belowSubtotal) {
          budgetSubTotal += parseFloat(item.amount)
        }
      })

      let budgetTotal = parseFloat(budgetSubTotal)
      this.lineItems.forEach(item => {
        if (item.type === 'Percentage') {
          if (
            item.percentageType === undefined ||
            item.percentageType === 'Subtotal'
          ) {
            budgetTotal += parseFloat(
              Math.floor(budgetSubTotal * (item.amount / 100))
            )
          } else if (item.percentageType === 'Category') {
            budgetTotal += this.calculateBudgetPercentage(
              item.percentageBudgetCategories,
              item.amount
            )
          }
        } else if (item.belowSubtotal) {
          budgetTotal += parseFloat(item.amount)
        }
      })

      db.collection('cpm_projects')
        .doc(this.$route.params.id)
        .collection('budgets')
        .doc(this.budget.id)
        .update({
          subTotal: budgetSubTotal.toFixed(2),
          total: budgetTotal.toFixed(2)
        })
        .then(() => {
          this.sortLineItems()
        })
    },

    calculateBudgetPercentage(categories, amount) {
      let resultAmount = 0
      this.lineItems.forEach(li => {
        if (
          categories.includes(li.budgetCategory) &&
          li.type === 'Amount' &&
          !li.belowSubtotal
        ) {
          resultAmount += li.amount
        }
      })
      return parseFloat(Math.floor(resultAmount * (amount / 100)))
    },

    sortLineItems() {
      this.budgetLineItems = []
      const tempLineItems = []
      this.lineItems.forEach(li => {
        this.costCodesSortArray.find((s, i) => {
          if (s === li.costCodeText) {
            li.sortIndex = i
          }
        })
        tempLineItems.push(li)
      })
      tempLineItems.sort((a, b) => a.sortIndex - b.sortIndex)
      this.budgetLineItems = tempLineItems
    },
    getDate(timestamp) {
      return moment(timestamp.toDate()).format('MM/DD/YYYY')
    },
    openNewItem() {
      this.cancelEditLineItem()
      this.showNewItem = !this.showNewItem
    }
  }
}
</script>

<style lang="scss" scoped>
.input-margin-right {
  margin-right: 0.9375rem;

  &:last-child {
    margin-right: 0;
  }
}

.edit-cost-form {
  margin-top: 1.5625rem;
}

.budget-title {
  align-items: center;
}

.padding-top-10 {
  padding-top: 0.625rem;
}

.flex-end {
  justify-content: flex-end;
}

.text-right {
  text-align: right;
}

.totals-container {
  margin-top: 0.3125rem;
  text-align: right;
}
</style>
