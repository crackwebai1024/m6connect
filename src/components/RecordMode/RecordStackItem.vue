<template>
    <div class="d-flex blue darken-1 white--text pl-3 pr-2 py-2">
        <div v-if="indexState==0" class="cursor-hover font-weight-black" @click="preview_screen(recorIdle)" style="font-size: 17px;">{{ recorIdle.record_name }}</div>
        <div v-else class="cursor-hover font-weight-black" @click="unshift_data_to_active(recorIdle)" style="font-size: 17px;">{{ recorIdle.record_name }}</div>
        <v-spacer v-if="indexState==0" class="cursor-hover" @click="preview_screen(recorIdle)"></v-spacer>
        <v-spacer v-else class="cursor-hover" @click="unshift_data_to_active(recorIdle)"></v-spacer>
        <v-icon color="white" @click="full_screen(recorIdle)" class>mdi-arrow-top-right</v-icon>
        <v-icon color="white" @click="remove_from_idle(recorIdle)">mdi-close</v-icon>
    </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
    name: "RecordStackItem",
    props:{
        recorIdle: Object,
        indexState: Number,
    },
    methods: {
        ...mapActions("GeneralListModule",[
            "preview_screen", "unshift_data_to_active",
            "full_screen", "remove_from_idle"
        ])
    }
}
</script>