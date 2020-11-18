<template>
  <v-container class="dont-show-scroll vertical-scroll">
    <v-row class="mx-0 my-4">
      <v-col
        class="pa-0"
        cols="12"
      >
        <v-card>
          <v-card-title class="headline px-6 py-3 white">
            <span class="grey--text text--darken-2 text-h6">
              Upload Document
            </span>
          </v-card-title>
          <v-divider class="grey lighten-3 z-index" />
          <v-card-text class="pb-5 px-6">
            <!-- Upload Document -->
            <v-form>
              <p class="blue--text mb-1 text--lighten-1">
                Step 1. Please upload your export file
              </p>
              <input
                accept=".xlsx"
                type="file"
                @change="onFileChange"
              >
            </v-form>
            <v-divider class="grey lighten-3 my-2 z-index" />
            <!-- File Upload Errors -->
            <template v-show="!showStep2Loader">
              <p
                v-for="(fileError, i) in fileErrors"
                :key="'fileError-' + i"
                class="mb-1 mt-4 red--text text--lighten-1"
              >
                <v-icon
                  color="red lighten-1"
                  size="16"
                >
                  mdi-close-box-outline
                </v-icon>
                {{ fileError }}
              </p>
            </template>
            <v-progress-circular
              v-show="showStep2Loader"
              color="blue"
              indeterminate
              size="20"
            />
            <!-- Select Headers -->
            <template v-if="firstRow === null && fileData && fileErrors.length === 0 && !showStep2Loader">
              <template v-if="!getHeadersByRow && fileData.headers">
                <p class="blue--text mb-1 mt-4 text--lighten-1">
                  Step 2. Are these your column headers?
                </p>
                <table-headers
                  class="table-headers"
                  :headers="fileData.headers"
                />
                <div
                  class="d-flex justify-end pt-4"
                >
                  <v-btn
                    @click="setHeaders(fileData.headers)"
                  >
                    Yes
                  </v-btn>
                  <v-btn
                    class="ml-3"
                    @click="getRows"
                  >
                    No
                  </v-btn>
                </div>
                <v-divider class="grey lighten-3 my-2 z-index" />
              </template>

              <template
                v-if="getHeadersByRow && fileErrors.length === 0 && !showStep2Loader"
              >
                <p class="blue--text mb-1 mt-4 text--lighten-1">
                  Step 2. Are these your column headers?
                </p>
                <v-select
                  item-text="label"
                  item-value="value"
                  :items="rows"
                  label="Select a Row"
                  return-object
                  @change="setStartRow"
                />
                <table-headers
                  v-if="rowSelected.length"
                  class="table-headers"
                  :headers="rowSelected"
                />
                <div
                  class="d-flex justify-end pt-4"
                >
                  <v-btn
                    @click="setHeaders(rowSelected)"
                  >
                    Yes
                  </v-btn>
                  <v-btn
                    class="ml-3"
                    @click="getRows"
                  >
                    No
                  </v-btn>
                </div>
                <v-divider class="grey lighten-3 my-2 z-index" />
              </template>

              <!-- Map Fields -->
              <template v-if="showStep3">
                <div class="d-flex justify-start">
                  <p
                    class="blue--text mb-0 mr-4 mt-4 text--lighten-1"
                  >
                    Step 3. Select M6 Template
                  </p>
                  <v-select
                    class="mb-4 mt-2 select-preset"
                    clearable
                    dense
                    item-text="name"
                    :items="presets"
                    label="Select..."
                    return-object
                    solo
                    style="max-width: 200px;"
                    @change="setPreset"
                  />
                </div>
                <v-simple-table class="presets-table table-headers">
                  <tbody class="d-flex">
                    <template
                      v-for="(header, hi) in importHeaders"
                    >
                      <tr
                        :key="hi"
                        class="d-flex flex-column preset-row"
                      >
                        <td class="d-none">
                          {{ hi+1 }}
                        </td>
                        <td class="align-center d-flex font-weight-bold justify-start text-caption">
                          {{ typeof(header) === 'string' || typeof(header) === 'number' ? header : '-' }}
                        </td>
                        <td
                          class="justify-start preset-select-content"
                          style="height: auto;"
                        >
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-autocomplete
                                v-model="mappedFields[hi]"
                                v-bind="attrs"
                                class="font-weight-bold justify-start mb-1 text-caption"
                                clearable
                                elevation="3"
                                item-text="name"
                                item-value="value"
                                :items="selectFields"
                                label="M6 Field Match"
                                v-on="on"
                              />
                            </template>
                            <span class="grey lighten- px-3 py-1 rounded white--text">Select M6 label which most closely matches your column header</span>
                          </v-tooltip>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </v-simple-table>
                <v-card-actions class="pa-0 pt-6">
                  <v-spacer />
                  <v-btn
                    @click="savePresetDialog = true"
                  >
                    Save Selections
                  </v-btn>
                </v-card-actions>
                <v-divider class="grey lighten-3 my-2 z-index" />
                <v-row class="d-flex flex-column justify-end ma-0">
                  <div class="d-flex justify-start">
                    <p
                      class="blue--text mb-3 text--lighten-1"
                    >
                      Step 4. Create Record
                    </p>
                  </div>
                  <v-btn
                    class="blue capitalize lighten-1 px-10 py-5 text-h6 white--text"
                    elevation="1"
                    text
                    @click="prepareToImport"
                  >
                    Create
                  </v-btn>
                </v-row>
              </template>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--Save Template Dialog-->
    <v-dialog
      v-if="savePresetDialog"
      v-model="savePresetDialog"
      width="450px"
    >
      <v-card>
        <v-card-title class="headline px-6 py-3 white">
          <span class="grey--text text--darken-2 text-h6">
            {{ preset.id ? 'Update Template' : 'Add New Template' }}
          </span>
        </v-card-title>
        <v-divider class="grey lighten-3 z-index" />
        <v-card-text class="px-6">
          <v-text-field
            v-model="preset.name"
            label="Name"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red"
            dark
            @click="closePresetDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue"
            dark
            @click="savePreset"
          >
            {{ preset.id ? 'Update' : 'Save' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="percentageDialog"
      max-width="600px"
      persistent
    >
      <v-card>
        <v-card-text class="py-4">
          <v-progress-linear
            height="25"
            stream
            :value="percentage"
          >
            <strong class="white--text">{{ Math.ceil(percentage) === 100 ? 'Done!' : `${Math.ceil(percentage)}%` }}</strong>
          </v-progress-linear>
        </v-card-text>
        <v-card-actions class="px-6 py-0">
          <v-spacer />
          <v-btn
            v-show="Math.ceil(percentage) >= 100"
            class="mb-3"
            color="blue darken-1"
            text
            @click="percentageDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import TableHeaders from '@/components/ImportTool/TableHeaders'
import { db, doFirebaseAuth, newFirebaseInit } from '@/utils/Firebase'
import { mapState } from 'vuex'

export default {
  /* eslint-disable camelcase */
  /* eslint-disable no-console */
  // eslint-disable-next-line vue/match-component-file-name
  name: 'ImportCPM',
  components: {
    TableHeaders
  },
  data() {
    return {
      file: '',
      fileData: [],
      fileErrors: [],
      sheetSelected: false,
      rowSelected: [],
      firstRow: null,
      getHeadersByRow: false,
      startRow: 0,
      showStep3: false,
      importHeaders: [],
      mappedFields: [],
      presets: [],
      fields: {
        projects: [
          {
            header: 'Project'
          },
          {
            name: 'Title',
            value: 'title'
          },
          {
            name: 'Description',
            description: ''
          },
          {
            name: 'ID/Number',
            description: ''
          },
          {
            name: 'Category',
            description: ''
          },
          {
            name: 'Contractor',
            description: ''
          },
          {
            name: 'startDate',
            description: ''
          },
          {
            name: 'End Date',
            description: ''
          },
          {
            name: 'Total Plan Budget',
            description: ''
          },
          {
            name: 'Phase',
            description: ''
          },
          {
            name: 'Forecasted',
            description: ''
          }
        ],
        commitments: [
          {
            header: 'Commitment'
          },
          {
            name: 'ID/Number',
            description: ''
          },
          {
            name: 'Start Date',
            description: ''
          },
          {
            name: 'Delivery Date',
            description: ''
          },
          {
            name: 'Budget Category',
            description: ''
          },
          {
            name: 'Cost Code Number',
            description: ''
          },
          {
            name: 'Vendor',
            description: ''
          }
        ],
        commitmentLineItem: [
          {
            header: 'Commitment Line Item'
          },
          {
            name: 'Account',
            description: ''
          },
          {
            name: 'Amount',
            description: ''
          },
          {
            name: 'Cost per Item',
            description: ''
          },
          {
            name: 'Line Number',
            description: ''
          },
          {
            name: 'PO ID/Number',
            description: ''
          },
          {
            name: 'Open Amount',
            description: ''
          },
          {
            name: 'Quantity',
            description: ''
          },
          {
            name: 'Start Date',
            description: ''
          },
          {
            name: 'Tax Amount',
            description: ''
          },
          {
            name: 'Title',
            description: ''
          }
        ],
        spendings: [
          {
            header: 'Spending'
          },
          {
            name: 'ID/Number',
            description: ''
          },
          {
            name: 'Budget Category',
            description: ''
          },
          {
            name: 'Contingency',
            description: ''
          },
          {
            name: 'Cost Code Text',
            description: ''
          },
          {
            name: 'Cost Code Number',
            description: ''
          },
          {
            name: 'Commitment ID/Number',
            description: ''
          },
          {
            name: 'Status',
            description: ''
          }
        ],
        spendingLineItem: [
          {
            header: 'Spending Line Item'
          },
          {
            name: 'Account',
            description: ''
          },
          {
            name: 'Account Category',
            description: ''
          },
          {
            name: 'Amount',
            description: ''
          },
          {
            name: 'Start Date',
            description: ''
          },
          {
            name: 'Description',
            description: ''
          },
          {
            name: 'Line Number',
            description: ''
          },
          {
            name: 'ID/Number',
            description: ''
          },
          {
            name: 'Paid Date',
            description: ''
          },
          {
            name: 'Commitment ID/Number',
            description: ''
          },
          {
            name: 'Vendor',
            description: ''
          }
        ]
      },
      preset: {},
      savePresetDialog: false,
      types: [],
      showStep2Loader: false,
      budgetCategories: [],
      rowNumber: 0,
      percentage: 0,
      percentageDialog: false
    }
  },
  computed: {
    ...mapState('Companies', {
      currentCompany: 'currentCompany'
    }),
    rows() {
      const data = []

      for (let i = this.startRow; i <= this.startRow + 20; i++) {
        data.push({
          label: i + 1,
          value: this.fileData.data[i]
        })
      }

      return data
    },
    selectFields() {
      const returnFields = []
      let lastHeader = ''
      Object.keys(this.fields).forEach(section => {
        this.fields[section].forEach(field => {
          if (field.header) {
            lastHeader = field.header
            returnFields.push({
              ...field
            })
          } else {
            returnFields.push({
              ...field,
              name: `${lastHeader} - ${field.name}`,
              value: `${section}_${field.name.replace(/\s/g, '_').replace(/\//g, '_').toLowerCase()}`
            })
          }
        })
      })
      return returnFields
    }
  },
  async created() {
    // Init Firebase
    await newFirebaseInit()
    await doFirebaseAuth()
    await this.$store.dispatch('ImportCPM/getPresets').then(response => (this.presets = response))
    this.getBudgetCategories()
  },
  methods: {
    setStartRow(a) {
      this.rowNumber = a.label
      this.rowSelected = a.value
    },
    closePresetDialog() {
      if (!this.preset.id) {
        this.preset = {}
      }
      this.savePresetDialog = false
    },
    savePreset() {
      // Modify undefined values
      for (let i = 0; i < this.mappedFields.length; i++) {
        if (!this.mappedFields[i]) {
          this.mappedFields[i] = ''
        }
      }

      if (this.preset.id) {
        this.$store.dispatch('ImportCPM/updatePreset', {
          ...this.preset,
          mappedFields: this.mappedFields
        })
      } else {
        this.$store.dispatch('ImportCPM/addPreset', {
          ...this.preset,
          mappedFields: this.mappedFields
        })
      }
      this.savePresetDialog = false
    },
    setPreset(item) {
      if (item) {
        this.preset = item
        this.mappedFields = item.mappedFields || []
      } else {
        this.preset = {}
        this.mappedFields = []
      }
    },
    getRows() {
      this.getHeadersByRow = true
      this.showStep3 = false
    },
    onFileChange(e) {
      this.fileErrors = []
      this.showStep2Loader = true
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        this.showStep2Loader = false
        return
      }
      // TODO: move this to store
      const formData = new FormData()
      formData.append('file', files[0])
      this.axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/cpm-import/parse`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(({ data } = {}) => {
        const noEmptyHeaders = data.headers.filter(header => header !== null)
        const noEmptyFields = data.data.filter(field => field !== null)
        if (noEmptyHeaders.length === 0 && noEmptyFields.length === 0) {
          this.fileErrors = ['There are no headers in this file']
        } else {
          this.fileData = data
          this.fileErrors = []
        }
        this.showStep2Loader = false
      }).catch(error => {
        this.fileErrors = [error.message]
        this.showStep2Loader = false
      })
    },
    setHeaders(headers) {
      this.importHeaders = headers
      this.showStep3 = true
    },
    prepareToImport() {
      let projectsCheck = false
      let commitmentsToCheck = false
      let spendingsToCheck = false
      const errors = []

      // Verify the headers

      this.mappedFields.forEach(item => {
        if (item.includes('projects_id_number') !== false) {
          projectsCheck = true
        }

        if (item.includes('commitments_id_number') !== false) {
          commitmentsToCheck = true
        }
        if (item.includes('spendings_id_number') !== false) {
          spendingsToCheck = true
        }
      })

      if (projectsCheck && !errors.length) {
        if (commitmentsToCheck) {
          this.types.push('commitments')
        }
        if (spendingsToCheck) {
          this.types.push('spendings')
        }
        this.startImport()
      } else {
        console.error(errors)
      }
    },
    async startImport() {
      this.percentage = 0
      this.percentageDialog = true

      // for (let index = 0; index < this.fileData.data.length; index++) {
      for (let index = 0; index < 50; index++) {
        const item = this.fileData.data[index]
        if (index <= this.rowNumber) {
          // SKIP HEADERS
        } else {
          console.log('CHECKING ' + index)
          const formatedData = this.formatData(item)
          // Check if project exists
          let project = await this.getProject(formatedData.projects_id_number)

          // Create project if not exists
          if (project === false) {
            console.log('Creating Project')
            project = await this.createProject(formatedData)
            await this.storeForRevert('project', project.id)
          } else {
            project = project[0]
          }


          // Once the project is created, we check if we are importing commitments or spendings
          if (this.types.includes('commitments')) {
            const number = formatedData.commitments_id_number || formatedData.commitmentLineItem_po_id_number
            if (number === undefined) {
              console.error('MISSING NUMBER')
              break
            }
            let commitment = await this.getCommitment(project.id, number)

            if (commitment.length > 1) {
              // Error we can have just one commitment with the same number
              this.$snotify.error('Commitment duplicated: ', 'Error')
              break
            }

            if (!commitment) {
              // Commitment not exists
              commitment = await this.createCommitment(project.id, formatedData)
              await this.storeForRevert('commitment', commitment.id)
              console.log('Creating Commitment')
            } else {
              console.log('Using Existing Commitment')
              commitment = commitment[0]
            }

            // Verify if the line item already exists
            const checkLineItem = await this.getCommitmentLineItem(project.id, commitment.id, formatedData.commitmentLineItem_line_number)
            if (!checkLineItem) {
              console.log('Creating Line Item')
              const newCommitmentLineItem = await this.createCommitmentLineItem(project.id, commitment.id, formatedData)
              await this.storeForRevert('commitmentLineItem', newCommitmentLineItem.id)
            } else {
              console.log('Skipping Line Item, already exists')
            }
          } else if (this.types.includes('spendings')) {
            const number = formatedData.spendings_id_number
            if (number === undefined) {
              console.error('MISSING NUMBER')
              break
            }
            let spending = await this.getSpending(project.id, number)

            if (spending.length > 1) {
              // Error we can have just one commitment with the same number
              this.$snotify.error('Spending duplicated: ', 'Error')
              break
            }

            if (!spending) {
              // Commitment not exists
              spending = await this.createSpending(project.id, formatedData)
              await this.storeForRevert('spending', spending.id)
              console.log('Creating Commitment')
            } else {
              console.log('Using Existing Commitment')
              spending = spending[0]
            }

            // Verify if the line item already exists
            const checkLineItem = await this.getSpendingLineItem(project.id, spending.id, formatedData.spendingLineItem_line_number)
            if (!checkLineItem) {
              console.log('Creating Line Item')
              const newSpendingLineItem = await this.createCommitmentLineItem(project.id, spending.id, formatedData)
              await this.storeForRevert('spendingLineItem', newSpendingLineItem.id)
            } else {
              console.log('Skipping Line Item, already exists')
            }
          }
        }

        // this.percentage = (index * 100) / this.fileData.data.length
        this.percentage = (index * 100) / 50
      }
      this.percentage = 100
    },
    formatData(item) {
      const formated = {}
      this.importHeaders.forEach((header, index) => {
        if (this.mappedFields[index] !== '') {
          formated[this.mappedFields[index]] = item[index]
        }
      })
      return formated
    },
    async getProject(number) {
      const docs = await db.collection('cpm_projects')
        .where('number', '==', number)
        .where('company_nid', '==', this.currentCompany.id)
        .get()
      if (docs.empty) {
        return false
      }
      return await Promise.all(docs.docs.map(async item => {
        const data = await item.data()
        if (!data.soft_delete || !data.forecasted) {
          return item
        }
      }))
    },
    async getCommitment(projectID, number) {
      const docs = await db.collection('cpm_projects')
        .doc(projectID)
        .collection('commitments')
        .where('number', '==', number)
        .get()
      if (docs.empty) {
        return false
      }
      return await Promise.all(docs.docs.map(async item => item))
    },
    async getCommitmentLineItem(projectID, commitmentID, number) {
      const docs = await db.collection('cpm_projects')
        .doc(projectID)
        .collection('commitments')
        .doc(commitmentID)
        .collection('line_items')
        .where('line_number', '==', number)
        .get()
      if (docs.empty) {
        return false
      } else {
        return true
      }
    },
    async getSpending(projectID, number) {
      const docs = await db.collection('cpm_projects')
        .doc(projectID)
        .collection('spendings')
        .where('number', '==', number)
        .get()
      if (docs.empty) {
        return false
      }
      return await Promise.all(docs.docs.map(async item => item))
    },
    async getSpendingLineItem(projectID, commitmentID, number) {
      const docs = await db.collection('cpm_projects')
        .doc(projectID)
        .collection('spendings')
        .doc(commitmentID)
        .collection('line_items')
        .where('line_number', '==', number)
        .get()
      if (docs.empty) {
        return false
      } else {
        return true
      }
    },
    async createProject(item) {
      const project = {
        campus: item.projects_campus || '',
        category: item.projects_category || '',
        company_nid: this.currentCompany.id || '',
        contractor: item.projects_contractor || '',
        createdAt: new Date(),
        description: item.projects_description || '',
        endDate: item.projects_endDate || '',
        endDateText: item.projects_endDateText || '',
        files: item.projects_files || '',
        manager: item.projects_manager || '',
        totalPlanBudget: item.projects_totalPlanBudget || '',
        nextChangeNumber: 1,
        nextCommitmentNumber: 1,
        nextInvoiceNumber: 1,
        nextTaskNumber: 1,
        soft_delete: 0,
        number: item.projects_id_number || '',
        phase: item.projects_phase || '',
        phaseTargetDate: item.projects_phaseTargetDate || '',
        phaseTargetDateText: item.projects_phaseTargetDateText || '',
        projectType: item.projects_projectType || '',
        project_invoice_total: item.projects_project_invoice_total || '',
        project_total_open_po_w_tax:
            item.projects_total_open_po_w_tax || '',
        project_total_po_amount: item.projects_total_po_amount || '',
        projectImage: item.projects_projectImage || '',
        proposedSpend: item.projects_proposedSpend || '',
        sameAsCampusAddress: item.projects_sameAsCampusAddress || '',
        setDefaultSchedule: item.projects_setDefaultSchedule || '',
        squareFootage: item.projects_squareFootage || '',
        standard: item.projects_standard || '',
        startDate: item.projects_startDate || '',
        startDateText: item.projects_startDateText || '',
        status: item.projects_status || '',
        teamMembers: item.projects_teamMembers || '',
        title: item.projects_title || item.projects_id_number || 'New Project',
        forecasted: false,
        creator: {},
        spendingsByPeriod: {},
        capitalPlans: [],
        priority: '',
        totals: {
          budgetTotal: 0,
          commitmentTotal: 0,
          spendingTotal: 0,
          budgetContingencyTotal: 0,
          spendingContingencyTotal: 0,
          changesTotal: 0,
          totalAllocated: 0,
          openCommitmentTotal: 0,
          projectFinalCost: 0
        }
      }
      return await db.collection('cpm_projects').add(project)
    },
    async createCommitment(projectID, item) {
      let bc = {}
      if (item.commitments_budget_category) {
        if (this.budgetCategories.length > 0) {
          // eslint-disable-next-line eqeqeq
          bc = this.budgetCategories.find(s => s.name == item.commitments_budget_category || s.code == item.commitments_budget_category)
          if (!bc) {
            bc = this.createBudgetCategory({
              code: item.commitments_budget_category || item.commitments_budget_category,
              name: item.commitments_budget_category || item.commitments_budget_category
            })
          }
        }
      }
      const newCommitment = {
        number: item.commitments_id_number,
        total_po_amount: 0,
        total_open_po_w_tax: 0,
        amount: 0,
        invoiceTotal: 0,
        vendor: [],
        createdAt: new Date(),
        createdBy: 'm6works_import_tool',
        budgetCategory: bc.name || '', // Name
        budget_category: bc.ref || {} // reference
      }

      return new Promise(resolve => {
        const spending = db.collection('cpm_projects').doc(projectID).collection('commitments').add(newCommitment)
        resolve(spending)
      })
    },
    async createCommitmentLineItem(projectID, commitmentID, item) {
      const newCommitmentLineItem = {
        number: item.commitmentLineItem_amount || '',
        line_number: item.commitmentLineItem_line_number || '',
        title: item.commitmentLineItem_title || '',
        startDateText: item.commitmentLineItem_startDate || '',
        startDate: new Date(item.commitmentLineItem_startDate).getTime() || '',
        vendor: [],
        account: item.commitmentLineItem_account || '',
        quantity: item.commitmentLineItem_tax_amount || '',
        quantity_amount: 1,
        system_date: '',
        tax_amount: item.commitmentLineItem_tax_amount || '',
        cost_per_item: item.commitmentLineItem_cost_per_item || '',
        total_po_line_amount: item.commitmentLineItem_amount || '',
        amount: item.commitmentLineItem_amount || '',
        open_po_amount: ''
      }
      return new Promise(resolve => {
        const spending = db.collection('cpm_projects')
          .doc(projectID)
          .collection('commitments')
          .doc(commitmentID)
          .collection('line_items')
          .add(newCommitmentLineItem)
        resolve(spending)
      })
    },
    async createSpending(projectID, item) {
      let bc = {}
      if (item.commitments_budget_category) {
        if (this.budgetCategories.length > 0) {
          // eslint-disable-next-line eqeqeq
          bc = this.budgetCategories.find(s => s.name == item.commitments_budget_category || s.code == item.commitments_budget_category)
          if (!bc) {
            bc = this.createBudgetCategory({
              code: item.commitments_budget_category || item.commitments_budget_category,
              name: item.commitments_budget_category || item.commitments_budget_category
            })
          }
        }
      }

      const newSpending = {
        number: item.spendings_id_number,
        total_po_amount: 0,
        total_open_po_w_tax: 0,
        amount: 0,
        invoiceTotal: 0,
        vendor: {},
        createdAt: new Date(),
        createdBy: 'm6works_import_tool',
        budgetCategory: bc.name || '', // Name
        budget_category: bc.ref || {} // reference
      }

      return new Promise(resolve => {
        const spending = db.collection('cpm_projects').doc(projectID).collection('spendings').add(newSpending)
        resolve(spending)
      })
    },
    async createSpendingLineItem(projectID, spendingID, item) {
      if (item.spendingLineItem_commitment_id_number) {
        this.getCommitment(item.spendingLineItem_commitment_id_number)
      }

      const newSpendingLineItem = {
        createdAt: new Date(),
        createdBy: 'm6works_import_tool',
        client_capital_id: item || '',
        number: item.spendings_id_number || '',
        po_number: item.spendings_commitment_id_number || '',
        vendors: [],
        vendor: {},
        line_number: item.spendingLineItem_line_number || '',
        line_description: item.spendingLineItem_description || '',
        dateText: item.spendingLineItem_start_date || '',
        date: new Date(item.spendingLineItem_start_date).getTime() || '',
        paidDateText: item.spendingLineItem_paid_date || '',
        paidDate: new Date(item.spendingLineItem_paid_date).getTime() || '',
        updateDateText: '',
        updateDate: '',
        account: item.spendingLineItem_paid_date || '',
        aoc_code: item.spendingLineItem_paid_date || '',
        status: item.spendingLineItem_status || '',
        amount: item.spendingLineItem_amount || '',
        account_category: item.spendingLineItem_account_category || '',
        cancel_seq: '',
        suffix: '',
        po_code: '',
        dist_company: '',
        dist_acct_unit: '',
        dis_sub_acct: '',
        dist_seq_nbr: ''
      }
      return new Promise(resolve => {
        const spendingLineItem = db.collection('cpm_projects')
          .doc(projectID)
          .collection('commitments')
          .doc(spendingID)
          .collection('line_items')
          .add(newSpendingLineItem)
        resolve(spendingLineItem)
      })
    },
    async getBudgetCategories() {
      const response = await db.collection('settings').doc(this.currentCompany.id).collection('settings').doc('budgets').collection('budget_categories').get()
      this.budgetCategories = await Promise.all(response.docs.map(async item => {
        const data = await item.data()
        return { id: item.id, ref: item.ref, ...data }
      }))
    },
    async createBudgetCategory(code) {
      const newBC = await db.collection('settings').doc(this.currentCompany.id).collection('settings').doc('budgets').collection('budget_categories').add(code)
      return { id: newBC.id, ref: newBC.ref, ...code }
    },
    async storeForRevert(type, id) {
      const start = new Date()
      const year = start.getFullYear().toString()
      const month = ('0' + (start.getMonth() + 1)).slice(-2).toString()
      const day = ('0' + (start.getDate())).slice(-2).toString()

      db.collection('m6works_imports').doc(year).collection(month).doc(day).collection(type).add({
        id,
        companyID: this.currentCompany.id
      })
    },
    async rollBack() {}
  }
}
</script>

<style>
theme--light.v-text-field > .v-input__control > .v-input__slo:before {
  border: 1px solid #000;
}
.select-preset .v-select__slot {
  padding: 5px;
}
.table-headers .table, .table-headers th, .table-headers td {
  border: 1px solid #90A4AE !important;
  font-weight: 900;
  white-space: nowrap;
}
.table-headers .v-data-table__wrapper {
  padding-bottom: 4px;
}
.presets-table table {
  display: flex;
}
.preset-row-header {
  min-width: 105px;
}
.preset-row {
  min-width: 230px;
}
</style>
