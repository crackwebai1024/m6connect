<template>
    <v-card class="rounded-lg">
        <v-card-title class="headline red lighten-1">
            <span class="white--text">
                Are you sure?
            </span>
        </v-card-title>

        <v-card-text class="headline py-2">
            <v-row align="center">
                <v-col class="justify-end" cols="2">
                    <v-icon class="red--text" size="50">mdi-delete-alert-outline</v-icon>
                </v-col>
                <v-col cols="10">
                    Do you want to remove the {{element}}?
                </v-col>
            </v-row>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                class="mt-2"
                color="primary"
                outlined
                @click="res(false)">
                Cancel
            </v-btn>
            <v-btn
                class="mt-2"
                color="error"
                outlined
                @click="res(true)">
                Remove
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    name: "DeleteDialog",
    props: { 
        element: String
    },
    methods: {
        res(a){
            this.$emit('closeDeleteModal', a);
        }
    }
}
</script>