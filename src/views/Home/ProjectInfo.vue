<template>
    <v-container>
        <person v-if="!info['projecj_id']"/>
        <project v-else/>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import Person from '@/components/Home/Info/Person'
import Project from '@/components/Home/Info/Project'

export default {
    data: () => ({
        info:{}
    }),
    components:{
        Person, 
        Project
    },
    name:"ProjectInfo",
    computed: {
        ...mapGetters(['get_info_data'])
    },
    mounted(){
        this.info = this.get_info_data();
    },
    updated(){
        this.info = this.get_info_data();
    }
}
</script>