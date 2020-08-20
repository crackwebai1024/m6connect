<template>
    <v-card>
        <v-card-title class="text-center">
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