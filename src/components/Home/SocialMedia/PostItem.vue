<template>
<v-container class="px-0 py-0">
    <v-card class="mb-4">
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
            <div>
                <v-btn 
                    @click="showAll()" 
                    outlined color="primary"
                    v-if="all_images && data.images.length>4" 
                    class="float-button">
                        Show less
                </v-btn>
                <v-row no-gutters v-if="data.images.length !== 0" >
                    <v-col :cols="widthCols()" v-for="(image, index) of picture_items" :key="index">
                        <v-img contain :src=image.url class="rounded-lg mx-1 my-1" aspect-ratio="1.7">
                        </v-img>
                    </v-col>
                </v-row>
            </div>
                <v-btn @click="showAll()" block outlined color="primary" v-if="!all_images && data.images.length>4">Show All</v-btn>
            <v-row>
                <p class="text-sm-body-2 mx-4 mt-1 text-style">{{data.contain}}</p>
            </v-row>
        </v-card-text>
        <v-divider class="mx-4" />
        <v-card-actions class="px-4">
            <v-icon @click="likeIcon()">{{like_icon}}</v-icon>
            <p class="my-0 cursorhover" @click="likeIcon()">{{contLikes()}}</p>
            <v-spacer/>
            <p class="my-0 cursorhover" @click="showCommentsPost()" >Comments <span>{{data.comments.length}}</span></p>
            <v-icon left class="rotate" :class="rotate" @click="showCommentsPost()">mdi-chevron-down</v-icon>
        </v-card-actions>
        <v-divider class="mx-4" />
        <div v-if="showComments">
            <post-comments :comment=comment v-for="(comment, index) of data.comments" :key="index" />
        </div>
        <v-col cols="12">
          <v-text-field
            height="37"
            label="Write a comment"
            rounded
            @keyup.enter="pushComment()"
            dense
            v-model="comment_data"
            single-line
            hide-details
            solo-inverted
        ></v-text-field>
        </v-col>
    </v-card>
</v-container>
</template>
<script>
import PostComments from "./Comments"
import {mapGetters} from "vuex"

export default {
    name:"PostItem",
    components:{
        PostComments
    },
    props: {
        data: Object
    },
    data: () => ({
        like_icon: "mdi-thumb-up-outline",
        showComments: false,
        picture_items: [],
        like_state: false,
        all_images: false,
        comment_data: '',
        rotate:'',
    }),
    methods: {
        widthCols(){
            return this.data.images.length === 1 ? 12 : 6;
        },
        contLikes(){
            let reac = this.data.reactions
            return reac.likes + reac.enchants + reac.unlikes
        },
        showAll(){
            this.picture_items = this.all_images ? this.data.images.slice(0, 4) : this.data.images;
            this.all_images = !this.all_images;
        },
        showCommentsPost(){
            this.rotate = this.showComments ? '' : 'full-rotate';
            this.showComments = !this.showComments
        },
        likeIcon(){
            this.like_state = !this.like_state;
            this.like_icon = this.like_state ? "mdi-thumb-up" : "mdi-thumb-up-outline"
        },
        pushComment(){
            this.data.comments.push({
                name: this.get_user_data().name,
                imageUrl: this.get_user_data().imageUrl,
                message: this.comment_data,
                reactions: {
                    likes: 0,
                    enchants: 0,
                    unlikes: 0
                },
                timestamps:{
                    created: '1 min'
                }
            })
            this.comment_data = ''
        }
    },
    created(){
        this.picture_items = this.data.images.slice(0, 4);
    },
    computed:{
        ...mapGetters(["get_user_data"])
    }
}
</script>

<style scoped>

  .repeating-gradient {
    background-color: rgba(38, 38, 38, 0.7);
  }
</style>