<template>
    <p>{{get_info_data()['name']}}</p>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name:"person",
    computed: {
        ...mapGetters(['get_info_data'])
    },
}
</script>