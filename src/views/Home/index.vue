<template>
  <div>
    <!-- General use list component-->
    <div v-if="get_screen_status()" style="margin: 10px 10px 0;">
      <record-container style="background: #FFFFFF" :data="get_record_full_screen()" />
    </div>
    <v-row v-else no-gutters class="mr-2">
      <v-col cols="6" class="height-100-vh vertical-scroll dont-show-scroll">
        <!-- Social Network -->
        <project-social-media />
      </v-col>
      <v-col :cols="layout.contacts ? 6 : 6" class="height-100-vh vertical-scroll dont-show-scroll">
        <!-- Project List Component -->
        <general-list />
      </v-col>
    </v-row>
    <image-caroussel-overlay
      @restartImageArray="restartImageArray()"
      :value="overlayActive"
      :images="imageArray"
      :selected="selectedImage"
    ></image-caroussel-overlay>
  </div>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex';
import ProjectSocialMedia from "./ProjectSocialMedia";
import GeneralList from "@/views/Home/GeneralList";
import RecordContainer from "@/components/RecordMode/RecordContainer";
import ImageCarousselOverlay from "@/components/Shared/ImageCarousselOverlay";

export default {
  name: "Home",
  components: {
    ProjectSocialMedia,
    RecordContainer,
    GeneralList,
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

<style lang="scss" scoped>
</style>