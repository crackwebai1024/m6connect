<template>
    <v-card
        class="mx-auto"
        max-width="344"
        outlined
    >
        <v-list-item three-line>
        <v-list-item-content>
            <div class="overline mb-4">{{info['department']}}</div>
            <v-list-item-title class="headline mb-1">{{info['project_name']}}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-avatar
            tile
            size="80"
            color="grey"
        ></v-list-item-avatar>
        </v-list-item>
    </v-card>    
</template>

<script>
export default {
    name:"CardProjectList",
    props:{
        // info has project_name, projecj_id, phase, company, department, project_leader, 
            // project_support, designer, role_two, client_status, internal_description, 
            // internal_objective, projet_image_url, client_original_request, client_requested_due_date, 
            // client_in_take_clarification_description, client_follow_up_date
        info: Object,
    }
}
</script>