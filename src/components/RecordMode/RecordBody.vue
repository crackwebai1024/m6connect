<template>
    <v-container class="vertical-scroll dont-show-scroll px-0 max-w-none h-full">
        <!-- That ID is used to scrolling the component -->
        <component 
            v-for="(item, index) of items" :key="index+'-widget'"
            class="max-w-none" :class="index !== 0 ? 'px-2' : 'px-0'" 
            v-bind:is="item.component" 
            :id="name+'-'+index" 
            :info="component" 
        />
        <infinite-loading
            infinite-scroll-disabled="busy"
            @infinite="infiniteHandler" :identifier="NavCommp">
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
        busy: false
    }),
    props: {
        component: Object,
        sortArray: Array,
        NavCommp: Array,
        name: String,
    },methods: {
        // Functionality on the infinite scroll
        infiniteHandler($state) {
            this.busy = true;
            setTimeout(() => {
                if(this.currentIndex < this.NavCommp.length){
                    this.items.push(this.sortArray[this.currentIndex]);
                    this.emptyItems.shift();
                    this.refactorWidgets();
                    this.currentIndex ++;
                    $state.loaded();
                }else{
                    $state.complete();
                }
                this.busy = false;
            }, 100);
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
