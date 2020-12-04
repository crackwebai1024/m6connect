<template>
  <v-container class="container--fluid d-flex dont-show-scroll h-full vertical-scroll w-main-content">
    <!-- General use list component-->
    <!-- Companies List Component (add main-content class)-->
    <v-row>
      <app-template-plain
        :props-dialog="true"
      >
        <div
          slot="header"
          class="align-center d-flex justify-space-between max-w-lg mx-auto px-8 py-5 w-full"
        >
          <div class="align-center d-flex">
            <div>
              <v-img
                v-if="project.projectImage"
                alt="Project Image"
                height="150"
                :src="project.projectImage"
              />
              <div
                v-else
                class="d-flex grey items-center justify-center lighten-3 mr-6"
                style="width: 150px; height: 150px; border-radius: 5px"
              >
                <v-icon
                  color="grey lighten-1"
                  size="38"
                >
                  mdi-image-filter-hdr
                </v-icon>
              </div>
            </div>
            <div>
              <h2>{{ $h.dg(project, 'title', '') }}</h2>
              <p
                class="mb-0"
                v-text="$h.dg(project, 'description', '')"
              />
              <p
                class="mb-0"
                v-text="$h.dg(project, 'manager.label', '')"
              />
            </div>
          </div>
          <div class="absolute mr-3 mt-3 right-0 top-0">
            <div class="relative">
              <v-tooltip
                left
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    icon
                    v-on="on"
                    @click="$router.go(-1)"
                  >
                    <v-icon color="blue lighten-1">
                      mdi-keyboard-return
                    </v-icon>
                  </v-btn>
                </template>
                <span class="grey lighten-4 px-3 py-2 rounded">Project List</span>
              </v-tooltip>
            </div>
          </div>
        </div>
        <div
          slot="tabs"
          class="align-center d-flex"
        >
          <v-tabs
            v-model="activeTab"
            active-class="font-weight-black blue--text active-tab-company"
          >
            <v-tab
              v-for="tab in tabs"
              :key="tab.id"
              class="blue--text capitalize"
            >
              {{ tab }}
            </v-tab>
          </v-tabs>
        </div>
        <div
          slot="btns"
          class="align-center d-flex"
        />
        <div
          slot="content"
          class="w-full"
        >
          <template v-if="activeTab === 0">
            <panel-two-columns>
              <div
                slot="leftPanel"
                class="card-custom-shadow mb-3 px-6 py-5 rounded white"
              >
                <h3 class="font-weight-bold grey--text spacing-tight text--darken-3">
                  Project Information
                </h3>
                <v-row>
                  <v-col>
                    <v-input
                      class="mb-4"
                      messages="Budget Status"
                      prepend-icon="mdi-clipboard-multiple"
                    >
                      <b class="grey--text text--darken-3">Active</b>
                    </v-input>
                    <v-input
                      class="mb-4"
                      messages="Completed"
                      prepend-icon="mdi-percent-outline"
                    >
                      <b class="grey--text text--darken-3">0 %</b>
                    </v-input>
                    <v-input
                      class="mb-4"
                      messages="Type"
                      prepend-icon="mdi-information-outline"
                    >
                      <b class="grey--text text--darken-3">N/A</b>
                    </v-input>
                    <v-input
                      class="mb-4"
                      messages="Phase"
                      prepend-icon="mdi-information-outline"
                    >
                      <b class="grey--text text--darken-3">N/A</b>
                    </v-input>
                    <v-input
                      class="mb-4"
                      messages="Creator"
                      prepend-icon="mdi-clipboard-account"
                    >
                      <b class="grey--text text--darken-3">D C4</b>
                    </v-input>
                    <v-input
                      class="mb-4"
                      messages="Campus"
                      prepend-icon="mdi-domain"
                    >
                      <b class="grey--text text--darken-3">A</b>
                    </v-input>
                    <v-input
                      class="mb-4"
                      messages="Address"
                      prepend-icon="mdi-office-building-marker-outline"
                    >
                      <b class="grey--text text--darken-3">N/A</b>
                    </v-input>
                    <v-input
                      class="mb-4"
                      messages="Category"
                      prepend-icon="mdi-shape-outline"
                    >
                      <b class="grey--text text--darken-3">N/A</b>
                    </v-input>
                    <v-input
                      class="mb-4"
                      messages="Square Footage"
                      prepend-icon="mdi-ruler-square"
                    >
                      <b class="grey--text text--darken-3">N/A</b>
                    </v-input>
                    <v-input
                      class="mb-4"
                      messages="General Contractor"
                      prepend-icon="mdi-briefcase-account-outline"
                    >
                      <b class="grey--text text--darken-3">N/A</b>
                    </v-input>
                    <v-input
                      class="mb-4"
                      messages="Regulatory"
                      prepend-icon="mdi-information-outline"
                    >
                      <b class="grey--text text--darken-3">N/A</b>
                    </v-input>
                    <v-input
                      class="mb-4"
                      messages="FY Approved"
                      prepend-icon="mdi-information-outline"
                    >
                      <b class="grey--text text--darken-3">N/A</b>
                    </v-input>
                  </v-col>
                </v-row>
                <v-divider />
                <v-row>
                  <v-col>
                    <v-input
                      class="mb-4"
                      messages="Start Date"
                      prepend-icon="mdi-calendar-clock"
                    >
                      <b class="grey--text text--darken-3">10/31/2020</b>
                    </v-input>
                    <v-input
                      class="mb-4"
                      messages="End Date"
                      prepend-icon="mdi-calendar-multiple-check"
                    >
                      <b class="grey--text text--darken-3">12/30/2020</b>
                    </v-input>
                  </v-col>
                </v-row>
                <v-divider />
                <v-row>
                  <v-col>
                    <v-input
                      class="mb-4"
                      messages="Construction Start Date"
                      prepend-icon="mdi-calendar-clock"
                    >
                      <b class="grey--text text--darken-3">N/A</b>
                    </v-input>
                    <v-input
                      class="mb-4"
                      messages="Phase Target Date"
                      prepend-icon="mdi-calendar-cursor"
                    >
                      <b class="grey--text text--darken-3">N/A</b>
                    </v-input>
                    <v-input
                      class="mb-4"
                      messages="% Complete Budget"
                      prepend-icon="mdi-percent-outline"
                    >
                      <b class="grey--text text--darken-3">0</b>
                    </v-input>
                    <v-input
                      class="mb-4"
                      messages="Construction End Date"
                      prepend-icon="mdi-calendar-multiple-check"
                    >
                      <b class="grey--text text--darken-3">N/A</b>
                    </v-input>
                    <v-input
                      class="mb-4"
                      messages="Current FY Proposed Date"
                      prepend-icon="mdi-calendar-cursor"
                    >
                      <b class="grey--text text--darken-3">$ 0.00</b>
                    </v-input>
                    <v-input
                      class="mb-4"
                      messages="% Complete Schedule"
                      prepend-icon="mdi-percent-outline"
                    >
                      <b class="grey--text text--darken-3">46</b>
                    </v-input>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-input messages="Description">
                      <b class="grey--text text--darken-3 text--lighten-2">N/A</b>
                    </v-input>
                  </v-col>
                </v-row>
                <div class="d-none overflow-hidden">
                  <div class="align-center d-flex my-3">
                    <v-icon
                      class="grey--text text--darken-3"
                      size="22"
                    >
                      mdi-clipboard-file-outline
                    </v-icon>
                    <p class="font-weight-ligshten grey--text mb-0 ml-3 text--darken-3 text-body-2 w-4/5">
                      Company Name
                    </p>
                  </div>
                  <div class="align-center d-flex my-3">
                    <v-icon
                      class="grey--text text--darken-3"
                      size="22"
                    >
                      mdi-email-outline
                    </v-icon>
                    <p class="font-weight-ligshten grey--text mb-0 ml-3 text--darken-3 text-body-2 w-4/5">
                      company@gmail.com
                    </p>
                  </div>
                  <div class="align-center d-flex my-3">
                    <v-icon
                      class="grey--text text--darken-3"
                      size="22"
                    >
                      mdi-clipboard-file-outline
                    </v-icon>
                    <p class="font-weight-ligshten grey--text mb-0 ml-3 text--darken-3 text-body-2 w-4/5">
                      Company Last Name
                    </p>
                  </div>
                  <div class="align-center d-flex my-3">
                    <v-icon
                      class="grey--text text--darken-3"
                      size="22"
                    >
                      mdi-phone
                    </v-icon>
                    <p class="font-weight-ligshten grey--text mb-0 ml-3 text--darken-3 text-body-2 w-4/5">
                      (+51) 9874363722
                    </p>
                  </div>
                  <div class="align-center d-flex my-3">
                    <v-icon
                      class="grey--text text--darken-3"
                      size="22"
                    >
                      mdi-earth
                    </v-icon>
                    <p class="font-weight-ligshten grey--text mb-0 ml-3 text--darken-3 text-body-2 w-4/5">
                      www.company.com
                    </p>
                  </div>
                </div>
              </div>

              <div
                slot="rightPanel"
                class="mb-4 panel px-0"
              >
                <project-social-media class="px-0" />
              </div>
            </panel-two-columns>
          </template>
          <!--FINANCIALS-->
          <template v-if="activeTab === 1">
            <panel-full>
              <template slot="content">
                <financial-cost-summary />
              </template>
            </panel-full>
            <v-spacer />
            <panel-full>
              <template slot="content">
                <reconciliation />
              </template>
            </panel-full>
            <v-spacer />
            <panel-full>
              <template slot="content">
                <financial-commitments />
              </template>
            </panel-full>
            <v-spacer />
            <panel-full>
              <template slot="content">
                <financial-spendings />
              </template>
            </panel-full>
            <panel-full>
              <template slot="content">
                <budgets />
              </template>
            </panel-full>
            <v-spacer />
          </template>
          <!--FINANCIALS-->

          <!--SCHEDULE-->
          <template v-if="activeTab === 2">
            <!-- <panel-full
              v-if="!panelSettings.mileTracker"
            >
              <template slot="content">
                <milestones :type="type" />
              </template>
            </panel-full> -->
            <!-- <panel-full v-if="!panelSettings.mileSchedule">
              <template slot="content">
                <schedule :type="type" />
              </template>
            </panel-full>
            <panel-full v-if="isPlannedProject">
              <template slot="content">
                <forecasts />
              </template>
            </panel-full> -->
          </template>
          <!--SCHEDULE-->

          <!--DOCUMENT MANAGER-->
          <template v-if="activeTab === 3">
            <panel-full>
              <template slot="content">
                <project-files />
              </template>
            </panel-full>
          </template>
          <!--DOCUMENT MANAGER-->

          <!-- UPDATES -->
          <template v-if="activeTab === 4">
            <panel-two-columns>
              <budget-comment slot="leftPanel" />
              <status-comment slot="rightPanel" />
            </panel-two-columns>
          </template>
          <!-- UPDATES -->

          <!--REPORTS-->
          <template v-if="activeTab === 5">
            <!-- <panel-full v-if="!panelSettings.mileSchedule">
              <template slot="content">
                <schedule :type="type" />
              </template>
            </panel-full>
            <panel-full v-if="isPlannedProject">
              <template slot="content">
                <forecasts />
              </template>
            </panel-full> -->
          </template>
          <!--REPORTS-->
        </div>
      </app-template-plain>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RecordContainer from '@/components/RecordMode/RecordContainer'
