<template>
  <v-card
    class="relative"
    tile
  >
    <div
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
    <v-divider class="blue-grey lighten-5 max-w-lg mx-auto w-full" />
    <div class="align-center d-flex justify-space-between max-w-lg mx-auto w-full">
      <div class="align-center d-flex">
        <v-tabs
          v-if="appLoaded"
          v-model="activeTab"
          active-class="font-weight-black blue--text active-tab-company"
        >
          <v-tab
            v-for="tab in app.tabs"
            :key="tab.id"
            class="blue--text capitalize"
          >
            {{ tab.title }}
          </v-tab>
        </v-tabs>
        <add-tab @addNewTab="addNewTab" />
      </div>
      <div class="align-center d-flex">
        <v-btn
          class="capitalize font-weight-black grey grey--text left-0 lighten-2 ml-3 pa-1 text--darken-3"
          elevation="0"
          light
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
    </div>
    <div
      v-if="appLoaded"
      class="details-content grey h-fit lighten-3  pt-2"
    >
    <!-- min-h-full -->
      <v-row
        v-if="app.tabs.length > 1"
        class="align-start d-flex justify-center max-w-lg mb-2 mx-auto pt-1 w-full"
        style="height:100%;"
      >
        <v-btn
          color="red"
          dark
          @click="deleteTab"
        >
          Delete Tab
        </v-btn>
      </v-row>
      <v-row class="align-start d-flex justify-space-between max-w-lg mx-auto pt-1 w-full">
        <v-col
          class="d-flex flex-column justify-center pa-0 pr-1"
          cols="5"
        >
          <!--                <div class="mb-3 panel px-4 py-3 white">-->
          <!--                  <h3 class="font-weight-bold grey&#45;&#45;text spacing-tight text&#45;&#45;darken-1">-->
          <!--                    Information-->
          <!--                  </h3>-->
          <!--                  <div class="align-start d-flex">-->
          <!--                    <v-icon class="border mr-2 pt-2 rounded">-->
          <!--                      mdi-alert-circle-->
          <!--                    </v-icon>-->
          <!--                    <div class="overflow-hidden w-full">-->
          <!--                      <v-textarea-->
          <!--                        class="grey lighten-3 pt-1 px-4"-->
          <!--                        color="grey lighten-3"-->
          <!--                      >-->
          <!--                        <template v-slot:label>-->
          <!--                          Description-->
          <!--                        </template>-->
          <!--                      </v-textarea>-->
          <!--                      <v-btn-->
          <!--                        class="blue&#45;&#45;text capitalize px-1"-->
          <!--                        color="transparent"-->
          <!--                        elevation="0"-->
          <!--                      >-->
          <!--                        Add field-->
          <!--                      </v-btn>-->
          <!--                    </div>-->
          <!--                  </div>-->
          <!--                </div>-->

          <panel
            v-for="panel in leftPanels"
            :key="panel.id"
            :panel="panel"
            @deletePanel="deletePanel"
          />
          <add-panel @addNewPanel="addNewPanel(0)" />
        </v-col>
        <v-col
          class="pa-0 pl-1"
          cols="7"
        >
          <panel
            v-for="panel in rightPanels"
            :key="panel.id"
            :panel="panel"
            @deletePanel="deletePanel"
          />
          <add-panel @addNewPanel="addNewPanel(1)" />
        </v-col>
      </v-row>
    </div>

    <v-dialog
      v-model="showDeleteModal"
      width="500"
    >
      <delete-dialog
        element="Tab"
        @closeDeleteModal="confirmDelete"
      />
    </v-dialog>
  </v-card>
</template>

<script>

import AddPanel from '@/components/AppBuilder/Buttons/AddPanel'
import AddTab from '@/components/AppBuilder/Buttons/AddTab'
import Panel from '@/components/AppBuilder/Panel'
import DeleteDialog from '@/components/Dialogs/DeleteDialog'

export default {
  name: 'CreateCompanyPanel',
  components: {
    DeleteDialog,
    AddPanel,
    AddTab,
    Panel
  },
  data: () => ({
    app: {},
    appLoaded: false,
    showDeleteModal: false,
    tabToDelete: null,
    activeTab: 0
  }),
  computed: {
    leftPanels() {
      return this.app.tabs[this.activeTab].panels.filter(item => item.column === 0)
    },
    rightPanels() {
      return this.app.tabs[this.activeTab].panels.filter(item => item.column === 1)
    }
  },
  async mounted() {
    this.app = await this.$store.dispatch('AppBuilder/getApp', 1)
    console.log('this.app-------')
    console.log(this.app)
    this.appLoaded = true
  },
  methods: {
    addNewTab() {
      const newTab = {
        appID: this.app.id,
        weight: 0,
        title: 'New Tab'
      }
      this.$store.dispatch('AppBuilder/saveTab', newTab).then(result => {
        this.app.tabs.push(result)
        this.activeTab = this.app.tabs.map(item => item.id).indexOf(result.id)
      })
    },
    addNewPanel(side) {
      const newPanel = {
        tabID: this.app.tabs[this.activeTab].id,
        weight: 0,
        column: side,
        title: 'New Panel',
        description: ''
      }
      this.$store.dispatch('AppBuilder/savePanel', newPanel).then(result => {
        this.app.tabs[this.activeTab].panels.push(result)
      })
    },
    deletePanel(id) {
      const index = this.app.tabs[this.activeTab].panels.map(item => item.id).indexOf(id)
      this.app.tabs[this.activeTab].panels.splice(index, 1)
    },
    deleteTab() {
      this.showDeleteModal = true
      this.tabToDelete = this.app.tabs[this.activeTab].id
    },
    async confirmDelete(result) {
      if (result) {
        await this.$store.dispatch('AppBuilder/deleteTab', this.tabToDelete)
        const index = this.app.tabs.map(item => item.id).indexOf(this.tabToDelete)
        this.app.tabs.splice(index, 1)
        this.activeTab = 0
      }
      this.tabToDelete = null
      this.showDeleteModal = false
    }
  }
}
</script>

<style lang="scss">
.add-field .v-input input {
    border-bottom: 1px solid #F8F3EC;
    margin-bottom: -1px;
}
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
    border: none;
}
.panel {
    min-height: 350px;
}
</style>

