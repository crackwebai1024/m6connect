<template>
    <v-container>
        <card-project-list
            :info =project
            :key="index" 
            v-for="(project, index) of get_projects()"/>
    </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CardProjectList from '@/components/Home/CardProjectList'

export default {
    components:{
        CardProjectList
    },
    name:"ProjectsList",
    data: () => ({
        
    }),
    computed: {
        ...mapGetters(['get_projects'])
    },methods:{
        ...mapActions(['set_projects']),
    },created(){
        this.set_projects()
    }
}
</script>