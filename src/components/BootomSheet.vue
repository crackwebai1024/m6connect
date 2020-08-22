<template>
    <v-bottom-sheet v-model="data" persistent>
        <v-sheet class="text-center" height="200px">
        <v-btn
            class="mt-6"
            text
            color="error"
            @click="set_status_bootom_template(false)"
        >close</v-btn>
        <div class="py-3">This is a bottom sheet using the persistent prop</div>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "BootomTemplate",
    computed: {
        ...mapGetters(['get_bootom_template']),  
        data:{
            get(){
                return this.get_bootom_template
            },
            set(){
                this.set_status_bootom_template(false)
            }
        }
    },
    methods: {
        ...mapActions(["set_status_bootom_template"])
    }
}
</script>