<template class="mx-0">
    <v-container >
    <header-component hasslot :info="{title:'Search All Apps', icon:''}" 
      class="max-w-tight mb-3 card-custom-shadow rounded w-full mx-auto h-auto">
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
    <div v-if="!loading">
      <div
        :key="index"
        v-for="(item, index) of apps"
        :class="Object.keys(apps).length !== index + 1 ? 'mb-3' : ''"
      >
        <general-item :recordData="item" />
      </div>
      <div class="w-full max-w-tight mx-auto py-3" v-if="apps.length === 0">No results found</div>
    </div>
    <v-container v-else>
      <v-progress-circular
        style="margin-left: 45%;"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-container>
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
    apps: [],
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
      filterApps: "get_filter_builder_apps",
    }),
    ...mapActions("DynamicAppsModule", {
      setDynamicApps: 'set_apps',
      getApps: "get_apps",
    }),
    changeEvent(event){
      this.apps = [];
      this.loading = true;
      this.filterApps({ param: event }).then(() => {
        this.apps = this.list();
        this.loading = false;
      });
    },
    reload(){
      this.loading = true;
      this.apps = [];
      this.getApps().then( 
        apps => (this.apps = this.list(), this.loading = false)
      );
    },
  },
  mounted() {
    this.setDynamicApps().then(() => {
        this.getApps().then(apps => {
            this.apps = apps;
            this.loading = false;
        });
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