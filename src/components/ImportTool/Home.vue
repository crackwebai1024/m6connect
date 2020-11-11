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
                data-buttonText="Hello there, pick your files"
                type="file"
                @change="onFileChange"
              >
            </v-form>
            <v-divider class="grey lighten-3 my-2 z-index" />
            <!-- Select Headers -->
            <template v-if="firstRow === null && fileData">
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
                v-if="getHeadersByRow"
              >
                <p class="blue--text mb-1 mt-4 text--lighten-1">
                  Step 2. Are these your column headers?
                </p>
                <v-select
                  v-model="rowSelected"
                  item-text="label"
                  item-value="value"
                  :items="rows"
                  label="Select a Row"
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
                  Save
                </v-btn>
              </v-card-actions>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center ma-0 mb-4">
      <v-btn
        class="blue capitalize lighten-1 px-10 py-5 text-h6 white--text"
        elevation="1"
        text
        @click="startImport"
      >
        Start
      </v-btn>
    </v-row>

    <!--Save Template Dialog-->
    <v-dialog
      v-if="savePresetDialog"
      v-model="savePresetDialog"
      width="450px"
    >
      <v-card>
        <v-card-title v-if="preset.id">
          Update Template
        </v-card-title>
        <v-card-title v-else>
          Add New Template
        </v-card-title>
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
  </v-container>
</template>

<script>
import TableHeaders from '@/components/ImportTool/TableHeaders'
import { db, doFirebaseAuth, newFirebaseInit } from '@/utils/Firebase'
import { mapState } from 'vuex'

export default {
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
      savePresetDialog: false
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
      this.showStep3 = true
    },
    prepareToImport() {
      let commitmentsCheck = false
      let spendingsCheck = false
      let projectsCheck = false
      const errors = []
      const types = []
      // Verify the headers
      this.mappedFields.forEach(item => {
        if (item.includes('commitmentLineItem') !== false || item.includes('commitments') !== false) {
          commitmentsCheck = true
          if (item.includes('id_number') === false) {
            errors.push('Commitment Number/ID is required')
          }
          if (item.includes('amount') === false) {
            errors.push('Commitment Number/ID is required')
          }
        }

        if (item.includes('spendingLineItem') !== false || item.includes('spendings') !== false) {
          spendingsCheck = true
          if (item.includes('projects_id_number')) {
            projectsCheck = true
          } else {
            errors.push('Project Number/ID is required')
          }
        }
        if (item.includes('projects') !== false) {
          if (item.includes('projects_id_number')) {
            projectsCheck = true
          } else {
            errors.push('Project Number/ID is required')
          }
        }
      })

      if (projectsCheck && !errors.length) {
        if (commitmentsCheck) {
          types.push('commitments')
        }
        // Then with Spendings
        if (spendingsCheck) {
          types.push('spendings')
        }
      }
    },
    async startImport() {
      this.fileData.data.map(async (item, index) => {
        if (index === 0) {
          // SKIP HEADERS
        } else if (index === 1) {
          const formatedData = this.formatData(item)
          // Check if project exists
          const project = await this.getProject(formatedData.projects_id_number)
          // Create project if not exists
          if (project === false) {
            this.createProject(formatedData)
          }
        }
      })
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
    async createProject(item) {
      const project = {
        campus: item.campus || '',
        category: item.category || '',
        company_nid: this.currentCompany.id || '',
        contractor: item.contractor || '',
        createdAt: new Date(),
        description: item.projects_description || '',
        endDate: item.endDate || '',
        endDateText: item.endDateText || '',
        files: item.files || '',
        manager: item.manager || '',
        totalPlanBudget: item.totalPlanBudget || '',
        nextChangeNumber: 1,
        nextCommitmentNumber: 1,
        nextInvoiceNumber: 1,
        nextTaskNumber: 1,
        soft_delete: 0,
        number: item.projects_id_number || '',
        phase: item.phase || '',
        phaseTargetDate: item.phaseTargetDate || '',
        phaseTargetDateText: item.phaseTargetDateText || '',
        projectType: item.projectType || '',
        project_invoice_total: item.project_invoice_total || '',
        project_total_open_po_w_tax:
            item.project_total_open_po_w_tax || '',
        project_total_po_amount: item.project_total_po_amount || '',
        projectImage: item.projectImage || '',
        proposedSpend: item.proposedSpend || '',
        sameAsCampusAddress: item.sameAsCampusAddress || '',
        setDefaultSchedule: item.setDefaultSchedule || '',
        squareFootage: item.squareFootage || '',
        standard: item.standard || '',
        startDate: item.startDate || '',
        startDateText: item.startDateText || '',
        status: item.status || '',
        teamMembers: item.teamMembers || '',
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
      const newProject = await db.collection('cpm_projects').add(project)
      return newProject
    }
  }
}
</script>

<style>
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
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
