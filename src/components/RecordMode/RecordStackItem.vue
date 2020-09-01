<template>
    <div class="d-flex blue darken-1 white--text pl-3 pr-2 py-2">
        <div class="font-weight-black" style="font-size: 17px;">{{ recorIdle.record_name }}</div>
        <v-spacer></v-spacer>
        <v-icon color="white" @click="preview_screen(recorIdle)" class>mdi-arrow-top-right</v-icon>
        <v-icon color="white" @click="remove_from_idle(recorIdle.uid)">mdi-close</v-icon>
    </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
    name: "RecordStackItem",
    props:{
        recorIdle: Object
    },
    methods: {
        ...mapActions("GeneralListModule",["preview_screen", "remove_from_idle"])
    }
}
</script>