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
          Project Team Settings
        </v-row>
        <v-spacer />

        <portal-target :name="`assignment-${tab}`" />
      </v-card-title>

      <v-tabs
        v-model="tab"
        centered
        color="#006699"
        dark
        fixed-tabs
      >
        <v-tab>Project Manager</v-tab>
        <v-tab>Budget Approver</v-tab>
        <v-tab>Roles</v-tab>
      </v-tabs>

      <v-card-text
        class="pa-0"
        :style="{'height': getViewPortHeight}"
      >
        <v-container
          class="pa-0"
          fluid
        >
          <div v-if="tab === 0">
            <project-manager :included="true" />
          </div>
          <div v-if="tab === 1">
            <budget-approver :included="true" />
          </div>
          <div v-if="tab === 2">
            <roles :included="true" />
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

<script >
import ProjectManager from '../../../settings_planned/components/settings/ProjectManager'
import BudgetApprover from '../../../settings_planned/components/settings/BudgetApprover'
import Roles from '../../../settings_planned/components/settings/Roles'
export default {
  components: {
    'project-manager': ProjectManager,
    'budget-approver': BudgetApprover,
    'roles': Roles
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
      viewPortHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.6
    }
  },
  computed: {
    getViewPortHeight() {
      return `${this.viewPortHeight}px`
    }
  }
}
</script>
