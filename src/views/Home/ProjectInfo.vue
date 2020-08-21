<template>
    <v-container>
        <drawer-navigator>
            <v-img :src="!get_info_data()[stayColumn].projecj_id ? get_info_data()[stayColumn].imageUrl :get_info_data()[stayColumn].projet_image_url">
                <div class="grey darken-4 px-3 py-1" v-if="get_info_data()[stayColumn].projecj_id"
                    style="position:absolute; top: 0; right: 0;" >
                    {{ get_info_data()[stayColumn].phase }}
                </div>
            </v-img>
            <v-card class="text-center m-auto">
                <v-card-title class="text-center m-auto">
                    <p class="text-center m-auto">
                        {{!get_info_data()[stayColumn].projecj_id ? get_info_data()[stayColumn].name :get_info_data()[stayColumn].project_name}}
                    </p>
                </v-card-title>
                <v-card-subtitle>
                    <p>
                        {{!get_info_data()[stayColumn].projecj_id ? get_info_data()[stayColumn].contactPhone :get_info_data()[stayColumn].projecj_id}}
                    </p>
                </v-card-subtitle>
            </v-card>
            <person v-if="!get_info_data()[stayColumn].projecj_id"/>
            <project v-else/>
        </drawer-navigator>
    </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import Person from "@/components/Home/Info/Person";
import Project from "@/components/Home/Info/Project";
import DrawerNavigator from "@/components/Home/DrawerNavigator";

export default {
    components:{
        Person, 
        Project,
        DrawerNavigator
    },
    name:"ProjectInfo",
    computed: {
        ...mapGetters(['get_info_data'])
    },
    props: {
        stayColumn: String
    },
    methods: {
        printData(){
            console.log(this.stayColumn);
        }
    }
}
</script>