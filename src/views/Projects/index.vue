<template>
  <v-container fluid>
    <v-row class="ma-0 text-center">
      <v-col cols="12">
        <list-projects />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import ListProjects from './ListProjects'

export default {
  components: {
    ListProjects
  },
  methods: {
    ...mapMutations('PageControl', {
      setShowSidePanels: 'setShowSidePanels'
    })
  },
  computed: {
    ...mapState('UserSettingsControl', {
      secondColumnComponent: 'secondColumnComponent',
      thirdColumnComponent: 'thirdColumnComponent'
    })
  },
  mounted() {
    this.setShowSidePanels(false)
  },
  beforeDestroy() {
    this.setShowSidePanels(true)
  }
}
</script>
