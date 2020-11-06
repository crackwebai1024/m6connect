<template>
  <v-container class="d-flex dont-show-scroll h-full ma-0 pb-0 pt-5 px-0 vertical-scroll w-main-content">
    <!-- General use list component-->
    <template v-if="getScreenStatus()">
      <record-container
        class="main-content mx-auto"
        :data="getRecordFullScreen()"
      />
    </template>
    <template v-else>
      <!-- Companies List Component (add main-content class)-->
      <app-template
        :edit-panel="true"
      >
        <v-btn
          slot="actionbtn"
          class="capitalize white"
          text
        >
          Capital Projects
        </v-btn>
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
            icon
            class="capitalize font-weight-black grey grey--text left-0 lighten-2 ml-3 pa-1 text--darken-3"
            elevation="0"
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
                class="mb-3 px-6 py-5 white card-custom-shadow rounded"
              >
                <h3 class="grey--text text--darken-3 spacing-tight font-weight-bold">Information</h3>
                <div class="overflow-hidden">
                    <div class="d-flex align-center my-3">
                        <v-icon class="grey--text text--darken-3" size="22">mdi-clipboard-file-outline</v-icon>
                        <p class="ml-3 w-4/5 text-body-2 font-weight-ligshten black--text mb-0">Company Name</p>
                    </div>
                    <div class="d-flex align-center my-3">
                        <v-icon class="grey--text text--darken-3" size="22">mdi-email-outline</v-icon>
                        <p class="ml-3 w-4/5 text-body-2 font-weight-ligshten black--text mb-0">company@gmail.com</p>
                    </div>
                    <div class="d-flex align-center my-3">
                        <v-icon class="grey--text text--darken-3" size="22">mdi-clipboard-file-outline</v-icon>
                        <p class="ml-3 w-4/5 text-body-2 font-weight-ligshten black--text mb-0">Company Last Name</p>
                    </div>
                    <div class="d-flex align-center my-3">
                        <v-icon class="grey--text text--darken-3" size="22">mdi-phone</v-icon>
                        <p class="ml-3 w-4/5 text-body-2 font-weight-ligshten black--text mb-0">(+51) 9874363722</p>
                    </div>
                    <div class="d-flex align-center my-3">
                        <v-icon class="grey--text text--darken-3" size="22">mdi-earth</v-icon>
                        <p class="ml-3 w-4/5 text-body-2 font-weight-ligshten black--text mb-0">www.company.com</p>
                    </div>
                </div>
              </div>

              <div
                slot="rightPanel"
                class="mb-4 panel px-0"
              >
                <project-social-media class="px-0"/>
              </div>
            </panel-two-columns>
          </template>
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
            <panel-two-columns>
              <div
                slot="leftPanel"
                class="mb-3 panel px-4 py-3 white card-custom-shadow rounded"
              >
                l
              </div>

              <div
                slot="rightPanel"
                class="mb-3 panel px-4 py-3 white card-custom-shadow rounded"
              >
                r
              </div>
            </panel-two-columns>
          </template>
        </div>
      </app-template>
    </template>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import RecordContainer from '@/components/RecordMode/RecordContainer'
import AppTemplate from '@/views/Home/AppTemplate'
import PanelFull from '@/components/AppBuilder/Content/PanelFull'
import PanelTwoColumns from '@/components/AppBuilder/Content/PanelTwoColumns'
import Error403 from '@/modules/cpm/_layouts/Error403'
import M6Show from '@/modules/cpm/_layouts/M6Show.vue'

import FinancialCostSummary from '@/modules/cpm/components/projects/panels/FinancialCostSummary'
import Reconciliation from '@/modules/cpm/components/projects/panels/Reconciliation'
import ProjectSocialMedia from '@/views/Home/ProjectSocialMedia'

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
    AppTemplate,
    PanelFull,
    PanelTwoColumns,
    Error403,
    FinancialCostSummary,
    Reconciliation,
    ProjectSocialMedia,
    M6Show
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
    tabs: ['Home', 'Financials'],
    activeTab: 0
  }),
  computed: {
    ...mapGetters({
      getScreenStatus: 'GeneralListModule/get_screen_status',
      getRecordFullScreen: 'GeneralListModule/get_record_full_screen',
      getImagePreviewOverlay: 'get_image_preview_overlay'
    })
  },
  async created() {
    // Init Firebase
    await newFirebaseInit()
    await doFirebaseAuth()

    db.collection('cpm_projects').doc(this.$route.params.id).get().then(response => {
      this.project = response.data()
    })
  },
  beforeDestroy() {},
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