import AppTemplatePlain from '@/views/Home/AppTemplatePlain'
import PanelFull from '@/components/AppBuilder/Content/PanelFull'
import PanelTwoColumns from '@/components/AppBuilder/Content/PanelTwoColumns'
import M6Show from '@/modules/cpm/_layouts/M6Show.vue'

import FinancialCostSummary from '@/modules/cpm/components/projects/panels/FinancialCostSummary'
import Budgets from '@/modules/cpm/components/projects/panels/Financial/Budgets'
import Reconciliation from '@/modules/cpm/components/projects/panels/Reconciliation'
import FinancialCommitments from '@/modules/cpm/components/projects/panels/FinancialCommitments'
import FinancialSpendings from '@/modules/cpm/components/projects/panels/FinancialSpendings'
import ProjectSocialMedia from '@/views/Home/ProjectSocialMedia'
import Milestones from '@/modules/cpm/components/projects/panels/schedule/Milestones'
import Schedule from '@/modules/cpm/components/projects/panels/schedule/SchedulePanel'
import Forecasts from '@/modules/cpm/components/projects/panels/Forecasts/ForecastsPanel'
import ProjectFiles from '@/modules/cpm/components/projects/panels/ProjectFiles'
import {
  db,
  newFirebaseInit,
  doFirebaseAuth,
  destroyFirebase
} from '@/utils/Firebase'
import StatusComment from '../../modules/cpm/components/projects/panels/StatusComment.vue'
import BudgetComment from '../../modules/cpm/components/projects/panels/BudgetComment.vue'

