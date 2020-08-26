<template>
    <v-container class="vertical-scroll dont-show-scroll" style="height:70vh">
        <!-- That ID is used to scrolling the component -->
        <component :id="getName()+'-'+index" v-bind:is="item" v-for="(item, index) of NavCommp" :key="index"></component>
    </v-container>
</template>
<script>

export default {
    name: "PreviewBody",
    props: {
        NavCommp: Array,
        name: String
    },methods: {
        getName(){
            let name = this.name.split(' ');
            return name.join('-')
        }
    }
}
</script>
<style>

</style>