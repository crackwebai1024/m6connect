<template>
  <div class>
    <div>
      <!-- Full screen view -->
      <div v-if="get_screen_status()" class="d-flex blue darken-1 white--text pl-3 pr-2 py-2">
        <div class="font-weight-black" style="font-size: 17px;">{{ infoData.project_name }}</div>
        <v-spacer></v-spacer>
        <v-icon color="white" @click="hidden_full_screen(infoData)" size="18" class="px-2" >mdi-window-minimize</v-icon>
        <v-icon color="white" @click="preview_screen(infoData)" class>mdi-arrow-collapse</v-icon>
        <v-icon color="white" @click="close_full_screen()">mdi-close</v-icon>
      </div>
      <!-- Preview View -->
      <div v-else class="d-flex blue darken-1 white--text pl-3 pr-2 py-2">
        <div class="font-weight-black" style="font-size: 17px;">{{ infoData.project_name }}</div>
        <v-spacer></v-spacer>
        <v-icon color="white" @click="hidden_preview(infoData)" size="18" class="px-2" >mdi-window-minimize</v-icon>
        <v-icon color="white" @click="full_screen(infoData)" class>mdi-arrow-expand</v-icon>
        <v-icon color="white" @click="remove_from_active(infoData)">mdi-close</v-icon>
      </div>
      <navigation-bar :NavWidgets=actions :name="infoData.project_name" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import NavigationBar from "./NavigationBar"

export default {
  components: {
    NavigationBar
  },
  data: () => ({
    actions: []
  }),
  name: "ProjectRecord",
  computed: {
    ...mapGetters("GeneralListModule",["get_screen_status"]),
    infoData() {
      return this.data;
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
    async setData(){
      let data = await this.get_nav_widgets(this.infoData.widgets);
      this.actions = data;
    }
  },
  props: {
    data: Object,
    projectIndex: Number,
  },
  watch:{
    infoData:function(){
      this.setData();
    }
  },
  created(){
    this.setData();
  }
};
</script>