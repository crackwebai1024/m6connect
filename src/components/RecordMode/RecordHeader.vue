<template>
    <v-container class="py-0 px-0">
        <!-- Full screen view -->
        <div v-if="get_screen_status() && headerDataRecord == null" class="d-flex blue darken-1 white--text pl-3 pr-2 py-2">
            <div class="font-weight-black" style="font-size: 17px;">{{ get_record_full_screen().record_name }}</div>
            <v-spacer></v-spacer>
            <v-icon color="white" @click="hidden_full_screen( get_record_full_screen())" size="18" class="px-2" >mdi-minus</v-icon>
            <v-icon color="white" @click="preview_screen_from_full_screen(get_record_full_screen())" class>mdi-arrow-bottom-left</v-icon>
            <v-icon color="white" @click="close_full_screen()">mdi-close</v-icon>
        </div>
        <!-- Preview View -->
        <div v-else class="d-flex blue darken-1 white--text pl-3 pr-2 py-2">
            <div class="font-weight-black" style="font-size: 17px;">{{ headerDataRecord.record_name }}</div>
            <v-spacer></v-spacer>
            <v-icon color="white" @click="hidden_preview(headerDataRecord)" size="18" class="px-2" >mdi-minus</v-icon>
            <v-icon color="white" @click="full_screen(headerDataRecord)" class>mdi-arrow-top-right</v-icon>
            <v-icon color="white" @click="remove_record_from_active(headerDataRecord)">mdi-close</v-icon>
        </div>
    </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name:"RecordHeader",
    props: {
        headerDataRecord: Object,
    },
    computed:{
        ...mapGetters("GeneralListModule", ["get_screen_status", "get_record_full_screen"])
    },
    methods: {
        ...mapActions("GeneralListModule", [
            "preview_screen_from_full_screen", "remove_record_from_active", "hidden_full_screen",
            "hidden_preview", "full_screen", "close_full_screen"
        ]),
    },
}
</script>