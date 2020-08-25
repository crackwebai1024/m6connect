<template>
    <v-container class="px-0 py-0">
        <post-item :data="item" v-for="(item, index) of get_posts_data()" :key="index" />
    </v-container>
</template>
<script>
import PostItem from "./PostItem";
import {mapActions, mapGetters} from "vuex";

export default {
    name: "PostsList",
    components: {
        PostItem
    },
    data: () => ({
        
    }),
    methods:{
        ...mapActions("SocialNetworkModule", ['set_posts_data']),
        ...mapActions(['set_user_data']),
    },
    computed:{
        ...mapGetters("SocialNetworkModule", ['get_posts_data'])
    },
    created(){
        this.set_user_data()
        this.set_posts_data()
    }
}
</script>