<template>
  <div>
    <v-row no-gutters>
      <v-col cols="2" class="red">
        <!-- Side Panel Component  -->
      </v-col>
      <v-col cols="4" class="green">
        <!-- M6 News Feed Component -->
      </v-col>
      <v-col cols="4">
        <!-- Project List Component-->
        <projects-list />
      </v-col>
      <v-col cols="2" class="blue">
        <!-- Chat Component -->
        <m6-chat></m6-chat>
      </v-col>
    </v-row>
    <!-- Preview used later -->
    <div v-if="false">
      <project-info></project-info>
    </div>
    <BootomTemplate/>
  </div>
</template>

<script>
import ProjectInfo from "./ProjectInfo";
import ProjectsList from "./ProjectsList";
import BootomTemplate from "@/components/BootomSheet"
import M6Chat from "@/components/Home/M6Chat"

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    ProjectInfo,
    ProjectsList,
    BootomTemplate,
    M6Chat
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