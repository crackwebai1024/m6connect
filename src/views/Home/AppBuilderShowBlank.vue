<template>
    <div>
      <record-stepper v-if="app.layout_type == 'Stepper'" />
    </div>
</template>

<script>
import AppBuilderShow from '@/views/Home/AppBuilderShow.vue'
import { mapMutations, mapActions, mapState } from 'vuex'
import RecordStepper from '@/components/RecordStepper/index.vue'

export default {
  components: {
    AppBuilderShow,
    RecordStepper
  },

  methods: {
    ...mapMutations('RecordsInstance', {
      setDisplayAppBuilderShow: 'setDisplayAppBuilderShow',
      setCurrentRecord: 'setCurrentRecord'
    }),

    ...mapActions('AppBuilder', {
      getRecordById: 'getRecordById',
      getApp: 'getApp'
    }),

    ...mapActions('RecordsInstance', {
      getRecordById: 'getRecordById'
    })

  },

  async mounted() {
    try {
      const record = await this.getRecordById(this.$route.params.id)
      const app = await this.getApp(record.app_id)
      if(app.layout_type == 'Profile') this.setDisplayAppBuilderShow()

    } catch (e) {}
  },

  computed: {
    ...mapState('AppBuilder', {
      app: 'app'
    }),
  },

  beforeDestroy() {
    this.setDisplayAppBuilderShow()
  }
}
</script>

<style lang="scss" scoped>

</style>
