<template>
<v-container>
    <v-card>
        <v-card-title class="pb-0">
            <v-row no-gutters>
                <v-col cols="2">
                    <v-avatar>
                        <img :src=data.imageUrl>
                    </v-avatar>
                </v-col>
                <v-col cols="9">
                    <h2 class="text-md-body-1 font-weight-bold">{{data.name}}</h2>
                    <p class="text-caption"> {{data.occupation}} </p>
                </v-col>
                <v-col cols="1">
                    <v-icon>mdi-filter-variant</v-icon>
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-text>
            <v-row no-gutters v-if="data.images.length !== 0" >
                <v-col :cols="widthCols()" v-for="(image, index) of data.images" :key="index">
                    <v-img contain :src=image.url class="rounded-lg mx-1 my-1" aspect-ratio="1.7"></v-img>
                </v-col>
            </v-row>
            <v-row>
                <p class="text-sm-body-2 mx-4 mt-1">{{data.contain}}</p>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-icon @click="likeIcon()">{{like_icon}}</v-icon>
            <p class="my-0">{{contLikes()}}</p>
            <v-spacer/>
            <p class="my-0">Comments <span class="gray">{{data.comments.length}}</span></p>
            <v-icon left>mdi-chevron-down</v-icon>
        </v-card-actions>
        <v-divider class="mx-4" />
        <post-comments :comment=comment v-for="(comment, index) of data.comments" :key="index" />
    </v-card>
</v-container>
</template>
<script>
import PostComments from "./Comments"
export default {
    name:"PostItem",
    components:{
        PostComments
    },
    props: {
        data: Object
    },
    data: () => ({
        like_state : false,
        like_icon: "mdi-thumb-up-outline"
    }),
    methods: {
        widthCols(){
            return this.data.images.length === 1 ? 12 : 6;
        },
        contLikes(){
            let reac = this.data.reactions
            return reac.likes + reac.enchants + reac.unlikes
        },
        likeIcon(){
            this.like_state = !this.like_state;
            this.like_icon = this.like_state ? "mdi-thumb-up" : "mdi-thumb-up-outline"
        },
        print(){
            console.log(this.widthCols());
        }
    }
}
</script>