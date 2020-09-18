<template>
  <v-container class="max-w-content px-0 ma-0 pt-5 pb-0 d-flex vertical-scroll dont-show-scroll height-100-vh">
    <!-- General use list component-->
    <template v-if="get_screen_status()">
      <record-container :data="get_record_full_screen()" />
    </template>
    <template v-else>
      <!-- <v-card width="50%" height="100%" elevation="0" class="vertical-scroll dont-show-scroll"> -->
        <!-- Social Network -->
        <project-social-media />
        <image-caroussel-overlay
          @restartImageArray="restartImageArray()"
          :value="overlayActive"
          :images="imageArray"
          :selected="selectedImage"
        ></image-caroussel-overlay>

      <!-- </v-card> -->
      <!-- <v-card width="50%" height="100%" elevation="0" class="vertical-scroll dont-show-scroll"> -->
        <!-- Project List Component -->
        <!-- <general-list />
      </v-card> -->
    </template>
  </v-container>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex';
import ProjectSocialMedia from "./ProjectSocialMedia";
// import GeneralList from "@/views/Home/GeneralList";
import RecordContainer from "@/components/RecordMode/RecordContainer";
import ImageCarousselOverlay from "@/components/Shared/ImageCarousselOverlay";

export default {
  name: "Home",
  components: {
    ProjectSocialMedia,
    RecordContainer,
    // GeneralList,
    ImageCarousselOverlay,
  },
  computed: {
    ...mapGetters({
      get_screen_status: "GeneralListModule/get_screen_status",
      get_record_full_screen: "GeneralListModule/get_record_full_screen",
      get_image_preview_overlay: "get_image_preview_overlay"
    }),
    ...mapState(['layout']),
    imageArray() {
      let images = this.get_image_preview_overlay()[0];
      return images;
    },
    selectedImage() {
      let selected = this.get_image_preview_overlay()[1];
      return selected;
    },
    overlayActive() {
      let selected = this.get_image_preview_overlay()[0].length > 0;
      return selected;
    },
  },
  methods: {
    ...mapActions(["reset_image_overlay"]),
    restartImageArray() {
      this.reset_image_overlay();
    },
  },
};
</script>
