<template>
  <v-dialog
    v-model="show"
    max-width="800px"
    persistent
    scrollable
  >
    <v-card>
      <v-card-title
        class="headline"
        style="background: #006699; color:#fff"
      >
        <v-row align="center">
          Milestone Settings
        </v-row>
        <v-spacer />

        <portal-target name="milestones" />
      </v-card-title>

      <v-card-text
        class="pa-0"
        :style="{ height: getViewPortHeight }"
      >
        <v-container
          class="pa-0"
          fluid
        >
          <milestones-status :included="true" />
        </v-container>
      </v-card-text>

      <v-divider />
      <m6-loading :loading="showLoading" />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="gray"
          text
          @click="$emit('close')"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import MilestonesStatus from '../../../settings_planned/components/settings/MilestonesStatus'
export default {
  components: {
    'milestones-status': MilestonesStatus
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showLoading: false,
      viewPortHeight:
        Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        ) * 0.6
    }
  },
  computed: {
    getViewPortHeight() {
      return `${this.viewPortHeight}px`
    }
  }
}
</script>
