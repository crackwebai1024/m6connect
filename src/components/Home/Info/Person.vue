<template>
    <p>{{info['name']}}</p>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name:"person",
    data: () => ({
        info:{}
    }),
    computed: {
        ...mapGetters(['get_info_data'])
    },
    mounted(){
        this.info = this.get_info_data();
    },updated(){
        this.info = this.get_info_data();
    }
}
</script>