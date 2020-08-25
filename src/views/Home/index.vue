<template>
  <div>
    <v-row no-gutters>
      <v-col cols="2">
        <!-- Side Panel Component  -->
      </v-col>
      <v-col cols="4" class="height-100-vh vertical-scroll dont-show-scroll">
        <!-- Social Network -->
        <project-social-media/>
      </v-col>
      <v-col cols="4" class="height-100-vh vertical-scroll dont-show-scroll">
        <!-- Project List Component-->
        <projects-list />
      </v-col>
      <v-col cols="2">
        <!-- Chat Component -->
        <m6-chat></m6-chat>
      </v-col>
    </v-row>
    <!-- Preview used later -->
    
    <div v-if="overlay" opacity="0" class="d-flex align-end" style="width: 100vw; height: 100vh; position: fixed; left:0; top: 0; pointer-events: none;">
      <v-card tile width="100vw" height="85vh" class="transparent elevation-0">
        <v-row no-gutters class="fill-height">
          <!-- <v-col cols="1">
          </v-col> -->
          <v-col cols="3" class="py-0 px-1">
            <div class="white fill-height elevation-3" v-if="!active_projects[0] == false" style="pointer-events: auto;">
              <project-info :projectIndex="0"></project-info>
            </div>
          </v-col>
          <v-col cols="3" class="py-0 px-1">
            <div class="white fill-height elevation-3" v-if="!active_projects[1] == false" style="pointer-events: auto;">
              <project-info :projectIndex="1" ></project-info>
            </div>
          </v-col>
          <!-- <v-col cols="3" class="py-0 px-1">
            <div class="white fill-height elevation-3" v-if="!active_projects[0] == false" style="pointer-events: auto;">
              <project-info :projectIndex="0"></project-info>
            </div>
          </v-col> -->
          <v-col cols="2">
            
          </v-col>
        </v-row>
        
      </v-card>      
    </div>
    <BootomTemplate/>
  </div>
</template>

<script>
import ProjectSocialMedia from "./ProjectSocialMedia";
import ProjectInfo from "./ProjectInfo";
import ProjectsList from "./ProjectsList";
import BootomTemplate from "@/components/BootomSheet"
import M6Chat from "@/components/Home/M6Chat"

import {  mapActions, mapGetters } from "vuex";

export default {
  components: {
    ProjectInfo,
    ProjectsList,
    BootomTemplate,
    ProjectSocialMedia,
    M6Chat
  },
  data: () => ({
    first_preview: false,
  }),
  name: "Home",
  computed: {
    ...mapGetters("InfoModule", ["get_active_projects", "get_preview_navigation_drawer"]),
    active_projects() {
      return this.get_active_projects()
    },
    overlay() {
      return this.get_preview_navigation_drawer()
    }
  },
  methods: {
    ...mapActions("InfoModule", ["change_preview_navigation_drawer"]),
  },
};
</script>

<style lang="scss" scoped>
</style>