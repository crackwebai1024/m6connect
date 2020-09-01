<template>
<v-container class="px-0 py-0">
    <v-hover
        v-slot:default="{ hover }"
        open-delay="100">
        <v-card
          :elevation="hover ? 16 : 2"
          class="mx-auto">
            <div v-if="hover">
                <record-stack-item v-for="(record, index) of get_idle_previews()" :key="index" :recorIdle="record" />
            </div>
            <v-card-text class="font-weight-medium mt-12 text-center subtitle-1">
                Open Delay (Mouse enter)
            </v-card-text>
        </v-card>
    </v-hover>
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
    }
}
</script>