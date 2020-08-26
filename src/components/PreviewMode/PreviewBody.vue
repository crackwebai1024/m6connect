<template>
    <v-container class="vertical-scroll dont-show-scroll">
        <component v-bind:is="item" v-for="(item, index) of NavCommp" :key="index"></component>
    </v-container>
</template>
<script>

export default {
    name: "PreviewBody",
    props: {
        NavCommp: Array
    }
}
</script>
<style>

</style>