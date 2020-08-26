<template>
  <div class>
    <div>
      <div class="d-flex blue darken-1 white--text pl-3 pr-2 py-2">
        <div class="font-weight-black" style="font-size: 17px;">{{ infoData.project_name }}</div>
        <v-spacer></v-spacer>
        <v-icon color="white" size="18" class="px-2">mdi-window-minimize</v-icon>
        <v-icon color="white" class>mdi-arrow-expand</v-icon>
        <v-icon color="white" @click="remove">mdi-close</v-icon>
      </div>
      <navigation-bar/>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import NavigationBar from "./NavigationBar"

export default {
  components: {
    NavigationBar
  },
  name: "ProjectInfo",
  computed: {
    infoData() {
      return this.data;
    },
  },
  methods: {
    ...mapActions("GeneralListModule", ["remove_from_active"]),
    remove() {
      this.remove_from_active(this.infoData.uid);
    },
  },
  props: {
    data: Object,
    projectIndex: Number,
  },
};
</script>