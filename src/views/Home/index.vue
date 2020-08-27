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
      <v-col :cols="layout.contacts ? 5 : 4" class="height-100-vh vertical-scroll dont-show-scroll">
        <!-- General use list component-->
        <general-list />
      </v-col>
      <v-col :cols="layout.contacts ? 1 : 2" style class></v-col>
      <v-col :cols="layout.contacts ? 1 : 2" style="position:fixed; right: 0; bottom: 0; top: 0;"
             class="pt-3 d-flex flex-column align-end">
        <!-- Chat Component -->
        <v-card class="fill-height" :width="layout.contacts ? 56 : '100%'">
          <m6-chat></m6-chat>
        </v-card>
      </v-col>
    </v-row>
    <!-- Preview overlay -->
    <chat-wrapper></chat-wrapper>
    <general-overlay></general-overlay>
  </div>
</template>

<script>
import ProjectSocialMedia from "./ProjectSocialMedia";
import M6Chat from "@/components/Home/M6Chat";
import ChatWrapper from "@/components/Home/M6Chat/ChatWrapper";
import SidePanel from "./SidePanel";
import GeneralList from "@/views/Home/GeneralList";
import GeneralOverlay from "@/components/Shared/GeneralOverlay";
import {mapState} from 'vuex'

export default {
  components: {
    GeneralList,
    ProjectSocialMedia,
    M6Chat,
    ChatWrapper,
    GeneralOverlay,
    SidePanel,
  },
  computed: {
    ...mapState(['layout'])
  },
  name: "Home",
};
</script>

<style lang="scss" scoped>
</style>