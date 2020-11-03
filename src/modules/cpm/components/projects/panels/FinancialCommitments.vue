<template>
  <m6-card-dialog
    min-height="0"
    :title="$tc('cpm.projects.commitment', 2)"
    :title-tooltip="$t('general.doubleClickSeeMore')"
    @fullscreen="checkFullScreen"
    ref="cardDialog"
  >
    <template v-slot:after:title>
      <v-tooltip
        v-if="$route.name === 'cpm.projects.show'"
        left
      >
        <template v-slot:activator="{ on }">
          <!-- THIS CHANGE WAS BECAUSE THE SPENDINGS DIALOG WAS NOT WORKING IN ANOTHER TAB FULLSCREEN -->
          <v-icon
            dark
            flat
            @click="$refs.cardDialog.doubleClick()"
          >
            launch
          </v-icon>
        </template>
        <span>{{ $t('general.openNewTab') }}</span>
      </v-tooltip>

      <v-menu
        v-if="search"
        nudge-top="100"
        offset-y
        open-on-hover
      >
        <template v-slot:activator="{ on }">
          <v-icon
            dark
            v-on="on"
            @click="showSearchingModal = true"
          >
            search
          </v-icon>
        </template>

        <v-card color="rgb(255, 255, 255, 0.9)">
          <v-card-text>
            <b>{{ $t('general.currentSearchTerm') }}:</b>
            {{ search }}
          </v-card-text>
        </v-card>
      </v-menu>

      <v-tooltip
        v-if="!search"
        left
      >
        <template v-slot:activator="{ on }">
          <v-icon
            class="search"
            v-on="on"
            @click="showSearchingModal = true"
          >
            search
          </v-icon>
        </template>
        <span>{{ $t('general.search') }}</span>
      </v-tooltip>

      <template v-if="search">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-icon
              class="close-search"
              v-on="on"
              @click="clearSearch"
            >
              close
            </v-icon>
          </template>
          <span>{{ $t('general.clearSearch') }}</span>
        </v-tooltip>
      </template>

      <v-icon
        class="cursor"
        dark
        @click="createShowModal = true"
      >
        add
      </v-icon>

      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-icon
            v-if="isAdmin"
            class="cursor"
            color="white"
            v-on="on"
            @click="showSettings = true"
          >
            settings_applications
          </v-icon>
        </template>
        <span>{{ $t('general.settings') }}</span>
      </v-tooltip>
    </template>

    <v-layout
      justify-center
      row
    >
      <v-chip
        color="transparent"
        disabled
        text-color="black"
      >
        <strong>{{ $t('cpm.projects.po') }} {{ (poAmount || 0) | currency }}</strong>
      </v-chip>
      <v-chip
        color="transparent"
        disabled
        text-color="black"
      >
        <strong>{{ $t('cpm.projects.open') }} {{ (poTax || 0) | currency }}</strong>
      </v-chip>
    </v-layout>

    <m6-data-table
      v-if="dataTable"
      :align-actions="alignActions"
      class="elevation-0"
      expand
      :headers="headers"
      :items="resources"
      :pagination.sync="pagination"
      :rows-per-page-items="rowsPerPage"
      :total-items="pagination.totalItems"
      @update:pagination="debounceSearch(search, false)"
    >
      <template v-slot:items="props">
        <tr
          class="step6"
          @click="fetchSpending(props)"
        >
          <td class="pl-20 text-xs-left">
            <v-layout>{{ props.item.number }}</v-layout>
          </td>
          <td
            class="pl-20 text-xs-left"
          >
            <template v-for="vendor in props.item.vendors">
              {{ vendor }}
            </template>
          </td>

          <td
            v-if="isFullScreen || isFullScreenPage"
            class="pl-20 text-xs-left"
          >
            <v-layout v-if="$h.dg(props.item, 'budget_category.code')">
              {{ props.item.budget_category.code }} -
              {{ $h.dg(props.item, 'budget_category.name', '') }}
            </v-layout>
          </td>
          <td
            v-if="isFullScreen || isFullScreenPage"
            class="pl-20 text-xs-left"
          >
            <v-layout>{{ props.item.notes }}</v-layout>
          </td>
          <td class="text-xs-right">
            <v-layout justify-end>
              {{ (props.item.amount || 0) | currency }}
            </v-layout>
          </td>
          <td
            v-if="!isFullScreen || isFullScreenPage"
            class="text-xs-right"
          >
            <v-layout justify-end>
              {{ (props.item.openAmount || 0) | currency }}
            </v-layout>
          </td>
          <td
            v-else
            class="text-xs-right"
          >
            <v-layout justify-end>
              {{ (props.item.spendingAmount || 0) | currency }}
            </v-layout>
          </td>
          <td
            v-if="isFullScreen || isFullScreenPage"
            class="text-xs-right"
          >
            <v-layout justify-end>
              {{ (props.item.openAmount || 0) | currency }}
            </v-layout>
          </td>

          <td
            class="pl-20 text-xs-center"
          >
            <v-layout justify-center>
              <v-flex shrink>
                {{ formatDateToText(props.item.completionDate) }}
              </v-flex>
            </v-layout>
          </td>

          <td class="text-xs-center">
            <m6-dropdown-actions
              :options="dropdownOptions"
              @attach="openModalSpendings(props.item)"
              @delete="
                settingCommitmentDelete(
                  props.item.id,
                  props.item.number,
                  props.index
                )
              "
              @edit="whichCommitmentToEdit(props.item)"
              @see="displayLineItems(props.item)"
            />
          </td>
        </tr>
      </template>

      <template
        v-if="isFullScreen || isFullScreenPage"
        v-slot:expand="props"
      >
        <v-layout justify-center>
          <v-flex xs11>
            <v-data-table
              class="elevation-1"
              :headers="subheaders"
              hide-actions
              :items="props.item.spending"
            >
              <template v-slot:items="props">
                <td class="text-xs-left">
                  {{ props.item.number }}
                </td>
                <td class="text-xs-left">
                  <v-layout v-if="$h.dg(props.item, 'budget_category.code')">
                    {{ props.item.budget_category.code }} -
                    {{ $h.dg(props.item, 'budget_category.name') }}
                  </v-layout>
                </td>
                <td class="text-xs-center">
                  {{ formatDateToText(props.item.date) }}
                </td>
                <td class="text-xs-right">
                  {{ props.item.amount | currency }}
                </td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </template>
    </m6-data-table>

    <financial-commit-modal
      is-create
      :project-id="projectId"
      :show="createShowModal"
      @close="reload"
      @close-only="createShowModal = false"
    />

    <financial-commit-modal
      v-if="editShowModal"
      :commitment-id="commitmentToEdit.id"
      :project-id="projectId"
      :show="editShowModal"
      @close="reload"
      @close-only="editShowModal = false"
    />

    <line-items-show
      v-if="showLineItems"
      :commitment="commitmentToShow"
      :show="showLineItems"
      :vendors="vendors"
      @close="closeDisplayLineItems"
      @get-vendors="getVendors"
      @reload="reload"
    />

    <m6-confirm-delete
      :message="
        $t('general.sureDeleteResource', {
          resource: $tc('cpm.projects.commitment', 1)
        })
      "
      :show="showDeleteCommitmentModal"
      :title="
        $t('general.deleteResource', {
          resource: $tc('cpm.projects.commitment', 1)
        })
      "
      @cancel="cancelCommitmentDelete"
      @confirm="deleteCommitment"
    />

    <searching
      v-if="showSearchingModal"
      :previous-search="search"
      :show="showSearchingModal"
      where="commitments"
      @clear="search = ''"
      @close="showSearchingModal = false"
      @searching="onSearch"
    />

    <m6-loading :loading="showLoading" />

    <settings-modal
      v-if="showSettings"
      :show="showSettings"
      @close="showSettings = false"
    />

    <dialog-spendings-in-commitments
      v-if="showSpendings"
      :commitments-id="commitmentSpendingId"
      :project-id="projectId"
      :title="commitmentTitle"
      @close="closeModalSpendings"
    />

    <m6-info
      v-if="showInfo"
      :title="infoTitle"
      @close="showInfo = false"
    >
      This commitment has associated spending
      <ul>
        <li v-for="(spendingName, index) in associatedSpending" :key="spendingName">
          {{ spendingName }}
        </li>
      </ul>
    </m6-info>
  </m6-card-dialog>
