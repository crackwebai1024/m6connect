<template>
  <v-container class="overflow-y-auto">
    <v-row class="my-5">
      <v-col
        cols="12"
      >
        <v-card>
          <v-card-title>Upload Document</v-card-title>
          <v-card-text>
            <v-form>
              <p>Please upload your export file</p>
              <input
                type="file"
                @change="onFileChange"
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="my-5">
      <v-col
        v-if="fileData"
        cols="12"
      >
        <v-card>
          <v-card-title>Select Your Headers</v-card-title>
          <v-card-text>
            <template v-if="firstRow === null && fileData">
              <template v-if="!getHeadersByRow && fileData.headers">
                <p>This are the headers?</p>
                <table-headers
                  :headers="fileData.headers"
                />
              </template>

              <template
                v-if="getHeadersByRow"
              >
                <v-select
                  v-model="rowSelected"
                  item-text="label"
                  item-value="value"
                  :items="rows"
                  label="Select a Row"
                />
                <table-headers
                  v-if="rowSelected.length"
                  :headers="rowSelected"
                />
              </template>
            </template>
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="!getHeadersByRow"
              @click="setHeaders(fileData.headers)"
            >
              Yes
            </v-btn>
            <v-btn
              v-else
              @click="setHeaders(rowSelected)"
            >
              Yes
            </v-btn>
            <v-btn @click="getRows">
              No
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="my-5">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Map Fields or Select Preset <v-spacer /> <v-select
              clearable
              dense
              item-text="name"
              :items="presets"
              label="Select a Preset"
              return-object
              @change="setPreset"
            />
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                md="12"
              >
                <v-simple-table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>FILE HEADER</th>
                      <th>ENTITY</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template
                      v-for="(header, hi) in importHeaders"
                    >
                      <tr
                        :key="hi"
                      >
                        <td>{{ hi+1 }}</td>
                        <td>
                          {{ header }}
                        </td>
                        <td>
                          <v-autocomplete
                            v-model="mappedFields[hi]"
                            clearable
                            item-text="name"
                            item-value="value"
                            :items="selectFields"
                            label="Select Field"
                          />
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </v-simple-table>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="blue"
                    dark
                    @click="savePresetDialog = true"
                  >
                    Save Preset
                  </v-btn>
                </v-card-actions>
              </v-col>
              <!--              <v-col-->
              <!--                cols="12"-->
              <!--                md="4"-->
              <!--              >-->
              <!--                <h1>Fields Description</h1>-->
              <!--                <v-expansion-panels>-->
              <!--                  <template v-for="(sections, title) in fields">-->
              <!--                    <v-expansion-panel-->
              <!--                      :key="title"-->
              <!--                    >-->
              <!--                      <v-expansion-panel-header>-->
              <!--                        {{ title }} Fields-->
              <!--                      </v-expansion-panel-header>-->

              <!--                      <v-expansion-panel-content>-->
              <!--                        <v-card>-->
              <!--                          <v-card-text>-->
              <!--                            <template v-for="field in sections">-->
              <!--                              <div :key="field.name">-->
              <!--                                <p class="mb-0">-->
              <!--                                  <strong>{{ field.name }}</strong>-->
              <!--                                </p>-->
              <!--                                <p class="ma-0">-->
              <!--                                  <small>{{ field.description }}</small>-->
              <!--                                </p>-->
              <!--                                <v-divider class="my-3" />-->
              <!--                              </div>-->
              <!--                            </template>-->
              <!--                          </v-card-text>-->
              <!--                        </v-card>-->
              <!--                      </v-expansion-panel-content>-->
              <!--                    </v-expansion-panel>-->
              <!--                  </template>-->
              <!--                </v-expansion-panels>-->
              <!--              </v-col>-->
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-btn @click="prepareToImport">
              Start
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--Save Preset Dialog-->
    <v-dialog
      v-if="savePresetDialog"
      v-model="savePresetDialog"
      width="450px"
    >
      <v-card>
        <v-card-title v-if="preset.id">
          Update Preset
        </v-card-title>
        <v-card-title v-else>
          Add New Preset
        </v-card-title>
        <v-card-text>
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
      sheetSelected: false,
      rowSelected: [],
      firstRow: null,
      getHeadersByRow: false,
      startRow: 1,
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
      types: []

    }
  },
  computed: {
    ...mapState('Companies', {
      currentCompany: 'currentCompany'
    }),
    rows() {
      const data = []
      for (let i = this.startRow; i <= this.startRow + 10; i++) {
        data.push({
          label: i,
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
  },
  methods: {
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
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
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
        this.fileData = data
      })
    },
    setHeaders(headers) {
      this.importHeaders = headers
    },
    prepareToImport() {
      let projectsCheck = null
      const errors = []

      // Verify the headers

      this.mappedFields.forEach(item => {
        if (item.includes('projects') !== false) {
          if (item.includes('projects_id_number')) {
            projectsCheck = true
          } else {
            errors.push('Project Number/ID is required')
          }
        }
      })

      if (projectsCheck && !errors.length) {
        this.types.push('commitments')
        this.startImport()
      } else {
        console.error(errors)
      }
    },
    async startImport() {
      for (let index = 1; index < this.fileData.data.length; index++) {
        const item = this.fileData.data[index]
        if (index === 0) {
          // SKIP HEADERS
        } else if (index <= 10) {
          console.log('CHECKING ' + index)
          const formatedData = this.formatData(item)
          // Check if project exists
          let project = await this.getProject(formatedData.projects_id_number)

          // Create project if not exists
          if (project === false) {
            console.log('Creating Project')
            project = await this.createProject(formatedData)
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
              console.log('Creating Commitment')
            } else {
              console.log('Using Existing Commitment')
              commitment = commitment[0]
            }

            // Verify if the line item already exists
            const checkLineItem = await this.getCommitmentLineItem(project.id, commitment.id, formatedData.commitmentLineItem_line_number)
            if (!checkLineItem) {
              console.log('Creating Line Item')
              await this.createCommitmentLineItem(project.id, commitment.id, formatedData)
            } else {
              console.log('Skipping Line Item, already exists')
            }
          }
          // else if (types.includes('spendings')) {}
        } else {
          break
        }
      }
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
      const newCommitment = {
        number: item.commitments_id_number,
        total_po_amount: 0,
        total_open_po_w_tax: 0,
        amount: 0,
        invoiceTotal: 0,
        vendor: [],
        createdAt: new Date(),
        createdBy: 'm6works_import_tool',
        budgetCategory: item.commitments_budgetCategory || '', // Name
        budget_category: item.commitments_budget_category || '' // reference
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
      const newSpending = {
        number: item.spendings_id_number,
        total_po_amount: 0,
        total_open_po_w_tax: 0,
        amount: 0,
        invoiceTotal: 0,
        vendor: {},
        createdAt: new Date(),
        createdBy: 'm6works_import_tool'
        // budgetCategory: item.spendingLineItem_account_category || '', // Name
        // budget_category: item.spendingLineItem_account_category || '' // reference
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
    }
  }
}
</script>

<style>
theme--light.v-text-field > .v-input__control > .v-input__slo:before {
  border: 1px solid #000;
}
</style>
