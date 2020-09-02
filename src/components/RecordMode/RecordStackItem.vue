<template>
    <div class="d-flex blue darken-1 white--text pl-3 pr-2 py-2">
        <div class="cursor-hover font-weight-black" @click="preview_screen(recorIdle)" style="font-size: 17px;">{{ recorIdle.record_name }}</div>
        <v-spacer class="cursor-hover" @click="preview_screen(recorIdle)"></v-spacer>
        <v-icon color="white" @click="full_screen(recorIdle)" class>mdi-arrow-top-right</v-icon>
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
        ...mapActions("GeneralListModule",["preview_screen", "full_screen", "remove_from_idle"])
    }
}
</script>