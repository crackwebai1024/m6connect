<template>
  <v-container class="w-main-content px-0 ma-0 pt-5 pb-0 d-flex vertical-scroll dont-show-scroll h-full">
    <!-- General use list component-->
    <template v-if="get_screen_status()">
      <record-container class="main-content mx-auto" :data="get_record_full_screen()" />
    </template>
    <template v-else>
      <!-- Companies List Component (add main-content class)-->
      <app-template
        :editPanel="true"
      >
        <v-btn
            slot="actionbtn"
            class="white capitalize"
            text
        >
            Capital Projects
        </v-btn>
        <div slot="header" class="max-w-lg pt-6 pb-4 w-full mx-auto d-flex justify-space-between align-center">
            <div class="d-flex align-center">
                <div class="grey lighten-3 pa-16">
                    <v-icon class="grey--text text--lighten-1" size="38">mdi-image-filter-hdr</v-icon>
                </div>
                <div class="ml-8">
                    <v-text-field class="font-weight-regular add-field grey lighten-3 pt-1 px-4 rounded-xl mb-1" label="Title">
                    </v-text-field>
                    <v-btn
                        elevation="0"
                        color="transparent"
                        class="blue--text capitalize px-1"
                    >
                        Add field
                    </v-btn>
                </div>
            </div>
        </div>
        <div slot="btns" class="d-flex align-center">
            <v-btn
                elevation="0"
                class="grey capitalize lighten-2 grey--text text--darken-3 left-0 ml-3 pa-1 font-weight-black"
                light
            >
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </div>
        <div slot="content" class="w-full">
          <panel-full>
            <!-- <error-403 slot="content"/> -->
            <m6-show :asideTitle="'Test'" slot="content"/>
            <!-- <M6GetSupport slot="content"/> -->
          </panel-full>
          <panel-two-columns>
            <div slot="leftPanel" class="white py-3 px-4 mb-3 panel">
              <h3 class="grey--text text--darken-1 spacing-tight font-weight-bold">Information</h3>
              <div class="d-flex align-start">
                  <v-icon class="mr-2 rounded border pt-2">mdi-alert-circle</v-icon>
                  <div class="overflow-hidden w-full">
                      <v-textarea
                          class="grey lighten-3 px-4 pt-1"
                          color="grey lighten-3"
                      >
                          <template v-slot:label>
                              Description
                          </template>
                      </v-textarea>
                      <v-btn
                          elevation="0"
                          color="transparent"
                          class="blue--text capitalize px-1"
                      >
                          Add field
                      </v-btn>
                  </div>
              </div>
            </div>
            <div slot="rightPanel" class="white py-3 px-4 mb-3 panel">
              <h3 class="grey--text text--darken-1 spacing-tight font-weight-bold">Information</h3>
              <div class="d-flex align-start">
                  <v-icon class="mr-2 rounded border pt-2">mdi-alert-circle</v-icon>
                  <div class="overflow-hidden w-full">
                      <v-textarea
                          class="grey lighten-3 px-4 pt-1"
                          color="grey lighten-3"
                      >
                          <template v-slot:label>
                              Description
                          </template>
                      </v-textarea>
                      <v-btn
                          elevation="0"
                          color="transparent"
                          class="blue--text capitalize px-1"
                      >
                          Add field
                      </v-btn>
                  </div>
              </div>
            </div>
          </panel-two-columns>
        </div>
      </app-template>
    </template>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import RecordContainer from "@/components/RecordMode/RecordContainer"
import AppTemplate from '@/views/Home/AppTemplate'
import PanelFull from '@/components/AppBuilder/Content/PanelFull'
import PanelTwoColumns from '@/components/AppBuilder/Content/PanelTwoColumns'
import Error403 from '@/modules/cpm/_layouts/Error403'
import M6Show from '@/modules/cpm/_layouts/M6Show.vue'

export default {
  components: {
    RecordContainer,
    AppTemplate,
    PanelFull,
    PanelTwoColumns,
    Error403,
    M6Show
  },
  data: () => ({
    tab: null,
    items: [
      'Profile', 'People', 'Details',
    ],
    currentTab: 0,
    showColumnLeft: true,
    showColumnRight: true
  }),
  name: "Apps",
  computed: {
    ...mapGetters({
      get_screen_status: "GeneralListModule/get_screen_status",
      get_record_full_screen: "GeneralListModule/get_record_full_screen",
      get_image_preview_overlay: "get_image_preview_overlay"
    }),
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>

</style>