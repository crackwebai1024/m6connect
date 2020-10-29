<template>
    <v-row class="mt-4 d-block ma-0 py-4 px-5 white width-100 vertical-scroll dont-show-scroll">
        <p class="black--text font-weight-medium text-h6 mb-2">Sharp Healthcare</p>
        <v-row class="d-flex ma-0">
            <v-col cols="6" class="pa-0">
                <div class="d-flex align-center mb-2">
                    <v-icon class="black--text">mdi-email-outline</v-icon>
                    <p class="mb-0 ml-2 body-2">contact@sharp.com</p>
                </div>
                <div class="d-flex align-center mb-2">
                    <v-icon class="black--text">mdi-earth</v-icon>
                    <p class="mb-0 ml-2 body-2">www.sharphealthcare.com</p>
                </div>
            </v-col>
            <v-col cols="6" class="pa-0">
                <div class="d-flex align-center justify-end mb-2">
                    <v-icon class="black--text">mdi-phone</v-icon>
                    <p class="mb-0 ml-2 body-2">(915) 445 - 1234</p>
                </div>
            </v-col>
        </v-row>
    </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProjectSocialMedia from './ProjectSocialMedia'
import PanelDetails from './PanelDetails'

export default {
  components: {
    ProjectSocialMedia,
    PanelDetails
  },
  data: () => ({
  }),
  name: "PanelDetails",
  computed: {
  },
  methods: {
  }
};
</script>

<style lang="scss">
</style>