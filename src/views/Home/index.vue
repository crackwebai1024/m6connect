<template>
  <div>
    <v-row no-gutters>
      <v-col :cols="computedFirstPreviewColumns" v-if="computedFirstPreviewColumns > 0">
        <div>
          <v-row no-gutters class="pa-3">
            <v-spacer></v-spacer>
            <v-icon @click="change_preview_navigation_drawer(false)">mdi-arrow-collapse-left</v-icon>
          </v-row>
          <!-- Module of project or user info -->
          <project-info class="pa-0" :stayColumn="'right'"/>
        </div>
      </v-col>
      <v-col :cols="computedGridColumns">
        <!-- Module of projects list -->
        <projects-list />
      </v-col>
    </v-row>
    <BootomTemplate/>
  </div>
</template>

<script>
import ProjectInfo from "./ProjectInfo";
import ProjectsList from "./ProjectsList";
import BootomTemplate from "@/components/BootomSheet"

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    ProjectInfo,
    ProjectsList,
    BootomTemplate
  },
  data: () => ({
    first_preview: false,
  }),
  name: "Home",
  computed: {
    computedFirstPreviewColumns() {
      if (this.first_preview) {
        return 3;
      } else {
        return 0;
      }
    },
    computedGridColumns() {
      if (!this.first_preview) {
        return 12;
      } else {
        return 9;
      }
    },
    ...mapGetters(["get_preview_navigation_drawer"]),
    navigationDrawer() {
      let navdrawer = this.get_preview_navigation_drawer();
      return navdrawer;
    },
  },
  methods: {
    ...mapActions(["change_preview_navigation_drawer"]),
  },
  watch: {
    navigationDrawer(val) {
      this.first_preview = val;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>