<template>
    <v-bottom-sheet v-model="sheet" persistent>
        <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="green"
            dark
            v-bind="attrs"
            v-on="on"
        >
            Open Persistent
        </v-btn>
        </template>
        <v-sheet class="text-center" height="200px">
        <v-btn
            class="mt-6"
            text
            color="error"
            @click="sheet = !sheet"
        >close</v-btn>
        <div class="py-3">This is a bottom sheet using the persistent prop</div>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "BootomTemplate",
    data: () => ({
      sheet: false,
    }),
    computed: {
        ...mapGetters([''])
    }
}
</script>