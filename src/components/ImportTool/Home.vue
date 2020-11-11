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
            <v-btn @click="startImport">
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
</style>
