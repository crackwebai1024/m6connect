<template>
    <v-container class="px-0 py-0 ">
        <div class="max-height-container dont-show-scroll">
            <v-tooltip bottom v-for="(action, index) of NavWidgets" :key="index">
                <template v-slot:activator="{ on, attrs }">
                    <v-avatar 
                        @click="scroll_to(index)"
                        color="indigo" size="36" class="cursorhover my-2 mx-1"
                        v-bind="attrs"
                        v-on="on">
                        <v-icon>{{action.icon}}</v-icon>
                    </v-avatar>
                </template>
                <span>{{action.name}}</span>
            </v-tooltip>
        </div>
        <preview-body :name="getName()" :NavCommp=component ></preview-body>
    </v-container>
</template>
<script>
import PreviewBody from "./PreviewBody";

export default {
    name: "NavigationBar",
    components: {
        PreviewBody
    },
    data: () => ({
        component:[]
    }),
    props: {
        NavWidgets: Array,
        name: String
    },
    methods: {
        async scroll_to(index){
            while (document.getElementById(this.getName()+'-'+index).className == 'no-container') {
                await this.awaitState(document.getElementById(this.getName()+'-'+index));
            }if(document.getElementById(this.getName()+'-'+index).className == 'container' ){
                this.awaitState(document.getElementById(this.getName()+'-'+index));
            }
        },
        getName(){
            let name = this.name.split(' ');
            return name.join('-')
        },
        awaitState(x) { 
            let speed = 280;
            return new Promise(resolve => {
                x.scrollIntoView({block: "start", behavior: "smooth"});
                setTimeout(() => {
                        resolve("¡Éxito!");
                }, speed);
            });
        }
    },
    watch:{
        NavWidgets:function(){
            this.component = [];
            this.NavWidgets.forEach(action => this.component.push(action.component))
        }
    }
}
</script>
<style>
    .max-height-container{
        overflow: auto;
        white-space: nowrap;
    }
</style>