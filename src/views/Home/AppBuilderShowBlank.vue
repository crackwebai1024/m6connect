<template>
  <div>
    <record-stepper v-if="app.layout_type == 'Stepper'" />
    <app-builder-show v-else />
  </div>
</template>

<script>
import AppBuilderShow from '@/views/Home/AppBuilderShow.vue'
import { mapMutations, mapActions, mapState } from 'vuex'
import RecordStepper from '@/components/RecordStepper/index.vue'

export default {
  name: 'AppBuilderShowBlank',
  components: {
    AppBuilderShow,
    RecordStepper
  },

  async mounted() {
    this.setShowSidePanels(false)
    this.setDisplayAppBuilderShow()
  },

  computed: {
    ...mapState('AppBuilder', {
      app: 'app'
    })
  },

  beforeDestroy() {
    this.setDisplayAppBuilderShow()
    this.setShowSidePanels(true)
  },

  methods: {
    ...mapMutations('PageControl', {
      setShowSidePanels: 'setShowSidePanels'
    }),
    ...mapMutations('RecordsInstance', {
      setDisplayAppBuilderShow: 'setDisplayAppBuilderShow',
      setCurrentRecord: 'setCurrentRecord'
    }),
    ...mapActions('AppBuilder', {
      getApp: 'getApp'
    }),
    ...mapActions('RecordsInstance', {
      getRecordById: 'getRecordById'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
