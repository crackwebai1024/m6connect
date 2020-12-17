<template>
  <v-hover v-slot="{ hover }">
    <v-card
      class="mx-auto rounded transparent"
      :class="{ 'on-hover': !hover }"
      elevation="0"
      tile
      width="100%"
      height="100%"
      @click="updateInfo"
    >
      <component
        :is="compData"
        :info="recordData"
      />
    </v-card>
  </v-hover>
</template>

<script>
import { mapActions } from 'vuex'
import globalDataApp from '../../store/data'

export default {
  name: 'GeneralItem',
  props: {
    recordData: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    compData: {}
  }),
  created() {
    this.compData = globalDataApp.records_widgets[this.recordData.app_type][0].component
  },
  methods: {
    ...mapActions('InfoModule', [
      'set_info_data',
      'change_preview_navigation_drawer'
    ]),
    ...mapActions('GeneralListModule', ['push_data_to_active']),
    updateInfo() {
      this.push_data_to_active(this.recordData)
      this.change_preview_navigation_drawer(true)
    },
    redirect() {
      if (this.recordData['record_number']) {
        this.$router.push(`/record/${this.recordData['id']}`)
      } else {
        this.$router.push(`/dev/${this.recordData['id']}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$card-team-line-height: 1rem;

.custom-line-height {
  line-height: $card-team-line-height;
}
.v-card {
  transition: opacity 0.4s ease-in-out;
}
.v-card:not(.on-hover) {
  opacity: 0.5;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
  background: transparent;
}
</style>
