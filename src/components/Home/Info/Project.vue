<template>
    <p>{{info['project_name']}}</p>
</template>
<script>
export default {
    name:"project",
    props:{
        // info has project_name, projecj_id, phase, company, department, project_leader, 
            // project_support, designer, role_two, client_status, internal_description, 
            // internal_objective, projet_image_url, client_original_request, client_requested_due_date, 
            // client_in_take_clarification_description, client_follow_up_date
        info : Object
    }
}
</script>