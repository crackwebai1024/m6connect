<template>
<v-container class="px-0 py-0">
    <v-menu open-on-hover top offset-y>
        <template v-slot:activator="{ on, attrs }">
            <div
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            >
                <record-stack-item v-if="index == 1" @click="preview_screen(recorIdle)" :recorIdle="get_idle_previews()[0]" />
                <record-stack-item v-else @click="preview_screen(recorIdle)" :recorIdle="get_idle_previews()[get_idle_previews().length - 1]" />
            </div>
        </template>
        <div v-for="(record, i) of get_idle_previews()" :key="i">
            <record-stack-item v-if="record != get_idle_previews()[0] && index == 1"  :recorIdle="record" />
            <record-stack-item v-if="record != get_idle_previews()[get_idle_previews().length-1] && index == 0"  :recorIdle="record" />
        </div>
    </v-menu>
</v-container>
</template>
<script>
import RecordStackItem from './RecordStackItem';
import { mapGetters } from 'vuex';

export default {
    name: "IdleRecords",
    components: {
        RecordStackItem
    },
    data: () => ({
        cruds: [
            ['Create', 'mdi-add'],
            ['Read', 'insert_drive_file'],
            ['Update', 'update'],
            ['Delete', 'delete'],
        ],
    }),
    computed:{
        ...mapGetters("GeneralListModule", ["get_idle_previews"])
    },props:{
        index: Number,
    }
}
</script>