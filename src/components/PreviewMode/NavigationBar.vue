<template>
    <v-container class="px-0 py-0 ">
        <div class="max-height-container dont-show-scroll">
            <v-tooltip bottom v-for="(action, index) of actions" :key="index">
                <template v-slot:activator="{ on, attrs }">
                    <v-avatar 
                        color="indigo" size="36" class="cursorhover my-2 mx-1"
                        v-bind="attrs"
                        v-on="on">
                        <v-icon>{{action.icon}}</v-icon>
                    </v-avatar>
                </template>
                <span>{{action.name}}</span>
            </v-tooltip>
        </div>
        <preview-body :NavCommp=component ></preview-body>
    </v-container>
</template>
<script>
import RequestTab from "@/components/PreviewMode/PreviewCommponents/Tabs/RequestTab";
import TicketTab from "@/components/PreviewMode/PreviewCommponents/Tabs/TicketTab";
import PreviewBody from "./PreviewBody";


export default {
    name: "NavigationBar",
    components: {
        PreviewBody
    },
    data: () => ({
        actions: [
            {
                icon: 'mdi-format-bold', 
                name:'Request',
                component: RequestTab
            },{
                icon: 'mdi-format-italic',   
                name:'Tickets',
                component: TicketTab
            },{
                icon: 'mdi-format-underline',
                name:'Projects',
                component: RequestTab
            },{
                icon: 'mdi-format-italic',   
                name:'Matrix',
                component: RequestTab
            },{
                icon: 'mdi-format-underline',
                name:'Schedulez',
                component: RequestTab
            },{
                icon: 'mdi-format-bold', 
                name:'Schedulez',
                component: RequestTab
            },{
                icon: 'mdi-format-italic',   
                name:'Teams',
                component: RequestTab
            },{
                icon: 'mdi-format-underline',
                name:'By Company',
                component: RequestTab
            },{
                icon: 'mdi-format-italic',   
                name:'Meeting Notes',
                component: RequestTab
            },{
                icon: 'mdi-format-underline',
                name:'Request',
                component: RequestTab
            },{
                icon: 'mdi-format-color-fill',
                name:'Meeting Notes',
                component: RequestTab
            },
        ],
        component:[]
    }),
    created(){
        this.actions.forEach(action => this.component.push(action.component))
    }
}
</script>
<style>
    .max-height-container{
        overflow: auto;
        white-space: nowrap;
    }
</style>