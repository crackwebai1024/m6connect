<template>
  <v-container
    class="dont-show-scroll pt-0 vertical-scroll"
    fluid
  >
    <v-row class="ma-0 pt-0 text-center">
      <v-col
        class="pa-0"
        cols="12"
      >
        <list-projects />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import ListProjects from './ListProjects'
import {
  newFirebaseInit,
  doFirebaseAuth
} from '@/utils/Firebase'

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
  async created() {
    // Init Firebase
    await newFirebaseInit()
    await doFirebaseAuth()
  },
  mounted() {
    this.setShowSidePanels(false)
  },
  beforeDestroy() {
    this.setShowSidePanels(true)
  }
}
</script>
