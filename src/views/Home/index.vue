<template>
  <v-container
    class="d-flex dont-show-scroll h-full ma-0 pb-0 pt-5 px-0 vertical-scroll w-main-content"
  >
    <!-- General use list component-->
    <template v-if="get_screen_status()">
      <record-container
        class="main-content"
        :data="get_record_full_screen()"
      />
    </template>
    <template v-else>
      <!-- Social Network -->
      <project-social-media class="main-content" />
      <image-caroussel-overlay
        :images="imageArray"
        :selected="selectedImage"
        :value="overlayActive"
        @restartImageArray="restartImageArray"
      />
    </template>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import ProjectSocialMedia from './ProjectSocialMedia'
import RecordContainer from '@/components/RecordMode/RecordContainer'
import ImageCarousselOverlay from '@/components/Shared/ImageCarousselOverlay'

export default {
  name: 'Home',
  components: {
    ProjectSocialMedia,
    RecordContainer,
    ImageCarousselOverlay
  },
  computed: {
    ...mapGetters({
      get_screen_status: 'GeneralListModule/get_screen_status',
      get_record_full_screen: 'GeneralListModule/get_record_full_screen',
      get_image_preview_overlay: 'get_image_preview_overlay'
    }),
    ...mapState(['layout']),
    imageArray() {
      const images = this.get_image_preview_overlay()[0]
      return images
    },
    selectedImage() {
      const selected = this.get_image_preview_overlay()[1]
      return selected
    },
    overlayActive() {
      const selected = this.get_image_preview_overlay()[0].length > 0
      return selected
    }
  },
  methods: {
    ...mapActions(['reset_image_overlay']),
    restartImageArray() {
      this.reset_image_overlay()
    }
  }
}
</script>

