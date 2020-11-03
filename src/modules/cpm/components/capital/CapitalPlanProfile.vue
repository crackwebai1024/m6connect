<template>
  <v-layout>
    <v-flex
      class="white"
      xs3
    >
      <sidebar />
    </v-flex>

    <portal to="destination" />

    <v-flex
      class="pa-2"
      style="height: calc(100vh - 125px); overflow-y: auto"
      xs9
    >
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <quarters ref="quarters" />
        </v-flex>

        <v-flex
          class="pt-2"
          xs12
        >
          <spendings-and-forecasted
            ref="spendingAndForecasted"
            @refresh-quarters="refreshQuarters"
          />
        </v-flex>

        <v-flex
          id="capital-plan-name-edit"
          class="pt-2"
          xs12
        >
          <capital-plan-name v-show="showProjects" />
        </v-flex>

        <v-flex
          v-if="showProjects"
          class="pt-2"
          xs12
        >
          <projects-section @refresh-projects="refreshProjects" />
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import Sidebar from './panels/Sidebar'
import ProjectsSection from './panels/ProjectsSection'
import CapitalPlanName from './panels/CapitalPlanName'
import SpendingsAndForecasted from './panels/SpendingsAndForecasted'
import Quarters from './panels/Quarters'
import DefaultCapital from './DefaultCapital'
import Eventbus from '../../../Eventbus'

export default {
  components: {
    sidebar: Sidebar,
    'projects-section': ProjectsSection,
    CapitalPlanName,
    'spendings-and-forecasted': SpendingsAndForecasted,
    Quarters
  },
  extends: DefaultCapital,
  data() {
    const capitalPlanId = this.$route.params.id
    return {
      capitalPlanId: capitalPlanId,
      showProjects: false
    }
  },
  mounted() {
    const payload = {
      id: this.capitalPlanId
    }
    this.setCapitalId(payload)
    this.bindCapitalPlanRef()

    Eventbus.$on('show-projects-capital-plan', payload => {
      this.showProjects = payload
      setTimeout(() => {
        const elmnt = document.getElementById('capital-plan-name-edit')
        elmnt.scrollIntoView()
      }, 500)
    })
  },
  methods: {
    refreshQuarters() {
      this.$refs.quarters.getCapitalPlan()
    },
    // firestore and vuex changing values from objects to refs
    refreshProjects() {
      this.$refs.spendingAndForecasted.getCapitalPlan()
      this.$refs.quarters.getCapitalPlan()
    }
  }
}
</script>
