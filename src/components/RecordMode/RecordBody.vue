<template>
    <v-container class="vertical-scroll dont-show-scroll grey lighten-2 px-0" style="height:100vh">
        <!-- That ID is used to scrolling the component -->
        <component class="px-0" v-for="(item, index) of items" :key="index+'-widget'" :id="name+'-'+index" v-bind:is="item.component" :info="component" ></component>
        <infinite-loading @infinite="infiniteHandler" :identifier="NavCommp">
            <div slot="no-more"></div>
        </infinite-loading>
        <div v-for="(item, index) of emptyItems" :key="index+'-no-container'" class="no-container" :id="name+'-'+(currentIndex+index)">
        </div>
    </v-container>
</template>
<script>

export default {
    name: "PreviewBody",
    data: () => ({
        items:[],
        emptyItems: [],
        currentIndex: 0,
    }),
    props: {
        component: Object,
        sortArray: Array,
        NavCommp: Array,
        name: String,
    },methods: {
        // Functionality on the infinite scroll
        infiniteHandler($state) {
            if(this.currentIndex < this.NavCommp.length){
                this.items.push(this.sortArray[this.currentIndex]);
                this.emptyItems.shift();
                this.refactorWidgets();
                this.currentIndex ++;
                $state.loaded();
            }else{
                $state.complete();
            }
        },
        // On change in the widgets index
        refactorWidgets(){
            this.$emit('items', this.items.length);
        }
    },
    watch:{
        NavCommp:function(){
            this.emptyItems = [];
            this.NavCommp.forEach(item => this.emptyItems.push( item ));
            this.currentIndex = 0;
            this.items = [];
        },
        sortArray:function(){
            if(this.currentIndex < this.NavCommp.length){
                this.items.push(this.sortArray[this.currentIndex]);
                this.emptyItems.shift();
                this.refactorWidgets();
                this.currentIndex ++;
            }
        }
    }
}
</script>
<style>

</style>