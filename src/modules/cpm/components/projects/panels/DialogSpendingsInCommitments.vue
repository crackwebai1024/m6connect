<template>
  <v-dialog
    v-model="showSpendings"
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title
        class="title"
        primary-title
      >
        Spending in {{ title }}
      </v-card-title>
      <v-card-text>
        <v-container
          class="pa-0"
          fluid
          grid-list-md
        >
          <v-layout
            row
            wrap
          >
            <v-flex md12>
              <v-data-table
                :headers="headers"
                :items="spendings"
              >
                <template
                  slot="items"
                  slot-scope="props"
                >
                  <td>{{ props.item.number }}</td>
                  <td>{{ props.item.amount | currency }}</td>
                  <td class="text-xs-right">
                    <v-icon
                      class="mr-2"
                      color="#757575"
                      size="20"
                      @click="showSpendingLineItem(props.item)"
                    >
                      assignment
                    </v-icon>

                    <v-icon
                      class="ml-0 mr-0"
                      color="#757575"
                      size="20"
                      style="cursor: pointer"
                      @click="editSpending(props.item)"
                    >
                      edit
                    </v-icon>

                    <v-icon
                      class="ml-0 mr-0"
                      color="red"
                      size="20"
                      style="cursor: pointer"
                      @click="deleteSpending(props.item)"
                    >
                      delete
                    </v-icon>
                  </td>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          flat
          @click="closeModalSpendings"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>

    <m6-confirm-delete
      :message="
        $t('general.sureDeleteResource', {
          resource: $t('cpm.projects.spending')
        })
      "
      :show="showDeleteModal"
      :title="
        $t('general.deleteResource', {
          resource: $tc('cpm.projects.spending')
        })
      "
      @cancel="cancelDelete"
      @confirm="confirmDelete"
    />
  </v-dialog>
</template>

<script>
import { db } from '@/utils/Firebase'
import EventBus from '@/Eventbus'
import axios from 'axios'

export default {
  name: 'DialogSpendingsInCommitments',
  props: {
    projectId: {
      type: [String, Number],
      required: true
    },
    commitmentsId: {
      type: [String, Number],
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      resourceToDelete: {},
      showDeleteModal: false,
      spendings: [],
      headers: [
        { text: 'Number', value: 'number' },
        { text: 'Amount', value: 'amount' },
        { text: 'Actions', value: 'number', align: 'right', sortable: false }
      ],
      showSpendings: true
    }
  },
  async mounted() {
    this.getSpendings()
  },
  methods: {
    async getSpendings() {
      this.spendings = []

      const ref = db
        .collection('cpm_projects')
        .doc(this.projectId)
        .collection('commitments')
        .doc(this.commitmentsId)
      const response = await db
        .collection('cpm_projects')
        .doc(this.projectId)
        .collection('spendings')
        .where('commitment', '==', ref)
        .get()

      if (response.empty) {
        return
      }

      response.docs.forEach(element => {
        const spending = element.data()
        spending.id = element.id
        spending.amount = 0
        this.spendings.push(spending)

        element.ref
          .collection('line_items')
          .get()
          .then(line => {
            line.docs.forEach(doc => {
              const data = doc.data()
              const find = this.spendings.find(rec => rec.id === element.id)
              find.amount += parseFloat(data.amount)
            })
          })
      })
    },
    closeModalSpendings() {
      this.$emit('close')
    },
    editSpending(item) {
      // Using in FinancialSpendins.vue
      EventBus.$emit('edit-spending-from-commitment', {
        spending: item
      })
    },
    updateListSpending() {
      // Using in FinancialSpendins.vue
      EventBus.$emit('update-list-spending-from-reconciliation')
    },
    showSpendingLineItem(spending) {
      // Using in FinancialSpendins.vue
      EventBus.$emit('show-spending-lineitems-from-commitment', {
        spending
      })
    },
    deleteSpending(spending) {
      this.resourceToDelete = spending
      this.showDeleteModal = true
    },

    cancelDelete() {
      this.resourceToDelete = {}
      this.showDeleteModal = false
    },

    confirmDelete() {
      db.collection('cpm_projects')
        .doc(this.projectId)
        .collection('spendings')
        .doc(this.resourceToDelete.id)
        .delete()
        .then(() => {
          this.updateListSpending()
          this.getSpendings()
          this.updateSpendingTotals()

          this.$snotify.success(
            this.$t('cpm.projects.spendingDeleted'),
            this.$t('alerts.success')
          ),
          this.cancelDelete()
        })
    },

    updateSpendingTotals(id) {
      return new Promise(async (resolve, reject) => {
        try {
          await axios.post(
            `${
              process.env.VUE_APP_FIREBASE_APIURL
            }/api/projects/${this.projectId}/update-spendings?spendingId=${id ||
              this.resourceToDelete.id ||
              ''}`
          )

          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
</script>
