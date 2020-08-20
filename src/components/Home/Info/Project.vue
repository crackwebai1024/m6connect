<template>
    <p>{{get_info_data()['project_name']}}</p>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name:"project",
    computed: {
        ...mapGetters(['get_info_data'])
    },
}
</script>