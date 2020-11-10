<template>
  <v-dialog
    v-model="show"
    max-width="900px"
    persistent
    scrollable
  >
    <v-card>
      <v-card-title
        class="headline"
        style="background: #006699; color:#fff;"
      >
        Schedule Settings

        <v-spacer />

        <portal-target name="schedule" />
      </v-card-title>


      <v-card-text
        class="hidden-overflow pa-0"
        :style="{'height': getViewPortHeight}"
      >
        <v-container
          class="pa-0"
          fluid
        >
          <default-schedule :included="true" />
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

<script >
import DefaultSchedule from '../../../settings_planned/components/settings/DefaultSchedule'
export default {
  components: {
    'default-schedule': DefaultSchedule
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
      viewPortHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.7
    }
  },
  computed: {
    getViewPortHeight() {
      return `${this.viewPortHeight}px`
    }
  }
}
</script>

<style lang="scss" >
  .hidden-overflow {
    overflow-x:hidden;
  }
</style>
