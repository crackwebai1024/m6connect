<template>
  <v-container
    class="pa-0 w-full"
    :class="tableView ? 'mx-10' : ''"
    fluid
  >
    <record-list-header
      v-if="headerLoaded"
      :app-list="areas.concat(areas2)"
      class="card-custom-shadow h-auto mb-3 mx-auto rounded"
      @changeEvent="changeEvent"
      @changingApps="changingApps"
      @tableViewChange="tableViewChange"
    />

    <div
      v-if="!loading && headerLoaded"
      :class="tableView?'app-list__container':'app-list__container h-auto mb-3 mx-auto rounded'"
    >
      <template v-if="tableView">
        <records-table
          :items="records"
          :table-headers="dynamic ? dynamicTableHeader : headers"
        />
      </template>
      <template v-else>
        <v-row
          v-if="!loading"
          class="w-full"
        >
          <v-col
            v-for="(item, index) of records"
            :key="index"
            class="app-item__container"
            md="6"
            sm="12"
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
import RecordListHeader from '@/components/Home/RecordListHeader'
import RecordsTable from '@/components/RecordsTable'

export default {
  name: 'GeneralList',
  components: {
    GeneralItem,
    RecordListHeader,
    RecordsTable
  },
  data: () => ({
    loading: true,
    headerLoaded: false,
    areas2: [],
    perPage: 8,
    records: [],
    searchInput: '',
    tableView: false,
    dynamic: false,
    headers: [
      { text: 'Image', value: 'image' },
      { text: 'Record #', value: 'record_number' },
      { text: 'App', value: 'app_prefix' },
      { text: 'Title', value: 'title' },
      { text: 'Description', value: 'description' },
      { text: 'Creator', value: 'author' },
      { text: 'Created On', value: 'created_at' },
      { text: 'Class', value: 'class' },
      { text: 'Category', value: 'category' },
      { text: 'State', value: 'state' },
      { text: 'Status', value: 'status' },
      { text: 'Action', value: 'action', sortable: false }
    ],
    dynamicTableHeader: []
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
          metadata: {
            appicon: {
              icon: 'mdi-store',
              background: ''
            }
          },
          bgColor: this.getRandomColor(),
          function: () => {
            this.setFilterTag({ key: 'everyone', value: 'All Apps' })
            this.reload()
          }
        },
        {
          text: 'Applications',
          type: 'title',
          metadata: {
            appicon: {
              icon: 'mdi-store',
              background: ''
            }
          },
          bgColor: this.getRandomColor(),
          function: () => {}
        },
        {
          text: 'ITApps',
          type: 'subtitle',
          metadata: {
            appicon: {
              icon: 'mdi-store',
              background: ''
            }
          },
          bgColor: this.getRandomColor(),
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
    })
    this.selectApp().then(res => {
      res['data'].forEach(app => {
        this.areas2.push(
          {
            text: app['title'],
            prefix: app['prefix'],
            type: 'subtitle',
            iconLink: app['iconLink'],
            metadata: JSON.parse(app['metadata']),
            bgColor: this.getRandomColor(),
            function: () => {
              this.setFilterTag({ key: 'dynamicApp', value: app['title'] })
              this.getRecords(Number(app.id))
            }
          }
        )
      })
      this.headerLoaded = true
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
    ...mapGetters('GeneralListModule', {
      getFieldList: 'get_fields_list'
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
        this.dynamic = false
        this.loading = false
      })
    },
    getRecords(appId) {
      this.loading = true
      this.getDynamicApps(appId).then(() => {
        const temp = this.list()
        this.dynamicTableHeader = this.headers.slice(0, 11)

        const fields = this.getFieldList()
        temp.map((row, index) => {
          fields[index].map((field, findex) => {
            if (row.app_id === field.app_id) {
              if (!this.dynamicTableHeader.find(row => row.value === `${field.type}-${findex}`)) {
                this.dynamicTableHeader.push({
                  text: this.stringToUpercase(field.label),
                  value: field.type + '-' + findex,
                  type: field.type
                })
              }
              row[field.type + '-' + findex] = field.value
            }
          })
        })
        this.dynamicTableHeader.push(this.headers.slice(-1)[0])
        this.records = temp
        this.dynamic = true
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    reload() {
      this.loading = true
      this.records = []
      this.dynamic = false
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
    },
    stringToUpercase(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    getRandomColor() {
      return 'rgb(' + [
        ~~(Math.random() * 255),
        ~~(Math.random() * 255),
        ~~(Math.random() * 255)
      ] + ')'
    },
    tableViewChange(val) {
      this.tableView = val
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
.app-list__container {
  justify-content: space-between;
  display: flex;
}
.app-item__container {
  margin: 0;
  padding: 8px;
}
</style>