</template>

<script>
import axios from 'axios'
import { DateTime } from 'luxon'
import { mapActions } from 'vuex'

import { db } from '@/utils/Firebase'
import EventBus from '@/Eventbus'

import mixins from '@/components/_mixins/index'

import FinancialCommitmentsModal from '../modals/FinancialCommitmentsModal'
import LineItemsShow from '../modals/LineItemsShow'
import SearchingModal from '../modals/SearchingModal'

import settingsModal from '../settings_modals/FinancialCommitments.vue'
import DialogSpendingsInCommitments from './DialogSpendingsInCommitments'
import M6Info from '../_partials/M6Info'

export default {
  name: 'FinancialCommitments',
  components: {
    'financial-commit-modal': FinancialCommitmentsModal,
    'line-items-show': LineItemsShow,
    searching: SearchingModal,
    'settings-modal': settingsModal,
    'dialog-spendings-in-commitments': DialogSpendingsInCommitments,
    'm6-info': M6Info
  },

  mixins: [mixins],

  props: {
    pid: {
      type: [String, Number],
      default: undefined
    },

    dateRule: {
      type: Object,
      default: () => ({
        month: null,
        year: ''
      })
    }
  },

  data() {
    const projectId = this.pid ? this.pid : this.$route.params.id

    return {
      infoTitle: '',
      showInfo: false,
      associatedSpending: [],
      selectedCommitment: null,
      isAdmin: window.Drupal.settings.m6_platform_header.company_admin,
      showSettings: false,
      dataTable: true,
      projectId,
      showSearchingModal: false,
      showDeleteCommitmentModal: false,
      deleteCommitmentInfo: {},
      showLineItems: false,
      commitmentToShow: {},
      showLoading: false,
      commitmentId: '',
      lineItemId: '',
      createShowModal: false,
      editShowModal: false,
      commitmentToEdit: {},
      page: 1,
      commitmentNumberOpened: null,
      commitmentIdOpened: null,
      spendingDialog: false,
      projectRef: db.collection('cpm_projects').doc(projectId),
      commitmentTest: {},
      showForm: false,
      commitments: [],
      commitmentIndex: null,
      commitmentsTotal: 0,
      vendors: [],
      project: {},
      // variables for dialog spendings in commitments
      showSpendings: false,
      commitmentSpendingId: '',
      commitmentTitle: '',
      rowsPerPage: [
        10,
        50,
        100,
        { text: '$vuetify.dataIterator.rowsPerPageAll', value: 10 }
      ],
      isFullScreen: false,
      subheaders: [
        {
          text: this.$t('general.invoiceNumber'),
          value: 'number',
          align: 'left',
          class: 'header'
        },
        {
          text: this.$t('cpm.projects.budgetCategory'),
          sortable: false,
          align: 'left',
          class: 'header'
        },
        {
          text: this.$t('general.date'),
          value: 'date',
          align: 'center',
          class: 'header'
        },
        {
          text: this.$t('general.invoiceAmount'),
          value: 'amount',
          align: 'right',
          class: 'header'
        }
      ],
      pagination: {
        sortBy: 'number',
        descending: true,
        rowsPerPage: 10,
        totalItems: 0,
        page: 1
      }
    }
  },
  computed: {
    indexParameters() {
      return {
        projectId: this.projectId,
        page: this.pagination.page,
        search: this.search || '',
        sort: this.pagination.descending ? 'DESC' : 'ASC',
        sortBy: this.pagination.sortBy,
        limit: this.pagination.rowsPerPage
      }
    },

    isFullScreenPage() {
      return this.$h.dg(this.$route, 'name.cpm.projects.fullscreen') === 'cpm.projects.fullscreen'
    },

    alignActions() {
      if (!this.isFullScreen || !this.isFullScreenPage) {
        return 'end'
      } else {
        return 'center'
      }
    },

    poAmount() {
      return this.$h.dg(this.project, 'totals.commitmentTotal', 0)
    },

    poTax() {
      return this.$h.dg(this.project, 'totals.openCommitmentTotal', 0)
    },

    headers() {
      if (this.isFullScreen || this.isFullScreenPage) {
        return [
          {
            text: this.$t('cpm.projects.poNumber'),
            value: 'number',
            align: 'left',
            class: 'header'
          },
          {
            text: this.$t('cpm.projects.vendor'),
            value: 'vendor',
            align: 'left',
            class: 'header',
            sortable: false
          },
          {
            text: this.$t('cpm.projects.budgetCategory'),
            value: 'budget_category.name',
            align: 'left',
            class: 'header'
          },
          {
            text: this.$t('general.description'),
            value: 'notes',
            align: 'left',
            class: 'header',
            sortable: false
          },
          {
            text: this.$t('cpm.projects.commitmentTotal'),
            value: 'amount',
            align: 'right',
            class: 'header'
          },
          {
            text: this.$t('cpm.projects.invoiceTotal'),
            value: 'spendingAmount',
            align: 'right',
            class: 'header'
          },
          {
            text: this.$t('cpm.projects.balance'),
            value: 'openAmount',
            align: 'right',
            class: 'header'
          },
          {
            text: this.$t('general.date'),
            value: 'completionDate',
            align: 'center',
            class: 'header',
            sortable: false
          },
          {
            text: this.$t('general.actions'),
            value: 'actions',
            sortable: false,
            align: 'center',
            class: 'header'
          }
        ]
      } else {
        return [
          {
            text: this.$t('cpm.projects.poNumber'),
            value: 'number',
            align: 'left',
            class: 'header'
          },
          {
            text: this.$t('cpm.projects.vendor'),
            value: 'vendor',
            align: 'left',
            class: 'header',
            sortable: false
          },
          {
            text: this.$t('cpm.projects.po'),
            value: 'total_po_amount',
            align: 'right',
            class: 'header'
          },
          {
            text: this.$t('cpm.projects.open'),
            value: 'total_open_po_w_tax',
            align: 'right',
            class: 'header'
          },
          {
            text: this.$t('general.date'),
            value: 'completionDate',
            align: 'center',
            class: 'header',
            sortable: false
          },
          {
            text: this.$t('general.actions'),
            value: 'actions',
            sortable: false,
            align: 'center',
            class: 'header'
          }
        ]
      }
    },
    dropdownOptions() {
      return [
        {
          icon: 'assignment',
          title: this.$t('general.seeTheResource', {
            resource: this.$tc('cpm.projects.lineItem', 2)
          }),
          event: 'see'
        },
        {
          icon: 'edit',
          title: this.$t('general.edit'),
          event: 'edit'
        },
        {
          icon: 'attach_money',
          title: this.$t('general.showSpendings'),
          event: 'attach'
        },
        {
          icon: 'delete',
          title: this.$t('general.delete'),
          event: 'delete'
        }
      ]
    }
  },

  watch: {
    poAmount: function () {
      this.fetchResources()
    },
    'pagination.totalItems': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue !== this.resourcesRaw.length) {
          this.fetchResources()
        }
      }
    }
  },

  mounted() {
    // TODO: Change behaviour instead of refreshing everytime when something change or an spending event change to something better
    EventBus.$on('refresh-commitments-panel-by-spendings', this.fetchResources)
    EventBus.$on('reload-commitments', this.fetchResources)
  },

  methods: {
    ...mapActions('companies/cpmProjects/commitments', {
      indexResource: 'index'
    }),
    ...mapActions('cpm/projects/commitments', {
      deleteCommitmentStore: 'delete'
    }),

    assignResourcesData({ data, meta: { lastPage, total } } = {}) {
      if (lastPage && this.pagination.page > lastPage) {
        this.pagination.page = 1
        return this.fetchResources()
      }

      this.resourcesRaw = data.map(item => ({
        ...item,
        invoices: [],
        line_items: []
      }))
      this.pagination.totalItems = total
    },

    clearSearch() {
      this.search = ''
      this.fetchResources()
    },

    onSearch(search) {
      this.search = search
      this.showSearchingModal = false
      this.fetchResources()
    },

    updateCommitmentsTotals() {
      return new Promise(async (resolve, reject) => {
        try {
          await axios.post(
            `${window.Drupal.settings.m6_platform.f_base.functions.api_url}/api/projects/${this.projectId}/update-commitments`
          )
          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
    },

    checkFullScreen(value) {
      this.isFullScreen = value
    },

    async openModalSpendings(commitment) {
      this.showSpendings = true
      this.commitmentSpendingId = commitment.id
      this.commitmentTitle = commitment.number

      if (!commitment.line_items) {
        this.$set(commitment, 'invoices', [])
      }

      const spendings = await this.projectRef
        .collection('spendings')
        .where(
          'commitment',
          '==',
          this.projectRef.collection('commitments').doc(commitment.id)
        )
        .get()

      commitment.invoices = spendings.docs.map(async spend => {
        const spendData = spend.data()
        spendData.id = spend.id

        return spendData
      })
    },

    closeModalSpendings() {
      this.showSpendings = false
      this.commitmentSpendingId = ''
      this.commitmentTitle = ''
    },

    async displayLineItems(commitment) {
      this.commitmentToShow = commitment
      this.showLineItems = true

      const snapshot = await this.projectRef
        .collection('commitments')
        .doc(commitment.id)
        .collection('line_items')
        .get()

      if (!commitment.line_items) {
        this.$set(commitment, 'line_items', [])
      }

      commitment.line_items = snapshot.docs.map(doc => {
        const lineItem = doc.data()
        lineItem.id = doc.id

        return lineItem
      })
    },

    closeDisplayLineItems() {
      this.reload()
      this.showLineItems = false
      this.commitmentToShow = {}
    },

    async settingCommitmentDelete(commitmentId, commitmentNumber, commitmentIndex) {
      if (this.hasInvoices(commitmentId)) {
        this.$snotify.error(this.$t('cpm.projects.invoicesCommitment'))
        return
      }

      const commitmentRef = this.projectRef
        .collection('commitments')
        .doc(commitmentId)

      const spendingSnap = await this.projectRef
        .collection('spendings')
        .where('commitment', '==', commitmentRef)
        .get()

      if(!spendingSnap.empty) {
        this.infoTitle = 'Commitment can\'t be deleted'
        this.showInfo = true
        this.associatedSpending = await spendingSnap.docs.map(doc => {
          return doc.data().number
        })
        return
      }

      this.deleteCommitmentInfo = {
        commitmentId,
        commitmentNumber,
        commitmentIndex
      }
      this.showDeleteCommitmentModal = true
    },

    hasInvoices(id) {
      const commitment = this.commitments.find(
        commitment => commitment.id === id
      )

      const commitmentInvoices = this.$h.dg(commitment, 'invoices', [])

      return Boolean(commitmentInvoices.length)
    },

    cancelCommitmentDelete() {
      this.deleteCommitmentInfo = {}
      this.showDeleteCommitmentModal = false
    },

    whichCommitmentToEdit(commitment) {
      this.commitmentToEdit = commitment
      this.editShowModal = true
    },

    async reload(commitment) {
      if (commitment) {
        this.$nextTick(() => this.addResourceIfNotExists(commitment))
      }
      this.dataTable = false
      this.createShowModal = false
      this.editShowModal = false
      this.commitmentId = ''
      this.lineItemId = ''
      await this.fetchResources()
      if (this.$h.dg(this.commitmentToShow, 'id')) {
        this.displayLineItems(this.commitmentToShow)
      }
      this.refreshFinancialCostSummary()
      this.updateCommitmentsTotals()
      this.$nextTick(() => {
        this.dataTable = true
        EventBus.$emit('reload-reconciliation-commitments')
      })
    },

    addResourceIfNotExists(resource) {
      if (!this.$h.dg(resource, 'id')) return

      const index = this.lodash.findIndex(this.resourcesRaw, {
        id: resource.id
      })
      if (index === -1) {
        this.resourcesRaw.unshift(resource)
      }
    },

    commitmentUpdated(item) {
      this.commitments[this.commitmentIndex].line_items[
        this.lineItemIndex
      ] = item
      this.closeCommitment()
    },

    closeCommitment() {
      this.showForm = false
      this.commitmentId = null
      this.commitmentIndex = null
    },

    newCommitment() {
      const commitmentNumber = this.project.nextCommitmentNumber
      this.projectRef.update({
        nextCommitmentNumber: parseInt(commitmentNumber) + 1
      })
      let idString = '00000' + commitmentNumber
      idString = idString.substr(idString.length - 5)
      const year = new Date().getFullYear()
      this.projectRef
        .collection('commitments')
        .add({
          number: `COM-${idString}-${year}`,
          title: '',
          createdAt: new Date(),
          amount: 0,
          invoiceTotal: 0,
          startDate: new Date().toISOString()
        })
        .then(doc => {
          this.project.files[1].children[9].children.push({
            name: `COM-${idString}-${year}`,
            path: this.project.files[1].children[9].path + '/' + doc.id,
            children: []
          })

          this.projectRef.update({ files: this.project.files })

          doc
            .get()
            .then(doc => {
              if (doc.exists) {
                const commitmentObject = doc.data()
                commitmentObject.id = doc.id
                commitmentObject.poBalance = 0
                this.commitments.push(commitmentObject)
                this.resources.push(commitmentObject)
                this.reload()
              } else {
                console.error(this.$t('cpm.projects.NoSuchDocument'))
              }
            })
            .catch(function (error) {
              console.error(this.$t('cpm.projects.errorDocument'), error)
            })
        })
    },

    deleteCommitment() {
      const { commitmentId, commitmentIndex } = this.deleteCommitmentInfo
      this.showLoading = true

      this.deleteCommitmentStore({
        projectId: this.projectId,
        commitmentId: commitmentId
      })
        .then(() => {
          this.commitments.splice(commitmentIndex, 1)
          this.cancelCommitmentDelete()
          this.showLoading = false
          this.$snotify.success(
            this.$t('cpm.projects.commitmentDelete'),
            this.$t('alerts.success')
          )
          this.reload()
        })
        .catch(() => {
          this.cancelCommitmentDelete()
          this.showLoading = false
          this.$snotify.error(
            this.$t('general.thereErrorDeleting'),
            this.$t('alerts.error')
          )
        })
    },

    openSpending(commitmentNumber, commitmentId) {
      this.commitmentNumberOpened = commitmentNumber
      this.commitmentIdOpened = commitmentId
      this.spendingDialog = true
    },

    formatDateToText(date) {
      if (date) {
        const dateObj = DateTime.fromISO(date)
        return dateObj.toFormat('MM/dd/yyyy')
      }
      return ''
    },

    getVendors() {
      this.showLoading = true
      axios
        .post('/m6-platform/api/general', { action: 'get_vendors' })
        .then(result => {
          this.vendors = result.data.result
          this.showLoading = false
        })
        .catch(() => {
          this.showLoading = false
          this.$snotify.error(
            `${this.$t('general.thereWasError')} ${this.$t(
              'general.pleaseRefreshPage'
            )},`,
            this.$t('alerts.error')
          )
        })
    },

    refreshFinancialCostSummary() {
      EventBus.$emit('refresh-financial-cost-summary')
    },

    async fetchSpending(props) {
      const index = props.index
      const commitment = props.item
      if (!this.$h.dg(commitment, 'id') || !(this.isFullScreen || this.isFullScreenPage)) return

      if (!this.resources[index].spending) {
        this.$set(this.resources[index], 'spending', [])
        const spending = await this.projectRef
          .collection('spendings')
          .where(
            'commitment',
            '==',
            this.projectRef.collection('commitments').doc(commitment.id)
          )
          .get()

        const allSpending = await Promise.all(
          spending.docs.map(async spend => {
            const spendData = spend.data()
            spendData.id = spend.id

            if (this.$h.dg(spendData, 'budget_category.ref.id')) {
              const docBudgetCategory = await spendData.budget_category.ref.get()
              spendData.budget_category.name = this.$h.dg(
                docBudgetCategory.data(),
                'name'
              )
              spendData.budget_category.code = this.$h.dg(
                docBudgetCategory.data(),
                'code'
              )
            }

            return spendData
          })
        )
        this.$set(this.resources[index], 'spending', allSpending)
        props.expanded = !props.expanded
      } else {
        props.expanded = !props.expanded
      }
    }
  },

  firestore() {
    return {
      project: db.collection('cpm_projects').doc(this.projectId)
    }
  }
}
</script>

<style lang="scss" scoped>
.cpm-panel {
  margin-bottom: 10px;
}

.card-container {
  padding: 15px;
  max-height: 480px;
  overflow-y: auto;
  overflow-x: hidden;
}

.dependency-details {
  line-height: 1.2;

  p:first-child {
    font-size: 16px;
  }

  font-size: 12px;
}

.flex .text-xs-center p {
  margin: 0px;
}

.search-activated {
  margin-top: 0px;
}
.search {
  cursor: pointer;
  color: white;
}
.close-search {
  cursor: pointer;
  color: white;
}
.action-buttons {
  width: 85px;
}
.action-icon {
  cursor: pointer;
}
</style>
