<template>
    <v-container class="px-0 py-0 max-w-none">
        <v-card id="create">
            <v-speed-dial
            v-model="fab"
            top
            left
            direction="bottom"
            open-on-hover
            transition="slide-x-transition"
            >
            <template v-slot:activator>
                <v-btn
                v-model="fab"
                color="blue darken-2"
                dark
                fab
                >
                <v-icon v-if="fab">mdi-close</v-icon>
                <v-icon v-else>mdi-animation</v-icon>
                </v-btn>
            </template>
            <v-tooltip v-for="(action, index) of header" :key="index" right>
                <template v-slot:activator="{ on, attrs }">
                    <v-avatar 
                        @click="moveComponent(index)"
                        color="grey lighten-2" size="36" class="cursorhover my-2 mx-1"
                        v-bind="attrs"
                        v-on="on">
                        <v-icon>{{action.icon}}</v-icon>
                    </v-avatar>
                </template>
                <span>{{action.name}}</span>
            </v-tooltip>
        </v-speed-dial>
        </v-card>
        <record-body :name="getName()" @items="setState" :NavCommp=component :sortArray=header :component=project ></record-body>
    </v-container>
</template>
<script>
import RecordBody from "./RecordBody";

export default {
    name: "NavigationBar",
    components: {
        RecordBody
    },
    data: () => ({
        header:[],
        component: [],
        currentState: 0,
        fab: false,
    }),
    props: {
        NavWidgets: Array,
        project: Object
    },
    methods: {
        // The global function to make scroll and order components
        async moveComponent(index){
            await this.orderComponents(index);
            const cont = this.currentState;
            if(document.getElementById(this.getName()+'-'+index).className == 'container' ){
                this.scrolling(document.getElementById(this.getName()+'-'+index));
            }else{
                this.scrolling(document.getElementById(this.getName()+'-'+cont));
            }
        },
        // Order the components in order of call
        orderComponents(index){
            const cont = this.currentState;
            if(index > this.currentState){
                let state = this.header[index];
                console.log(state);
                this.header.splice(index, 1)
                this.header.splice(cont, 0, state);
                return new Promise(resolve => setTimeout(() => {
                    resolve("¡Éxito!");
                }, 10));
            }
        },
        // Get the component name
        getName(){
            let name = this.project.record_name.split(' ');
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
  /* This is for documentation purposes and will not be needed in your application */
  .v-speed-dial {
    position: absolute;
  }

  .v-btn--floating {
    position: relative;
  }
</style>