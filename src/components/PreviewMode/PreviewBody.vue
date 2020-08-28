<template>
    <v-container class="vertical-scroll dont-show-scroll" style="height:70vh">
        <!-- That ID is used to scrolling the component -->
        <component :id="name+'-'+index" v-bind:is="item" v-for="(item, index) of items" :key="index"></component>
        <infinite-loading @infinite="infiniteHandler" :identifier="NavCommp">
            <div slot="no-more"></div>
        </infinite-loading>
        <div class="no-container" :id="name+'-'+index" v-for="(item, index) of NavCommp" :key="index+'a'">
        </div>
    </v-container>
</template>
<script>

export default {
    name: "PreviewBody",
    data: () => ({
        items:[],
        secondList:[],
        currentIndex:0
    }),
    props: {
        NavCommp: Array,
        name: String
    },methods: {
        infiniteHandler($state) {
            this.currentState = $state;
            if(this.currentIndex < this.NavCommp.length){
                this.items.push(this.NavCommp[this.currentIndex])
                this.currentIndex++;
                $state.loaded();
            }else{
                $state.complete();
                
            }
        },
    },
    watch:{
        NavCommp:function(){
            this.items = [],
            this.currentIndex = 0
            this.secondList = this.NavCommp;
        }
    }
}
</script>
<style>

</style>