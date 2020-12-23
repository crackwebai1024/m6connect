<template>
  <v-container class="d-flex dont-show-scroll h-full ma-0 max-w-content pb-0 pt-5 px-0 vertical-scroll w-content">
    <!-- General use list component-->
    <template v-if="screenStatus()">
      <record-container
        class="align-content-start main-content"
        :data="recordFullScreen()"
      />
    </template>
    <template v-else>
      <!-- Companies List Component -->
      <companies-list class="align-content-start main-content" />
    </template>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CompaniesList from '@/views/Home/CompaniesList'
import RecordContainer from '@/components/RecordMode/RecordContainer'

export default {
  // eslint-disable-next-line vue/match-component-file-name
  name: 'Companies',
  components: {
    CompaniesList,
    RecordContainer
  },
  data: () => ({
    tab: null,
    items: [
      'Profile',
      'People',
      'Details'
    ],
    currentTab: 0,
    showColumnLeft: true,
    showColumnRight: true
  }),
  computed: {
    ...mapGetters({
      screenStatus: 'GeneralListModule/get_screen_status',
      recordFullScreen: 'GeneralListModule/get_record_full_screen'
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
