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
            <div class="grey lighten-3 pa-16">
              <v-icon
                class="grey--text text--lighten-1"
                size="38"
              >
                mdi-image-filter-hdr
              </v-icon>
            </div>
            <div class="ml-8">
              <v-text-field
                class="add-field font-weight-regular grey lighten-3 mb-1 pt-1 px-4 rounded-xl"
                label="Title"
              />
              <v-btn
                class="blue--text capitalize px-1"
                color="transparent"
                elevation="0"
              >
                Add field
              </v-btn>
            </div>
          </div>
        </div>
        <div
          slot="btns"
          class="align-center d-flex"
        >
          <v-btn
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
              class="mb-3 panel px-4 py-3 white"
            >
              l
            </div>

            <div
              slot="rightPanel"
              class="mb-3 panel px-4 py-3 white"
            >
              r
            </div>
          </panel-two-columns>
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
    project: {}
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
