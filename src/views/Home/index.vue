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
    <!-- Preview used later -->

    <div
      v-if="overlay"
      opacity="0"
      class="d-flex align-end"
      style="width: 100vw; height: 100vh; position: fixed; left:0; top: 0; pointer-events: none;"
    >
      <v-card tile width="100vw" height="85vh" class="transparent elevation-0">
        <v-row no-gutters class="fill-height">
          <!-- <v-col cols="1">
          </v-col>-->
          <v-col cols="3" class="py-0 px-1">
            <div
              class="white fill-height elevation-3"
              v-if="!active_projects[0] == false"
              style="pointer-events: auto;"
            >
              <project-preview :projectIndex="0"></project-preview>
            </div>
          </v-col>
          <v-col cols="3" class="py-0 px-1">
            <div
              class="white fill-height elevation-3"
              v-if="!active_projects[1] == false"
              style="pointer-events: auto;"
            >
              <project-preview :projectIndex="1"></project-preview>
            </div>
          </v-col>
          <v-col cols="5"></v-col>
          <v-col
            style="width: 90px; height: 100vh; position: fixed; top: 0; right: 0;"
            class="pb-3"
          >
            <v-row
              no-gutters
              style="position: relative;"
              class="flex-column fill-height"
              align="center"
              justify="end"
            >
              <div
                class="mt-3"
                style="position: relative; pointer-events: auto;"
                v-for="(item, index) in idle_projects"
                :key="index"
              >
                <v-avatar size="80">
                  <img :src="item.projet_image_url || ''" alt="project_url" />
                </v-avatar>
                <v-avatar
                  size="30"
                  class="pointer"
                  color="grey lighten-1"
                  style="position: absolute; top: 0; right: 0; z-index: 99; pointer-events: auto;"
                  @click="removeFromIdle(item.projecj_id)"
                >
                  <v-icon color="white">mdi-close</v-icon>
                </v-avatar>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import ProjectSocialMedia from "@/views/Home/ProjectSocialMedia.vue";
import ProjectPreview from "@/components/PreviewModes/ProjectPreview.vue";
import GeneralList from "@/views/Home/GeneralList.vue";
import M6Chat from "@/components/Home/M6Chat";
import _ from "lodash";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ProjectPreview,
    GeneralList,
    ProjectSocialMedia,
    M6Chat,
  },
  data: () => ({
    first_preview: false,
  }),
  name: "Home",
  computed: {
    ...mapGetters("InfoModule", ["get_preview_navigation_drawer"]),
    ...mapGetters("GeneralListModule", [
      "get_active_projects",
      "get_idle_projects",
    ]),
    active_projects() {
      let ap = this.get_active_projects();
      return ap;
    },
    idle_projects() {
      let ip = _.reverse(this.get_idle_projects());
      console.log("IDLE Projects: ", ip);
      return ip;
    },
    overlay() {
      return this.get_preview_navigation_drawer();
    },
  },
  methods: {
    ...mapActions("InfoModule", ["change_preview_navigation_drawer"]),
    ...mapActions("GeneralListModule", ["remove_from_idle"]),
    removeFromIdle(id) {
      this.remove_from_idle(id);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>