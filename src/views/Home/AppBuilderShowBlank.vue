<template>
    <div>
    </div>
</template>

<script>
import AppBuilderShow from '@/views/Home/AppBuilderShow.vue'
import { mapMutations } from 'vuex'

export default {
    components: {
        AppBuilderShow
    },

    methods: {
        ...mapMutations('RecordsInstance', {
            setDisplayAppBuilderShow: 'setDisplayAppBuilderShow',
            setCurrentRecord: 'setCurrentRecord'
        }),
    },

    mounted() {
        this.setDisplayAppBuilderShow()
    }
}
</script>

<style lang="scss" scoped>

</style>