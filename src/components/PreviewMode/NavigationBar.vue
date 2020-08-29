<template>
    <v-container class="px-0 py-0 ">
        <div class="max-height-container dont-show-scroll">
            <v-tooltip bottom v-for="(action, index) of header" :key="index">
                <template v-slot:activator="{ on, attrs }">
                    <v-avatar 
                        @click="moveComponent(index)"
                        color="indigo" size="36" class="cursorhover my-2 mx-1"
                        v-bind="attrs"
                        v-on="on">
                        <v-icon>{{action.icon}}</v-icon>
                    </v-avatar>
                </template>
                <span>{{action.name}}</span>
            </v-tooltip>
        </div>
        <preview-body :name="getName()" @items="setState" :NavCommp=component :sortArray=header ></preview-body>
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
        header:[],
        component: [],
        currentState: 0
    }),
    props: {
        NavWidgets: Array,
        name: String
    },
    methods: {
        // The global function to make scroll and order components
        async moveComponent(index){
            this.orderComponents(index);
            const cont = this.currentState;
            if(document.getElementById(this.getName()+'-'+index).className == 'container' ){
                this.scrolling(document.getElementById(this.getName()+'-'+index));
            }else{
                let elementClass = document.getElementById(this.getName()+'-'+cont).className;
                while (elementClass == document.getElementById(this.getName()+'-'+cont).className) {
                    await this.scrolling(document.getElementById(this.getName()+'-'+cont));
                }
                this.scrolling(document.getElementById(this.getName()+'-'+cont));
            }
        },
        // Order the components in order of call
        orderComponents(index){
            const cont = this.currentState;
            if(index > this.currentState){
                let state = this.header[index];
                this.header.splice(index, 1)
                this.header.splice(cont, 0, state);
            }
            
        },
        // Get the component name
        getName(){
            let name = this.name.split(' ');
            return name.join('-')
        },
        // Action of scroll
        scrolling(element) { 
            let speed = 300;
            return new Promise(resolve => {
                element.scrollIntoView({block: "start", behavior: "smooth"});
                setTimeout(() => {
                        resolve("¡Éxito!");
                }, speed);
            });
        },
        // Update the state at the list of widgets
        setState(index){
            this.currentState = index;
        }
    },
    watch:{
        // Clean the component
        NavWidgets:function(){
            this.component = [];
            this.header = [];
            this.NavWidgets.forEach(action => this.header.push(action));
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