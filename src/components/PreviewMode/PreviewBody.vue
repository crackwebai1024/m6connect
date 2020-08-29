<template>
    <v-container class="vertical-scroll dont-show-scroll" style="height:70vh">
        <!-- That ID is used to scrolling the component -->
        <component v-for="(item, index) of items" :key="index" :id="name+'-'+index" v-bind:is="item.component"></component>
        <infinite-loading @infinite="infiniteHandler" :identifier="NavCommp">
            <div slot="no-more"></div>
        </infinite-loading>
        <div v-for="(item, index) of sortArray" :key="index+'a'" class="no-container" :id="name+'-'+index">
        </div>
    </v-container>
</template>
<script>

export default {
    name: "PreviewBody",
    data: () => ({
        items:[],
        currentIndex: 0,
    }),
    props: {
        sortArray: Array,
        NavCommp: Array,
        name: String,
    },methods: {
        infiniteHandler($state) {
            this.currentState = $state;
            if(this.currentIndex < this.NavCommp.length){
                this.items.push(this.sortArray[this.currentIndex]);
                this.refactorWidgets();
                this.currentIndex++;
                $state.loaded();
            }else{
                $state.complete();
            }
        },
        refactorWidgets(){
            this.$emit('items', this.items.length);
        }
    },
    watch:{
        NavCommp:function(){
            this.items = [],
            this.currentIndex = 0
        },
    }
}
</script>
<style>

</style>