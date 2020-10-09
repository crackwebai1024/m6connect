<template>
  <v-row no-gutters>
    <v-avatar :size="size" class="mr-3">
      <v-img :src="comment.user.data.image" aspect-ratio="1.7"></v-img>
    </v-avatar>
    <v-col>
      <v-card class="py-3 grey lighten-5 rounded-xl w-fit relative" flat >
        <v-card-subtitle class="py-0 comment-user-text mb-1">{{comment.user.data.name}}</v-card-subtitle>
        <v-card-text class="comment-text py-0" v-line-clamp="4">{{comment.data.text}}</v-card-text>
        <v-card elevation="1" class="likes-comment absolute right-0 rounded-xl px-2" flat >
          <v-icon size="13" class="blue--text">mdi-thumb-up-outline</v-icon>
          <span class="text-caption ml-1">3</span>
        </v-card>
      </v-card>
      <div class="px-3 py-1">
        <v-row>
          <span @click="like_state = !like_state" :class="likeClass + 'cursor-hover underline comment-btn pointer'">Like</span>
          <div class="px-1">·</div>
          <span v-if="reply" class="cursor-hover underline comment-btn pointer">Reply</span>
          <div v-if="reply" class="px-1">·</div>
          <span class="cursor-hover underline timestamp">1 week</span>
          <v-spacer></v-spacer>
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
    reply: Boolean
  },
  data: () => ({
    like_state: false,
    toggle_exclusive: 2,
    like_icon: "mdi-thumb-up-outline",
  }),
  computed: {
    likeClass() {
      return this.like_state ? 'blue--text ' : ''
    },
    likeQuantity() {
      let quantity = this.like_state ? this.comment.reactions.likes + 1 : this.comment.reactions.likes
      return quantity
    }
  },
  methods: {
  },
};
</script>
<style scoped>
.likes-comment {
  bottom: -13px;
}
</style>