<template>
  <div class="ma-0 px-2 pt-3 pb-0 height-100-vh">
    <!-- General use list component-->
    <template v-if="get_screen_status()">
      <record-container :data="get_record_full_screen()" />
    </template>
    hi5
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
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