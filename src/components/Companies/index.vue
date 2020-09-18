<template>
  <v-container class="max-w-content px-0 ma-0 pt-5 pb-0 d-flex vertical-scroll dont-show-scroll height-100-vh">
    <!-- General use list component-->
    <template v-if="get_screen_status()">
      <record-container :data="get_record_full_screen()" />
    </template>
    <template v-else>
      <!-- Project List Component -->
      <general-list />
    </template>
  </v-container>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex';
import GeneralList from "@/views/Home/GeneralList";
import RecordContainer from "@/components/RecordMode/RecordContainer";

export default {
  name: "Home",
  components: {
    RecordContainer,
    GeneralList,
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
