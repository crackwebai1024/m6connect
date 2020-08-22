<template>
    <v-bottom-sheet v-model="data">
        <v-sheet class="text-center" height="80vh">
            <tabs/>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Tabs from "@/views/Tabs";

export default {
    name: "BootomTemplate",
    components: {
        Tabs
    },
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