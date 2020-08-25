<template>
    <v-container>
        <v-card flat>
            <v-card-title>
                <v-row>
                    <v-col cols="2">
                        <v-avatar>
                            <img :src=comment.imageUrl>
                        </v-avatar>
                    </v-col>
                    <v-col cols="10">
                        <h2 class="text-md-body-1 font-weight-bold">{{comment.name}}</h2>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-subtitle>
                {{comment.message}}
            </v-card-subtitle>
            <v-card-actions>
                <v-icon @click="likeIcon()">{{like_icon}}</v-icon>
                <p class="my-0">{{contLikes()}}</p>
                <v-spacer/>
                <p class="my-0">{{comment.timestamps.created}}</p>
            </v-card-actions>
        </v-card>
    </v-container>
</template>
<script>
export default {
    name: "PostComments",
    props: {
        comment: Object
    },
    data: () => ({
        like_state : false,
        like_icon: "mdi-thumb-up-outline"
    }),
    methods: {
        contLikes(){
            let reac = this.comment.reactions
            return reac.likes + reac.enchants + reac.unlikes
        },
        likeIcon(){
            this.like_state = !this.like_state;
            this.like_icon = this.like_state ? "mdi-thumb-up" : "mdi-thumb-up-outline"
        }
    }
}
</script>