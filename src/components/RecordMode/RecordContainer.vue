<template>
  <v-container class="pa-0 max-w-none h-full">
    <record-header :headerDataRecord="infoRecordData"/>
    <navigation-bar class="vertical-scroll dont-show-scroll preview-content" v-if="get_screen_status() && record_data == null" :NavWidgets=actions :project="get_record_full_screen()" />
    <navigation-bar class="vertical-scroll dont-show-scroll preview-content" v-else :NavWidgets=actions :project="infoRecordData" />
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import NavigationBar from "./NavigationBar";
import globalDataApp from "../../store/data";
import RecordHeader from "./RecordHeader";

export default {
  components: {
    NavigationBar,
    RecordHeader
  },
  data: () => ({
    actions: [],
  }),
  name: "RecordContainer",
  computed: {
    ...mapGetters("GeneralListModule",["get_screen_status", "get_record_full_screen"]),
    infoRecordData() {
      return this.record_data;
    },
    infoWidget(){
      return this.setData();
    }
  },
  methods: {
    setData(){
      this.actions = this.get_screen_status() ? globalDataApp.records_widgets[this.get_record_full_screen().app_type]
        : globalDataApp.records_widgets[this.infoRecordData.app_type];
    }
  },
  props: {
    record_data: Object,
    recordIndex: Number,
  },
  watch:{
    infoRecordData:function(){
      this.setData();
    }
  },
  mounted(){
    this.setData();
  }
};
</script>
<style>
.preview-content {
  height: calc(100% - 41px);
}
</style>