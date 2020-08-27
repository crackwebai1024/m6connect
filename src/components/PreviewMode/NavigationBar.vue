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
        <preview-body :name="name" :NavCommp=component ></preview-body>
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
            for (let i = 0; i <= index; i++) {
                let direction= document.getElementById(this.getName()+'-'+index);
                direction.scrollIntoView({block: "start", behavior: "smooth"});
                await this.resolveAfter2Seconds(1);
            }
        },
        getName(){
            let name = this.name.split(' ');
            return name.join('-')
        },
        resolveAfter2Seconds(x) { 
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(x);
                }, 300);
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