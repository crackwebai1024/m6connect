<template>
  <div>
    <v-row no-gutters>
      <v-col cols="2">
        <!-- Side Panel Component  -->
      </v-col>
      <v-col cols="4" class="height-100-vh vertical-scroll dont-show-scroll">
        <!-- Social Network -->
        <project-social-media />
      </v-col>
      <v-col cols="4" class="height-100-vh vertical-scroll dont-show-scroll">
        <!-- General use list component-->
        <general-list />
      </v-col>
      <v-col cols="2">
        <!-- Chat Component -->
        <m6-chat></m6-chat>
      </v-col>
    </v-row>
    <!-- Preview overlay -->
    <general-overlay></general-overlay>
  </div>
</template>

<script>
// Components
import ProjectSocialMedia from "@/views/Home/ProjectSocialMedia";
import GeneralList from "@/views/Home/GeneralList";
import M6Chat from "@/components/Home/M6Chat";
import GeneralOverlay from "@/components/Shared/GeneralOverlay";

export default {
  components: {
    GeneralList,
    ProjectSocialMedia,
    M6Chat,
    GeneralOverlay,
  },
  name: "Home",
};
</script>

<style lang="scss" scoped>
</style>