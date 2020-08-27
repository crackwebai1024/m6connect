<template>
    <v-container class="vertical-scroll" style="height:70vh">
        <!-- That ID is used to scrolling the component -->
        <component :id="getName()+'-'+index" v-bind:is="item" v-for="(item, index) of items" :key="index"></component>
        <infinite-loading @infinite="infiniteHandler">
            <div slot="no-more"></div>
        </infinite-loading>
        <div :id="getName()+'-'+index" v-for="(item, index) of NavCommp" :key="index+'a'"></div>
    </v-container>
</template>
<script>

export default {
    name: "PreviewBody",
    data: () => ({
        items:[],
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
            this.items = [];
            this.currentIndex = 0;
            console.log(this.NavCommp)
        }
    }
}
</script>
<style>

</style>