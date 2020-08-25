<template>
    <v-row no-gutterss>
        <v-col cols="2">
            <v-avatar :size=size>
                <v-img :src=comment.imageUrl aspect-ratio="1.7"></v-img>
            </v-avatar>
        </v-col>
        <v-col cols="10">
            <v-card class="py-3" flat rounded style="background-color: rgb(240, 240, 240);">
                <v-card-subtitle class="py-0 comment-user-text">
                    {{comment.name}}
                </v-card-subtitle>
                <v-card-text class="comment-text py-0">
                    {{comment.message}}
                </v-card-text>
            </v-card>
            <div>
                <v-row>
                    <v-col cols="8" class="comment-btn">
                        <span 
                            class="cursor-hover underline comment-btn">Like
                        </span> - <span class="cursor-hover underline comment-btn">Reply</span> <span 
                            class="cursor-hover underline timestamp">1 week</span>
                    </v-col>
                    <v-col cols="4" class="text-right comment-btn">
                        <span class="cursor-hover comment-btn">800000000000</span>
                    </v-col>
                </v-row>
            </div>
            <slot></slot>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: "PostComments",
    props: {
        comment: Object,
        size: Number,
    },
    data: () => ({
        like_state : false,
        toggle_exclusive: 2,
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