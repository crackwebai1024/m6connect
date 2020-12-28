<template>
  <app-builder-show />
</template>

<script>
import AppBuilderShow from '@/views/Home/AppBuilderShow.vue'
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'AppBuilderShowBlank',
  components: {
    AppBuilderShow
  },

  async mounted() {
    this.setShowSidePanels(false)
    this.setDisplayAppBuilderShow()

    try {
      const record = await this.getRecordById(this.$route.params.id)
      const app = await this.getApp(record.app_id)
    } catch (e) {}
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
