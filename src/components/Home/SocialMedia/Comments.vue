<template>
  <v-row no-gutters>
    <v-avatar :size="size" class="mr-3">
      <v-img :src="comment.imageUrl" aspect-ratio="1.7"></v-img>
    </v-avatar>
    <v-col>
      <v-card class="py-3 grey lighten-5" flat rounded >
        <v-card-subtitle class="py-0 comment-user-text mb-1">{{comment.name}}</v-card-subtitle>
        <v-card-text class="comment-text py-0" v-line-clamp="4">{{comment.message}}</v-card-text>
      </v-card>
      <div class="px-3 py-1">
        <v-row>
          <span class="cursor-hover underline comment-btn">Like</span>
          <div class="px-1">·</div>
          <span class="cursor-hover underline comment-btn">Reply</span>
          <div class="px-1">·</div>
          <span class="cursor-hover underline timestamp">1 week</span>
          <v-spacer></v-spacer>
          <span class="cursor-hover comment-btn">3 likes</span>
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
    like_state: false,
    toggle_exclusive: 2,
    like_icon: "mdi-thumb-up-outline",
  }),
  methods: {
  },
};
</script>