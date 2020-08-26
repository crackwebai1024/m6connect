<template>
  <div>
    <v-row no-gutters class="grey lighten-2">
      <v-col cols="2">
        <!-- Side Panel Component  -->
        <side-panel />
      </v-col>
      <v-col cols="4" class="height-100-vh vertical-scroll dont-show-scroll">
        <!-- Social Network -->
        <project-social-media />
      </v-col>
      <v-col cols="4" class="height-100-vh vertical-scroll dont-show-scroll">
        <!-- General use list component-->
        <general-list />
      </v-col>
      <v-col cols="2" style class></v-col>
      <v-col cols="2" style="position:fixed; right: 0; bottom: 0; top: 0;" class="pt-3">
        <!-- Chat Component -->
        <v-card class="fill-height">
          <m6-chat></m6-chat>
        </v-card>
      </v-col>
    </v-row>
    <!-- Preview overlay -->
    <general-overlay></general-overlay>
  </div>
</template>

<script>
import ProjectSocialMedia from "./ProjectSocialMedia";
import M6Chat from "@/components/Home/M6Chat";
import SidePanel from "./SidePanel";
import GeneralList from "@/views/Home/GeneralList";
import GeneralOverlay from "@/components/Shared/GeneralOverlay";

export default {
  components: {
    GeneralList,
    ProjectSocialMedia,
    M6Chat,
    GeneralOverlay,
    SidePanel,
  },
  name: "Home",
};
</script>

<style lang="scss" scoped>
</style>