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
          class="align-center d-flex justify-space-between max-w-lg mx-auto pb-4 pt-6 w-full"
        >
          <div class="align-center d-flex">
            <div>
              <v-img
                alt="Project Image"
                height="150"
                :src="project.projectImage"
              />
            </div>
            <div class="ml-8">
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
        >
          <v-btn
            class="capitalize font-weight-black grey grey--text left-0 lighten-2 ml-3 pa-1 text--darken-3"
            elevation="0"
            icon
            light
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>
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
                  Information
                </h3>
                <div class="overflow-hidden">
                  <div class="align-center d-flex my-3">
                    <v-icon
                      class="grey--text text--darken-3"
                      size="22"
                    >
                      mdi-clipboard-file-outline
                    </v-icon>
                    <p class="black--text font-weight-ligshten mb-0 ml-3 text-body-2 w-4/5">
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
                    <p class="black--text font-weight-ligshten mb-0 ml-3 text-body-2 w-4/5">
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
                    <p class="black--text font-weight-ligshten mb-0 ml-3 text-body-2 w-4/5">
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
                    <p class="black--text font-weight-ligshten mb-0 ml-3 text-body-2 w-4/5">
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
                    <p class="black--text font-weight-ligshten mb-0 ml-3 text-body-2 w-4/5">
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
          <!--            <panel-two-columns>-->
          <!--              <div-->
          <!--                slot="leftPanel"-->
          <!--              />-->

          <!--              <div-->
          <!--                slot="rightPanel"-->
          <!--              />-->
          <!--            </panel-two-columns>-->
          </template>
          <!--FINANCIALS-->

          <!--SCHEDULE-->
          <template v-if="activeTab === 2">
            <panel-full>
              <template slot="content">
                <v-row
                  v-if="!panelSettings.mileTracker"
                >
                  <v-col cols="12">
                    <milestones :type="type" />
                  </v-col>
                </v-row>

                <v-row
                  v-if="!panelSettings.mileSchedule"
                  class="mt-2"
                >
                  <v-col cols="12">
                    <schedule :type="type" />
                  </v-col>
                </v-row>

                <v-row
                  v-if="isPlannedProject"
                  class="mt-2"
                >
                  <v-col cols="12">
                    <forecasts />
                  </v-col>
                </v-row>
              </template>
            </panel-full>
          </template>
        <!--SCHEDULE-->
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
import {
  db,
  newFirebaseInit,
  doFirebaseAuth,
  destroyFirebase
} from '@/utils/Firebase'
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
    Budgets

  },
  data: () => ({
    tab: null,
    items: [
      'Profile',
      'People',
      'Details'
    ],
    currentTab: 0,
    showColumnLeft: true,
    showColumnRight: true,
    project: {},
    type: 'project',
    tabs: ['Home', 'Financials', 'Schedule'],
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

    db.collection('cpm_projects').doc(this.$route.params.id).get().then(response => {
      this.project = response.data()
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
