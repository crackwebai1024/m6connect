<template>
  <m6-card-dialog
    min-height="0"
    :title="$t('cpm.projects.reconciliationPanel.title')"
    :title-tooltip="$t('general.doubleClickSeeMore')"
    @fullscreen="checkFullScreen"
    ref="cardDialogReconciliation"
  >
    <template v-slot:after:title>
      <v-icon
        dark
        flat
        @click="$refs.cardDialogReconciliation.doubleClick()"
      >
        launch
      </v-icon>

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
      <v-chip
        color="transparent"
        disabled
        text-color="black"
      >
        <strong>{{ $t('cpm.projects.reconciliationPanel.spent') }} {{ (poSpend || 0) | currency }}</strong>
      </v-chip>
    </v-layout>

    <m6-data-table
      :align-actions="alignActions"
      class="elevation-0"
      :expand="false"
      :headers="headers"
      :items="resources"
      :pagination.sync="pagination"
      :rows-per-page-items="rowsPerPage"
      :total-items="pagination.totalItems"
      @update:pagination="debounceSearch(search, false)"
      fixed-header
    >
      <template v-slot:items="props">
        <tr
          class="step6"
          @click="fetchSpending(props)"
        >
          <td
            v-if="isFullScreen || isFullScreenPage"
            class="pl-20 text-xs-left"
          >
            <v-layout v-if="$h.dg(props.item, 'budget_category.code')">
              {{ props.item.budget_category.code }} -
              {{ $h.dg(props.item, 'budget_category.name', '') }}
            </v-layout>
          </td>
          <td class="pl-20 text-xs-left">
            <v-layout>{{ props.item.number }}</v-layout>
          </td>
          <td
            v-if="isFullScreen || isFullScreenPage"
            class="pl-20"
          >
              <template v-for="vendor in removeDuplicates(props.item.vendors)">
                {{ vendor }}
              </template>
          </td>

          <td
            v-if="isFullScreen || isFullScreenPage"
            class="pl-20"
          >
            <v-layout justify-center>{{ $h.dg(props.item, 'notes', '') }}</v-layout>
          </td>
          <td
            v-if="isFullScreen || isFullScreenPage"
            class="pl-20 text-xs-center"
          >
            <v-layout justify-center>
              <v-flex shrink>
                {{ formatDateToText(props.item.completionDate) || '' }}
              </v-flex>
            </v-layout>
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

          <td class="text-xs-center">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="icon-verified"
                  :color="
                    getVerifiedStatusProperty(
                      $h.dg(props, 'item.verifiedStatus', 'noValidated'),
                      'color'
                    )
                  "
                  fab
                  small
                  v-on="on"
                  @click="openReconciliationModal(props.item)"
                />
              </template>
              <span>{{
                getVerifiedStatusProperty(
                  $h.dg(props, 'item.verifiedStatus', 'noValidated'),
                  'text'
                )
              }}</span>
            </v-tooltip>
          </td>

          <td class="text-xs-center">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon
                  :color="
                    getM6VerifiedStatus(
                      $h.dg(props, 'item.openAmount'),
                      'color'
                    )
                  "
                  large
                  v-on="on"
                >
                  {{
                    getM6VerifiedStatus($h.dg(props, 'item.openAmount'), 'icon')
                  }}
                </v-icon>
              </template>
              <span>{{
                getM6VerifiedStatus($h.dg(props, 'item.openAmount'), 'text')
              }}</span>
            </v-tooltip>
          </td>

          <td class="td-actions text-xs-center">
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
              :expand="false"
            >
              <template v-slot:headers="headerProps">
                <tr>
                  <th
                    v-for="header in headerProps.headers"
                    :key="header.text"
                    :class="header.class"
                  >
                    <template
                      v-if="header.text === $t('general.invoiceAmount')"
                    >
                      <v-layout
                        align-center
                        justify-end
                      >
                        <v-flex shrink>
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-icon
                                color="primary"
                                large
                                v-on="on"
                                @click="addSpending(props)"
                              >
                                add
                              </v-icon>
                            </template>
                            <span>Add Invoice</span>
                          </v-tooltip>
                        </v-flex>
                        <v-flex shrink>
                          {{ header.text }}
                        </v-flex>
                      </v-layout>
                    </template>
                    <template v-else>
                      {{ header.text }}
                    </template>
                  </th>
                </tr>
              </template>
              <template v-slot:items="props">
                <tr 
                  class="step6"
                  @click="fetchSpendingLineItems(props)"
                >
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
                </tr>
              </template>
              
              <template v-slot:expand="props">
              <v-card flat>
                <v-progress-circular
                  v-show="loadingExpandedSpendingLineItems"
                  color="primary"
                  indeterminate
                  :size="32"
                />
                <v-data-table
                    v-show="!loadingExpandedSpendingLineItems"
                    :headers="headersLineItems"
                    hide-actions
                    :items="commitmentSpendingExpanded.lineItems"
                  >
                    <template
                      slot="items"
                      slot-scope="props"
                    >
                      <td class="text-xs-center">
                        {{ props.item.number }}
                      </td>
                      <td class="text-xs-center">
                        {{ props.item.vendor ? props.item.vendor.title : '' }}
                      </td>
                      <td class="text-xs-center">
                        {{ props.item.account_category }}
                        {{ props.item.category }}
                      </td>
                      <td class="text-xs-center">
                        {{ props.item.dateText }}
                      </td>
                      <td class="text-xs-center">
                        {{ props.item.line_number }}
                      </td>
                      <td class="text-xs-center">
                        {{ props.item.line_description }}
                      </td>
                      <td class="text-xs-center">
                        {{ props.item.amount | currency }}
                      </td>
                      <td class="pa-0 text-xs-center">
                        <v-flex>
                          <v-icon
                            class="ml-0 mr-2"
                            color="#757575"
                            size="20"
                            style="cursor: pointer"
                            @click="openEditLineItem(props.item)"
                          >
                            edit
                          </v-icon>

                          <v-icon
                            class="ml-0 mr-0"
                            color="#f44336"
                            size="20"
                            style="cursor: pointer"
                            @click="deleteExpandedSpendingLineItem(props.item)"
                          >
                            delete
                          </v-icon>
                        </v-flex>
                      </td>
                    </template>
                  </v-data-table>
              </v-card>
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

    <reconciliation-modal
      v-if="showReconciliationModal"
      :commitment-to-edit="commitmentToEdit"
      :is-manager="isManager"
      :verified-status="verifiedStatus"
      @close-dialog="closeReconciliationModal"
    />

    <reconciliation-spending-form
      v-if="showSpendingForm"
      :commitment="commitmentProp.item"
      @close="showSpendingForm = false"
      @refresh="refreshSpendingFromCommitment"
    />
    
    <spending-lineitem-modal
      :show="showExpandedSpendingLineItems"
      :spending-id="commitmentSpendingExpanded.id"
      :line-item="expandedSpendingLineItem"
      :project-id="projectId"
      @close="closeExpandedSpendingLineItems"
    >
    </spending-lineitem-modal>
    
    <m6-confirm-delete
      :message="
        $t('general.sureDeleteResource', {
          resource: $tc('cpm.projects.lineItem', 1)
        })
      "
      :show="expandedSpendingLineItemDeleteModal"
      :title="
        $t('general.deleteResource', {
          resource: $tc('cpm.projects.lineItem', 1)
        })
      "
      @cancel="cancelExpandedSpendingLineItemDelete"
      @confirm="confirmDelete"
    />
  </m6-card-dialog>
