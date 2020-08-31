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
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import ProjectSocialMedia from "./ProjectSocialMedia";
import GeneralList from "@/views/Home/GeneralList";
import RecordContainer from "@/components/RecordMode/RecordContainer";

export default {
  components: {
    ProjectSocialMedia,
    RecordContainer,
    GeneralList,
  },
  name: "Home",
  computed:{
    ...mapGetters("GeneralListModule", ["get_screen_status", "get_record_full_screen"]),
    ...mapState(['layout'])
  }
};
</script>

<style lang="scss" scoped>
</style>