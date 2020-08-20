<template>
    <v-row>
        <v-card
            max-width="400"
            class="mx-auto p-0 my-10"
            outlined
            :key= "index"
            v-for="(item, index) of get_views_list()"
        >
            <v-container>
            <v-row dense>
                <v-col cols="12" class="text-center m-0">
                    <v-btn color="#2E2D2D" value="nearby">
                        <v-icon>{{item.iconName}}</v-icon>
                    </v-btn>
                </v-col>

                <v-col cols="12">
                    <p class="text-center m-0">{{item.name}}</p>
                </v-col>
            </v-row>
            </v-container>
        </v-card>
    </v-row>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: "ViewsList",
    computed: {
        // get_views_list has a list of objects with name, iconName, route
        ...mapGetters(['get_views_list'])
    },
}
</script>