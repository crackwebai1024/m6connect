<template>
    <div>
    </div>
</template>

<script>
import AppBuilderShow from '@/views/Home/AppBuilderShow.vue'
import { mapMutations, mapActions } from 'vuex'

export default {
    components: {
        AppBuilderShow
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
        }),

    },

    async mounted() {
        this.setDisplayAppBuilderShow()
        
        try {
            const record = await this.getRecordById(this.$route.params.id)
            const app = await this.getApp(record.app_id)
        } catch(e) {

        }
    },

    beforeDestroy(){
        this.setDisplayAppBuilderShow()
    }
}
</script>

<style lang="scss" scoped>

</style>