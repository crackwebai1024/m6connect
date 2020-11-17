<template class="mx-0">
    <v-container >
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
            <v-list-item v-for="(item, i) in areas.concat(areas2)" :key="i">
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
          @change="changeEvent"
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
  name: "AppsBuilderList",
  data: () => ({
    loading: true,
    areas2: [],
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
        { text: "All Apps",     type: "subtitle", function: () => { this.setFilterTag({key: 'everyone', value: 'All Apps' }); this.reload();}},
        { text: "Applications", type: "title",    function: () => {                                                                         }},
        { text: "ITApps",       type: "subtitle", function: () => { this.setFilterTag({key: 'itapps',   value: 'ITApps'   }); this.reload();}}
      ]
    }
  },
  methods: {
    ...mapActions("ITAppsModule", {
      getApps: "get_all_apps",
      selectApp: "get_select_apps",
      filterApps: "get_filter_apps",
      setFilterTag: "set_filter_tag"
    }),
    ...mapActions("DynamicAppsModule", {
      getDynamicApps: "get_all_apps_by_id",
      setDynamicApps: 'set_apps'
    }),
    changeEvent(event){
      this.records = [];
      this.loading = true;
      this.filterApps({ param: event }).then(() => {
        this.records = this.list();
        this.loading = false;
      });
    },
    getRecords(appId){
      this.loading = true;
      this.getDynamicApps(appId).then(() => {
        this.records = this.list();
        this.loading = false;
      });
    },
    reload(){
      this.loading = true;
      this.records = [];
      this.getApps().then( 
        apps => (this.records = this.list(), this.loading = false)
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
    this.setDynamicApps();
    this.setFilterTag({key: 'everyone', value: 'All Apps'});
    this.getApps().then(
      apps => (this.records = this.list(), this.loading = false)
    );
    this.selectApp().then(res => {
      res['data'].forEach(app => {
        this.areas2.push(
          { text: app['title'], type: "subtitle", function: () => { this.setFilterTag({key: 'dynamicApp', value: app['title'] }); this.getRecords(app.id); }},
        );
      })
    })
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