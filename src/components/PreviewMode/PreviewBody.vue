<template>
    <v-container class="vertical-scroll dont-show-scroll" style="height:70vh">
        <!-- That ID is used to scrolling the component -->
        <component :id="getName()+'-'+index" v-bind:is="item" v-for="(item, index) of items" :key="index"></component>
        <infinite-loading @infinite="infiniteHandler" :identifier="NavCommp">
            <div slot="no-more"></div>
        </infinite-loading>
        <div class="no-container" style="height: 200px;" :id="getName()+'-'+index" v-for="(item, index) of NavCommp" :key="index+'a'">
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
        getName(){
            let name = this.name.split(' ');
            return name.join('-')
        },
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
            this.secondList = this.NavCommp;
        }
    }
}
</script>
<style>

</style>