</template>

<script>
import axios from 'axios'
import { DateTime } from 'luxon'
import { mapActions, mapGetters } from 'vuex'
import { db } from '@/utils/Firebase'
import EventBus from '@/Eventbus'
import mixins from '@/components/_mixins/index'
import FinancialCommitmentsModal from '../modals/FinancialCommitmentsModal'
import LineItemsShow from '../modals/LineItemsShow'
import SearchingModal from '../modals/SearchingModal'
import Reconciliation from '../modals/Reconciliation'
import settingsModal from '../settings_modals/FinancialCommitments.vue'
import DialogSpendingsInCommitments from './DialogSpendingsInCommitments'
import ReconciliationSpendingForm from '../modals/ReconciliationSpendingForm'
import FinancialSpendingLineItemEditModal from '../modals/FinancialSpendingLineItemEditModal'
export default {
  name: 'Reconciliation',
  components: {
    'financial-commit-modal': FinancialCommitmentsModal,
    'line-items-show': LineItemsShow,
    searching: SearchingModal,
    'settings-modal': settingsModal,
    'dialog-spendings-in-commitments': DialogSpendingsInCommitments,
    'reconciliation-modal': Reconciliation,
    ReconciliationSpendingForm,
    'spending-lineitem-modal': FinancialSpendingLineItemEditModal
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
      commitmentProp: null,
      showReconciliationModal: false,
      verifiedStatus: [
        {
          value: 'noValidated',
          text: this.$t(
            'cpm.projects.reconciliationPanel.noValidatedInformation'
          ),
          color: 'primary',
          icon: 'done_outline'
        },
        {
          value: 'problemIdentified',
          text: this.$t('cpm.projects.reconciliationPanel.problemIdentified'),
          color: 'error',
          icon: 'error'
        },
        {
          value: 'correctData',
          text: this.$t('cpm.projects.reconciliationPanel.correctData'),
          color: 'success',
          icon: 'check_circle'
        },
        {
          value: 'potentialProblem',
          text: this.$t('cpm.projects.reconciliationPanel.potentialProblem'),
          color: 'yellow',
          icon: 'warning'
        }
      ],
      m6VerifiedStatus: [
        {
          value: 'POMissing',
          text: this.$t('cpm.projects.reconciliationPanel.noPOReceived'),
          color: 'error',
          icon: 'help'
        },
        {
          value: 'POReceived',
          text: 'We have received the Total PO Amount',
          color: 'success',
          icon: 'done_all'
        }
      ],
      selectedCommitment: null,
      isAdmin: window.Drupal.settings.m6_platform_header.company_admin,
      showSettings: false,
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
        { text: '$vuetify.dataIterator.rowsPerPageAll', value: 10000 }
      ],
      isFullScreen: false,
      subheaders: [
        {
          text: this.$t('general.invoiceNumber'),
          value: 'number',
          align: 'left',
          class: 'header text-xs-left'
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
          class: 'header text-xs-center'
        },
        {
          text: this.$t('general.invoiceAmount'),
          value: 'amount',
          align: 'right',
          class: 'header text-xs-right'
        }
      ],
      pagination: {
        sortBy: this.$t('general.number'),
        descending: false,
        rowsPerPage: 10,
        totalItems: 0,
        page: 1
      },
      showSpendingForm: false,
      // Line items spending line items
      headersLineItems: [
        {
          text: `${this.$tc('general.invoice', 1)} #`,
          align: 'center',
          value: 'number'
        },
        {
          text: this.$t('cpm.projects.vendorName'),
          align: 'center',
          value: 'vendor'
        },
        {
          text: this.$tc('general.category', 1),
          align: 'center',
          value: 'category'
        },
        { text: this.$t('general.date'), align: 'center', value: 'dateText' },
        {
          text: `${this.$t('general.line')} #`,
          align: 'center',
          value: 'line_number'
        },
        {
          text: this.$t('general.lineItemDescr'),
          align: 'center',
          value: 'line_description'
        },
        { text: this.$t('general.amount'), align: 'right', value: 'amount' },
        {
          text: this.$t('general.actions'),
          align: 'center',
          value: 'actions',
          sortable: false
        }
      ],
      commitmentListExpanded: {},
      commitmentSpendingExpanded: {},
      loadingExpandedSpendingLineItems: false,
      showExpandedSpendingLineItems: false,
      expandedSpendingLineItem: {},
      expandedSpendingLineItemDeleteModal: false,
      expandedSpendingLineItemToDelete: {}
    }
  },
  computed: {
    ...mapGetters('companies/cpmProjects/general', ['isManager']),
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
    poSpend() {
      return this.$h.dg(this.project, 'totals.spendingTotal', 0)
    },
    headers() {
      if (this.isFullScreen || this.isFullScreenPage) {
        return [
          {
            text: this.$t('cpm.projects.budgetCategory'),
            value: 'budget_category.name',
            align: 'left',
            class: 'header'
          },
          {
            text: this.$t('cpm.projects.poNumber'),
            value: 'number',
            align: 'left',
            class: 'header'
          },
          {
            text: this.$t('general.vendor'),
            value: 'vendor',
            align: 'left',
            class: 'header',
            sortable: false
          },
          {
            text: this.$t('general.amount'),
            value: 'amount',
            align: 'right',
            class: 'header'
          },
          {
            text: this.$t('cpm.projects.spending'),
            value: 'spendingAmount',
            align: 'right',
            class: 'header'
          },
          {
            text: this.$t('general.balance'),
            value: 'openAmount',
            align: 'right',
            class: 'header'
          },
          {
            text: this.$t('cpm.projects.reconciliationPanel.reconciliation'),
            value: 'verifiedStatus',
            align: 'center',
            class: 'header'
          },
          {
            text: this.$t('cpm.projects.reconciliationPanel.m6Verified'),
            value: 'openAmount',
            align: 'center',
            class: 'header'
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
            text: this.$t('cpm.projects.reconciliationPanel.reconciliation'),
            value: 'verifiedStatus',
            align: 'center',
            class: 'header'
          },
          {
            text: this.$t('cpm.projects.reconciliationPanel.m6Verified'),
            value: 'openAmount',
            align: 'center',
            class: 'header'
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
    this.fetchBidManagers().catch(console.error)
    this.fetchProjectManagers().catch(console.error)
    // TODO: Change behaviour instead of refreshing everytime when something change or an spending event change to something better
    EventBus.$on('refresh-commitments-panel-by-spendings', this.fetchResources)
    EventBus.$on('reload-reconciliation-commitments', this.fetchResources)
  },
  methods: {
    removeDuplicates(array = []) {
      const unique = new Set(array)
      return [...unique]
    },
    ...mapActions('companies/cpmProjects/commitments', {
      indexResource: 'index'
    }),
    ...mapActions('companies/cpmProjects/general', [
      'fetchBidManagers',
      'fetchProjectManagers'
    ]),
    
    ...mapActions('cpm/projects/spending', {
      submitDeleteLineItem: 'deleteLineItem'
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
            `${process.env.VUE_APP_FIREBASE_APIURL}/api/projects/${this.projectId}/update-commitments`
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
    
    closeExpandedSpendingLineItems() {
      this.showExpandedSpendingLineItems = false
      this.fetchSpendingLineItems(this.commitmentSpendingExpanded)
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
    settingCommitmentDelete(commitmentId, commitmentNumber, commitmentIndex) {
      if (this.hasInvoices(commitmentId)) {
        this.$snotify.error(this.$t('cpm.projects.invoicesCommitment'))
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
      this.createShowModal = false
      this.editShowModal = false
      this.commitmentToEdit = null
      this.commitmentId = ''
      this.lineItemId = ''
      await this.fetchResources()
      if (this.$h.dg(this.commitmentToShow, 'id')) {
        this.displayLineItems(this.commitmentToShow)
      }
      this.refreshFinancialCostSummary()
      this.updateCommitmentsTotals()
      EventBus.$emit('reload-commitments')
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
      this.projectRef
        .collection('commitments')
        .doc(commitmentId)
        .collection('line_items')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.projectRef
              .collection('commitments')
              .doc(commitmentId)
              .collection('line_items')
              .doc(doc.id)
              .delete()
          })
          this.projectRef
            .collection('commitments')
            .doc(commitmentId)
            .delete()
          this.commitments.splice(commitmentIndex, 1)
          this.cancelCommitmentDelete()
          this.showLoading = false
          this.$snotify.success(
            this.$t('cpm.projects.commitmentDelete'),
            this.$t('alerts.success')
          )
          this.updateCommitmentsTotals()
          this.refreshFinancialCostSummary()
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
    async fetchSpending(props, refresh = false) {
      this.commitmentListExpanded = props.item
      const index = props.index
      const commitment = props.item
      if (!this.$h.dg(commitment, 'id') || !(this.isFullScreen || this.isFullScreenPage)) return
      if (!this.resources[index].spending || refresh) {
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
    },
    
    fetchSpendingLineItems(props) {
      this.commitmentSpendingExpanded = props.item ? { ...props.item } : { ...props }
      props.expanded = !props.expanded
      this.getExpandedSpendingLineItems()
    },
    
    getExpandedSpendingLineItems() {
      return new Promise((resolve, reject) => {
        
        if(this.commitmentSpendingExpanded.id && this.commitmentListExpanded.id) {
          
          this.loadingExpandedSpendingLineItems = true;
        
          try {
            db.collection('cpm_projects')
              .doc(this.projectId)
              .collection('spendings')
              .doc(this.commitmentSpendingExpanded.id)
              .collection('line_items')
              .get()
              .then(snap => {
                if (!snap.empty) {
                  resolve(true)
                }
  
                this.commitmentSpendingExpanded.lineItems = snap.docs.map(doc => {
                  const lineItem = doc.data()
                  lineItem.id = doc.id
  
                  return lineItem
                })
                
                this.loadingExpandedSpendingLineItems = false
              })
          } catch (error) {
            reject(error)
            this.loadingExpandedSpendingLineItems = false
          }
        }
        
      })
    },
    getVerifiedStatusProperty(status = 'noValidated', property) {
      if (!property) return ''
      const verifiedStatus = this.verifiedStatus.find(
        ele => ele.value === status
      )
      return this.$h.dg(verifiedStatus, property)
    },
    openReconciliationModal(commitmet) {
      this.commitmentToEdit = commitmet
      this.showReconciliationModal = true
    },
    closeReconciliationModal({ reload = false }) {
      this.showReconciliationModal = false
      if (reload) {
        this.reload()
      }
    },
    getM6VerifiedStatus(openAmount, property) {
      if (!property) return ''
      let m6VerifiedStatus = {}
      if (openAmount <= 0) {
        m6VerifiedStatus = this.m6VerifiedStatus.find(
          ele => ele.value === 'POMissing'
        )
      } else {
        m6VerifiedStatus = this.m6VerifiedStatus.find(
          ele => ele.value === 'POReceived'
        )
      }
      return this.$h.dg(m6VerifiedStatus, property)
    },
    addSpending(commitment) {
      this.commitmentProp = commitment
      this.showSpendingForm = true
    },
    refreshSpendingFromCommitment() {
      this.fetchSpending(this.commitmentProp, true).finally(() => {
        this.commitmentProp.expanded = !this.commitmentProp.expanded
        this.showSpendingForm = false
      })
      this.showSpendingForm = false
    },
    openEditLineItem(lineItem) {
      this.expandedSpendingLineItem = lineItem
      this.showExpandedSpendingLineItems = true
    },
    
    deleteExpandedSpendingLineItem(item) {
      // Line item added into the collection
      this.expandedSpendingLineItemDeleteModal = true
      this.expandedSpendingLineItemToDelete = item
    },
    
    cancelExpandedSpendingLineItemDelete() {
      this.expandedSpendingLineItemToDelete = {}
      this.lineItemDeleteModal = false
      this.fetchSpendingLineItems(this.commitmentSpendingExpanded)
    },
    
    confirmDelete() {
      const item = this.expandedSpendingLineItemToDelete
      if (item.id && this.commitmentSpendingExpanded.id) {
        this.showLoading = true
        
        this.submitDeleteLineItem({
          projectId: this.$route.params.id, 
          spendingId: this.commitmentSpendingExpanded.id, 
          lineItemId: item.id
        }).then(() => {
            // Delete from the lineitems
            this.showLoading = false
            this.$snotify.success(
              this.$t('general.lineItemDeleted'),
              this.$t('alerts.success')
            )
            
            this.cancelExpandedSpendingLineItemDelete()
          })
          .catch(() => {
            this.showLoading = false
            this.$snotify.error(
              this.$t('general.lineItemNotDeleted'),
              this.$t('alerts.error')
            )
            this.cancelExpandedSpendingLineItemDelete()
          })
      }
    },
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
.icon-verified {
  transition: all 0.2s ease-out;
  &:hover {
    transform: scale(1.1);
  }
}
.disabled {
  &:active {
    pointer-events: none;
  }
  cursor: default;
}
.td-actions {
  display: inline-flex;
}
</style>