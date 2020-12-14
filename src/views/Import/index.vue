<template>
  <v-container
    class="dont-show-scroll pt-0 vertical-scroll"
    fluid
  >
    <v-row class="d-flex justify-center ma-0 pt-0">
      <v-col
        class="pa-0"
        cols="10"
      >
        <import-tool />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import ImportTool from '@/components/ImportTool/Home'
export default {
  components: {
    ImportTool
  },
  methods: {
    ...mapMutations('PageControl', {
      setShowSidePanels: 'setShowSidePanels'
    })
  },
  mounted() {
    this.setShowSidePanels(false)
  }
}
</script>
