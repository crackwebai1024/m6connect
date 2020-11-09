<template>
  <v-dialog
    v-model="show"
    max-width="800px"
    persistent
  >
    <v-card>
      <v-card-title
        class="headline white grey--text text--darken-1"
      >
        <div class="text-center w-full py-2">
          Commitment Settings
        </div>
        <v-spacer />

        <portal-target :name="`commitments-${tab}`" />
      </v-card-title>
      <v-divider class="grey lighten-3" />

      <v-tabs
        class="mx-0 capitalize"
        v-model="tab"
        centered
        color="primary"
        fixed-tabs
      >
        <v-tab>Commitment Status</v-tab>
        <v-tab>Commitment Types</v-tab>
      </v-tabs>

      <v-card-text
        class="pa-0"
        :style="{ height: getViewPortHeight }"
      >
        <v-container
          class="pa-6"
          fluid
        >
          <div v-if="tab == 0">
            <commitments-status :included="true" />
          </div>
          <div v-if="tab == 1">
            <commitments-types :included="true" />
          </div>
        </v-container>
      </v-card-text>

      <v-divider />
      <m6-loading :loading="showLoading" />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="gray"
          flat
          @click="$emit('close')"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CommitmentsStatus from '../../settings/components/settings/CommitmentsStatus'
import CommitmentsTypes from '../../settings/components/settings/CommitmentsTypes'

export default {
  components: {
    'commitments-status': CommitmentsStatus,
    'commitments-types': CommitmentsTypes
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tab: 0,
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
