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
    <image-caroussel-overlay
      @restartImageArray="restartImageArray()"
      :value="overlayActive"
      :images="imageArray"
      :selected="selectedImage"
    ></image-caroussel-overlay>
  </div>
</template>

<script>
import ProjectSocialMedia from "./ProjectSocialMedia";
import M6Chat from "@/components/Home/M6Chat";
import SidePanel from "./SidePanel";
import GeneralList from "@/views/Home/GeneralList";
import GeneralOverlay from "@/components/Shared/GeneralOverlay";
import ImageCarousselOverlay from "@/components/Shared/ImageCarousselOverlay";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    GeneralList,
    ProjectSocialMedia,
    M6Chat,
    GeneralOverlay,
    SidePanel,
    ImageCarousselOverlay,
  },
  computed: {
    ...mapGetters(["get_image_preview_overlay"]),
    imageArray() {
      let images = this.get_image_preview_overlay()[0];
      console.log("Images", images);
      return images;
    },
    selectedImage() {
      let selected = this.get_image_preview_overlay()[1];
      console.log("selected", selected);
      return selected;
    },
    overlayActive() {
      let selected = this.get_image_preview_overlay()[0].length > 0;
      console.log("selected", selected);
      return selected;
    },
  },
  name: "Home",
  methods: {
    ...mapActions(["reset_image_overlay"]),
    restartImageArray() {
      this.reset_image_overlay();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>