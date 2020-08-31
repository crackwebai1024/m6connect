<template>
  <v-container class="py-0 px-0">
    <div>
      <!-- Full screen view -->
      <div v-if="get_screen_status()" class="d-flex blue darken-1 white--text pl-3 pr-2 py-2">
        <div class="font-weight-black" style="font-size: 17px;">{{ get_record_full_screen().record_name }}</div>
        <v-spacer></v-spacer>
        <v-icon color="white" @click="hidden_full_screen(get_record_full_screen())" size="18" class="px-2" >mdi-window-minimize</v-icon>
        <v-icon color="white" @click="preview_screen(get_record_full_screen())" class>mdi-arrow-collapse</v-icon>
        <v-icon color="white" @click="close_full_screen()">mdi-close</v-icon>
      </div>
      <!-- Preview View -->
      <div v-else class="d-flex blue darken-1 white--text pl-3 pr-2 py-2">
        <div class="font-weight-black" style="font-size: 17px;">{{ infoRecordData.record_name }}</div>
        <v-spacer></v-spacer>
        <v-icon color="white" @click="hidden_preview(infoRecordData)" size="18" class="px-2" >mdi-window-minimize</v-icon>
        <v-icon color="white" @click="full_screen(infoRecordData)" class>mdi-arrow-expand</v-icon>
        <v-icon color="white" @click="remove_from_active(infoRecordData)">mdi-close</v-icon>
      </div>
      <navigation-bar v-if="get_screen_status()" :NavWidgets=actions :project="get_record_full_screen()" />
      <navigation-bar v-else :NavWidgets=actions :project="infoRecordData" />
    </div>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import NavigationBar from "./NavigationBar";
import globalDataApp from "../../store/data";

export default {
  components: {
    NavigationBar
  },
  data: () => ({
    actions: []
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
    ...mapActions("GeneralListModule", [
      "preview_screen", "remove_from_active", "hidden_full_screen", 
      "get_nav_widgets", "hidden_preview", "full_screen", "close_full_screen"
    ]),
    setData(){
      this.actions = this.get_screen_status() ? globalDataApp.records_widgets[this.get_record_full_screen().record_type]
        : globalDataApp.records_widgets[this.infoRecordData.record_type];
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