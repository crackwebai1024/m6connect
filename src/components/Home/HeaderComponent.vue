<template>
    <v-card :height="info.height" class="py-0">
        <v-card-title class="text-center py-0">
            <span><v-icon>{{info.icon}}</v-icon> </span>
            {{info.title}}
            <slot></slot>
        </v-card-title>
    </v-card>
</template>
<script>
export default {
    name: "HeaderComponent",
    props: {
        info: Object,
    },
}
</script>