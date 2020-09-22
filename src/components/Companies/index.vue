<template>
  <v-container class="w-main-content w-tight px-0 ma-0 pt-5 pb-0 d-flex vertical-scroll dont-show-scroll h-full">
    <!-- General use list component-->
    <template v-if="get_screen_status()">
      <record-container :data="get_record_full_screen()" />
    </template>
    <template v-else>
      <!-- Companies List Component -->
      <companies-list />
    </template>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import CompaniesList from "@/views/Home/CompaniesList"
import RecordContainer from "@/components/RecordMode/RecordContainer";

export default {
  components: {
    CompaniesList,
    RecordContainer,
  },
  data: () => ({
    tab: null,
    items: [
      'Profile', 'People', 'Details',
    ],
    currentTab: 0,
    showColumnLeft: true,
    showColumnRight: true
  }),
  name: "Apps",
  computed: {
    ...mapGetters({
      get_screen_status: "GeneralListModule/get_screen_status",
      get_record_full_screen: "GeneralListModule/get_record_full_screen",
      get_image_preview_overlay: "get_image_preview_overlay"
    }),
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>

</style>