export default {
  name: 'Apps',
  components: {
    RecordContainer,
    AppTemplatePlain,
    PanelFull,
    PanelTwoColumns,
    Milestones,
    FinancialCostSummary,
    Reconciliation,
    ProjectSocialMedia,
    FinancialCommitments,
    FinancialSpendings,
    Schedule,
    Forecasts,
    Budgets,
    ProjectFiles,
    StatusComment,
    BudgetComment

  },
  data: () => ({
    tab: null,
    items: [
      'Profile',
      'People',
      'Details'
    ],
    currentTab: 0,
    project: {},
    type: 'project',
    tabs: [
      'Home',
      'Financials',
      'Schedule',
      'Document Manager',
      'Updates',
      'Reports'
    ],
    activeTab: 0
  }),
  computed: {
    isPlannedProject() {
      return this.$h.dg(this.$route, 'name') === 'cpm.forecasting.show'
    },
    ...mapGetters({
      getScreenStatus: 'GeneralListModule/get_screen_status',
      getRecordFullScreen: 'GeneralListModule/get_record_full_screen',
      getImagePreviewOverlay: 'get_image_preview_overlay'
    }),
    ...mapGetters({
      panelSettings: 'hideCpmPanels/getPanelSettings'
    })
  },
  async created() {
    // Init Firebase
    await newFirebaseInit()
    await doFirebaseAuth()

    db.collection('cpm_projects').doc(this.$route.params.id).get().then(async response => {
      this.project = response.data()
      await this.$store.dispatch('GSFeed/setRoom', 'cpm')
      await this.$store.dispatch('GSFeed/setCpmFeed', this.project._id)
      await this.$store.dispatch('GSFeed/retrieveFeed')
    })
    await this.getPanelSettings()
  },
  beforeDestroy() {},
  methods: {
    ...mapActions({
      getPanelSettings: 'hideCpmPanels/getSettings'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
