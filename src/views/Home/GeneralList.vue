<template>
  <v-container
    class="pa-0"
    fluid
  >
    <header-component
      class="card-custom-shadow h-auto max-w-tight mb-3 mx-auto rounded"
      hasslot
      :info="{title: 'Search All Apps', icon: ''}"
    >
      <template #select>
        <v-switch
          v-model="tableView"
          :append-icon=" tableView ? 'mdi-table' : 'mdi-arrange-bring-forward' "
        />
        <v-menu
          bottom
          offset-y
          transition="slide-y-transition"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              class="capitalize font-weight-bold mb-0 pl-1 purple--text px-0 text--darken-1 transparent"
              elevation="0"
              v-on="on"
            >
              {{ filter['value'] }}
              <v-icon class="blue--text text--darken-3">
                mdi-chevron-down
              </v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
              v-for="(item, i) in areas.concat(areas2)"
              :key="i"
            >
              <v-list-item-title
                :class="item.type === 'title' ? 'grey--text' : 'black--text pointer'"
                @click="changingApps(item)"
              >
                {{ item.text }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template #input>
        <v-text-field
          v-model="searchInput"
          class="font-weight-bold"
          dense
          flat
          height="40"
          hide-details
          label="Start Typing to Search"
          rounded
          single-line
          solo-inverted
          @change="changeEvent"
        >
          <template #append>
            <v-row class="align-center d-flex">
              <v-icon>mdi-magnify</v-icon>
            </v-row>
          </template>
        </v-text-field>
      </template>
    </header-component>
    <div v-if="!loading">
      <template v-if="tableView">
        <records-table :items="records" />
      </template>
      <template v-else>
        <v-row
          v-if="!loading"
          class="w-full"
        >
          <v-col
            v-for="(item, index) of records"
            :key="index"
            :class="Object.keys(records).length !== index + 1 ? 'mb-3' : ''"
            cols="12"
          >
            <general-item :record-data="item" />
          </v-col>
          <v-col
            v-if="records.length === 0"
            class="max-w-tight mx-auto py-3 w-full"
            cols="12"
          >
            No results found
          </v-col>
        </v-row>
      </template>
    </div>
    <v-container v-else>
      <v-progress-circular
        color="primary"
        indeterminate
      />
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import GeneralItem from '@/components/Home/GeneralItem'
import HeaderComponent from '@/components/Home/HeaderComponent'
import RecordsTable from '@/components/RecordsTable'

export default {
  name: 'GeneralList',
  components: {
    GeneralItem,
    HeaderComponent,
    RecordsTable
  },
  data: () => ({
    loading: true,
    areas2: [],
    perPage: 8,
    records: [],
    searchInput: '',
    tableView: false
  }),
  computed: {
    ...mapGetters('GeneralListModule', {
      list: 'get_general_list'
    }),
    ...mapGetters('ITAppsModule', {
      filter: 'getFilter'
    }),
    areas() {
      return [
        {
          text: 'All Apps',
          type: 'subtitle',
          function: () => {
            this.setFilterTag({ key: 'everyone', value: 'All Apps' })
            this.reload()
          }
        },
        {
          text: 'Applications',
          type: 'title',
          function: () => {}
        },
        {
          text: 'ITApps',
          type: 'subtitle',
          function: () => {
            this.setFilterTag({ key: 'itapps', value: 'ITApps' })
            this.reload()
          }
        }
      ]
    }
  },
  watch: {
    tableView(val) {
      this.setShowSidePanels(!val)
      this.$emit('tableView', val)
    }
  },
  mounted() {
    this.setDynamicApps()
    this.setFilterTag({ key: 'everyone', value: 'All Apps' })
    this.getApps().then(() => {
      this.records = this.list()
      this.loading = false
    }
    )
    this.selectApp().then(res => {
      res['data'].forEach(app => {
        this.areas2.push(
          {
            text: app['title'],
            prefix: app['prefix'],
            type: 'subtitle',
            function: () => {
              this.setFilterTag({ key: 'dynamicApp', value: app['title'] })
              this.getRecords(app.id)
            }
          }
        )
      })
    })
  },
  beforeDestroy() {
    this.setShowSidePanels(true)
    this.$emit('tableView', false)
  },
  methods: {
    ...mapActions('ITAppsModule', {
      getApps: 'get_all_apps',
      selectApp: 'get_select_apps',
      filterApps: 'get_filter_apps',
      setFilterTag: 'set_filter_tag'
    }),
    ...mapActions('DynamicAppsModule', {
      getDynamicApps: 'get_all_apps_by_id',
      setDynamicApps: 'set_apps'
    }),
    ...mapMutations('PageControl', {
      setShowSidePanels: 'setShowSidePanels'
    }),
    ...mapActions('RecordsInstance', {
      getRecordsByApp: 'getRecordsByApp'
    }),
    changeEvent(event) {
      this.records = []
      this.loading = true
      this.filterApps({ param: event }).then(() => {
        this.records = this.list()
        this.loading = false
      })
    },
    getRecords(appId) {
      this.loading = true
      this.getDynamicApps(appId).then(() => {
        this.records = this.list()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    reload() {
      this.loading = true
      this.records = []
      this.getApps().then(
        () => (this.records = this.list(), this.loading = false)
      )
    },
    remainingPerPage(page) {
      let remaining = this.perPage
      if (page + 1 === this.pages) {
        remaining =
          this.perPage - ((this.perPage * this.pages) - this.recordsLength)
      }
      return remaining
    },
    getIndex(i, index) {
      const ind = (i * this.perPage) + index - 1
      return ind
    },
    async changingApps(app) {
      try {
        app.function()
      } catch (e) {
        // Empty
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-text-field .v-input__control {
  min-height: auto !important;
  display: flex !important;
  align-items: center !important;
}
.v-text-field .v-input__control .v-input__slot {
  min-height: auto !important;
  display: flex !important;
  align-items: center !important;
}
v-progress-circular {
  margin-left: 45%!important;
}
</style>
