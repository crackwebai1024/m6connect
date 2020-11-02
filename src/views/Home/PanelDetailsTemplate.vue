<template>
    <div>
        <div @click="dialog = true">
            <slot name="actionbtn"></slot>
        </div>
        <template>
            <v-dialog
                class="vertical-scroll dont-show-scroll"
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                scrollable
            >
            <v-card class="relative grey lighten-3" tile>
                <div class="w-full white">
                    <slot name="header"/>
                    <v-divider class="max-w-lg w-full mx-auto blue-grey lighten-5"></v-divider>
                    <div class="max-w-lg w-full mx-auto d-flex justify-space-between align-center">
                        <slot name="tabs"/>
                        <div v-if="editPanel" class="d-flex align-center">
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
                        <slot name="btns"/>
                    </div>
                </div>

                <div
                    v-if="appLoaded"
                    class="details-content grey lighten-3 h-fit min-h-full pt-2"
                >
                    <v-row
                        v-if="app.tabs.length > 1"
                        class="align-start d-flex justify-center max-w-lg mb-2 mx-auto pt-1 w-full"
                    >
                        <v-btn
                        color="red"
                        dark
                        @click="deleteTab"
                        >
                            Delete Tab
                        </v-btn>
                    </v-row>
                    <v-row class="max-w-lg w-full pt-1 mx-auto d-flex justify-space-between align-start">
                        <v-col cols="5" class="pa-0 pr-1 d-flex flex-column justify-center">
                            <panel
                                v-for="panel in leftPanels"
                                :key="panel.id"
                                :panel="panel"
                                @deletePanel="deletePanel"
                            />
                            <add-panel v-if="editPanel" @addNewPanel="addNewPanel(0)" />
                        </v-col>
                        <v-col cols="7" class="pa-0 pl-1">
                            <panel
                                v-for="panel in rightPanels"
                                :key="panel.id"
                                :panel="panel"
                                @deletePanel="deletePanel"
                            />
                            <add-panel v-if="editPanel" @addNewPanel="addNewPanel(1)" />
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
            </v-dialog>
        </template>
    </div>
</template>

<script>
import AddPanel from '@/components/AppBuilder/Buttons/AddPanel'
import AddTab from '@/components/AppBuilder/Buttons/AddTab'
import Panel from '@/components/AppBuilder/Panel'
import DeleteDialog from '@/components/Dialogs/DeleteDialog'

export default {
  name: "PanelDetailsTemplate",
  components: {
    DeleteDialog,
    AddPanel,
    AddTab,
    Panel
  },
  props: {
    editPanel: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    dialog: false,
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
};
</script>

<style lang="scss">
.spacing-tight {
  letter-spacing: 1px;
}
.links {
  transition: height 5s;
  height: 150px;
  overflow: hidden;
  -webkit-transition: height 0.5s ease;
  -moz-transition: height 0.5s ease;
  -o-transition: height 0.5s ease;
  transition: height 0.5s ease;
}
.active-tab-company {
  border-bottom: 3px solid rgb(49, 174, 220);
}
.v-dialog--scrollable {
  position: absolute;
  top: 60px;
  height: calc(100vh - 60px) !important;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;
}
.v-dialog--scrollable::-webkit-scrollbar {
  width: 0px;
}
.add-field .v-input input {
    border-bottom: 1px solid #F8F3EC;
    margin-bottom: -1px;
}
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
    border: none;
}
.panel {
    min-height: 300px;
}
</style>