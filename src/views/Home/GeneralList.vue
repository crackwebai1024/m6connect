<template>
  <v-container class="pa-0 d-flex flex-wrap">
    <header-component hasslot :info="{title:'Search All Apps', icon:''}" 
      class="max-w-tight mb-3 card-custom-shadow rounded w-full mx-auto h-auto">
      <template v-slot:select>
        <v-menu transition="slide-y-transition" offset-y bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="0" class="capitalize mb-0 px-0 pl-1 transparent purple--text text--darken-1 font-weight-bold" v-bind="attrs" v-on="on">
              {{filter['value']}}
              <v-icon class="blue--text text--darken-3">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item v-for="(item, i) in areas" :key="i">
              <v-list-item-title
                @click="item.function"
                :class="item.type == 'title' ? 'grey--text' : 'black--text pointer'"
              >{{ item.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:input>
        <v-text-field
          class="font-weight-bold"
          height="40"
          label="Start Typing to Search"
          rounded
          flat
          dense
          v-model="searchInput"
          single-line
          hide-details
          solo-inverted
        >
          <template v-slot:append>
            <v-row class="d-flex align-center">
              <v-icon>mdi-magnify</v-icon>
            </v-row>
          </template>
        </v-text-field>
      </template>
    </header-component>
    <v-dialog
      v-model="dialog"
      width="800"
      persistent
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="blue lighten-2 w-full mx-auto"
          class="max-w-tight"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Add new Record
        </v-btn>
      </template>
      <new-record-dialog @closeModal="closeModal" />
    </v-dialog>
    <div
      :key="index"
      v-for="(item, index) of records"
      :class="Object.keys(records).length !== index + 1 ? 'mb-3' : ''"
    >
      <general-item :recordData="item" />
    </div>
    <div class="w-full max-w-tight mx-auto py-3" v-if="records.length === 0">No results found</div>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import GeneralItem from "@/components/Home/GeneralItem";
import HeaderComponent from "@/components/Home/HeaderComponent";
import NewRecordDialog from "@/components/Dialogs/NewRecordDialog";

export default {
  components: {
    GeneralItem,
    NewRecordDialog,
    HeaderComponent,
  },
  name: "GeneralList",
  data: () => ({
    perPage: 8,
    records: [],
    dialog: false,
    searchInput: "",
  }),
  computed: {
    ...mapGetters("GeneralListModule", {
      list: "get_general_list"
    }),
    ...mapGetters("ITAppsModule", {
      filter: "getFilter"
    }),
    areas(){ 
      return [
        { text: "Everyone",           type: "subtitle", function: () => { this.setFilterTag({key: 'everyone',        value: 'Everyone'           }); this.reload();}},
        { text: "Applications",       type: "title",    function: () => {                                                                                          }},
        { text: "ITApps",             type: "subtitle", function: () => { this.setFilterTag({key: 'itapps',          value: 'ITApps'             }); this.reload();}},
        { text: "DynamicApps",        type: "subtitle", function: () => { this.setFilterTag({key: 'dynamicapps',     value: 'DynamicApps'        }); this.reload();}},
        { text: "Teams",              type: "title",    function: () => {                                                                                          }},
        { text: "All my teams",       type: "subtitle", function: () => { this.setFilterTag({key: 'everyone',        value: 'All my teams'       }); this.reload();}},
        { text: "IT Team XY",         type: "subtitle", function: () => { this.setFilterTag({key: 'everyone',        value: 'IT Team XY'         }); this.reload();}},
        { text: "CPM Team Z",         type: "subtitle", function: () => { this.setFilterTag({key: 'everyone',        value: 'CPM Team Z'         }); this.reload();}},
        { text: "Departments",        type: "title",    function: () => {                                                                                          }},
        { text: "All my departments", type: "subtitle", function: () => { this.setFilterTag({key: 'everyone',        value: 'All my departments' }); this.reload();}},
        { text: "Finances",           type: "subtitle", function: () => { this.setFilterTag({key: 'everyone',        value: 'Finances'           }); this.reload();}},
        { text: "Operations",         type: "subtitle", function: () => { this.setFilterTag({key: 'everyone',        value: 'Operations'         }); this.reload();}},
      ]
    }
  },
  methods: {
    ...mapActions("ITAppsModule", {
      getApps: "get_all_apps",
      setFilterTag: "set_filter_tag"
    }),
    reload(){
      this.records = [];
      this.getApps().then( 
        apps => (this.records = this.list())
      );
    },
    remainingPerPage(page) {
      let remaining = this.perPage;
      if (page + 1 === this.pages) {
        remaining =
          this.perPage - (this.perPage * this.pages - this.recordsLength);
      }
      return remaining;
    },
    closeModal(){
      this.dialog = false;
    },
    getIndex(i, index) {
      let ind = i * this.perPage + index - 1;
      return ind;
    },
  },
  mounted() {
    this.setFilterTag({key: 'everyone', value: 'Everyone'});
    this.getApps().then(
      apps => (this.records = this.list())
    );
  },
};
</script>

<style lang="scss">
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
</style>