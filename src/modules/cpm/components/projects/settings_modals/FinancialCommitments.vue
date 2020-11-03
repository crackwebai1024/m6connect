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
        <v-layout align-center>
          Commitment Settings
        </v-layout>
        <v-spacer />

        <portal-target :name="`commitments-${tab}`" />
      </v-card-title>

      <v-tabs
        v-model="tab"
        centered
        color="#006699"
        dark
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
          class="pa-0"
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
