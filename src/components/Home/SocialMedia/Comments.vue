<template>
  <v-row no-gutters>
    <v-avatar :size="size" class="mr-3 mb-4">
      <v-img :src="comment.user.data.image" aspect-ratio="1.7"></v-img>
    </v-avatar>
    <v-col>
      <div class="d-flex" v-if="!updateCommentShow">
        <v-card class="py-3 grey lighten-5 rounded-xl w-fit relative" flat >
          <v-card-subtitle class="py-0 comment-user-text mb-1">{{comment.user.data.name}}</v-card-subtitle>
          <v-card-text class="comment-text py-0" v-line-clamp="4">{{comment.data.text}}</v-card-text>
          <v-card elevation="1" class="likes-comment absolute right-0 rounded-xl px-2" flat >
            <v-icon size="13" class="blue--text">mdi-thumb-up-outline</v-icon>
            <span class="text-caption ml-1">3</span>
          </v-card>
        </v-card>
        <v-menu
          bottom
          left
        >
          <template v-slot:activator="{ on }">
            <v-btn
              style="height: 16px;width: 25px;border-radius: 8px;"
              class="d-flex justify-center align-center ma-1 mt-5"
              icon
              v-on="on"
            >
              <v-icon size="15">mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>

          <v-list class="d-flex grey lighten-3 py-0 top-0">
            <v-list-item class="px-2" @click="updateCommentShow = true">
              <v-list-item-title class="text-caption px-0">Edit</v-list-item-title>                
            </v-list-item>
            <v-list-item class="px-2" @click="deleteCommentDiaLog = true">
              <v-list-item-title class="text-caption px-0">Delete</v-list-item-title>                
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <template v-else>
        <v-text-field
          v-model="updatedComment"
          append-icon="mdi-emoticon-happy-outline"
          filled
          label="Edit Comment"
          rounded
          type="text"
          @keyup.enter="updateComment"
          @click:append="toogleDialogEmoji"
        ></v-text-field>
        <!-- Emoji Picker -->
        <div
          class="relative"
        >
          <v-emoji-picker
            v-show="showDialog"
            class="absolute card-custom-shadow emoji-component grey lighten-5 post right-0 z-10"
            label-search="Search"
            lang="en"
            @select="onSelectEmoji"
          />
        </div>
        <p @click="cancelUpdate" class="text-caption cursor-hover underline comment-btn pointer">Cancel</p>
      </template>
      <template v-if="!updateCommentShow">
        <div class="px-3 py-1">
          <v-row>
            <span @click="like_state = !like_state" :class="likeClass + 'cursor-hover underline comment-btn pointer'">Like</span>
            <div class="px-1">·</div>
            <span v-if="reply" @click="showReplyMessage = !showReplyMessage" class="cursor-hover underline comment-btn pointer">Reply</span>
            <div v-if="reply" class="px-1">·</div>
            <span class="cursor-hover underline timestamp">1 week</span>
            <v-spacer></v-spacer>
          </v-row>
        </div>
        <slot v-if="showReplyMessage"></slot>
      </template>
    </v-col>
    <v-dialog
      v-model="deleteCommentDiaLog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Are you sure?
        </v-card-title>
        <v-card-text>Do you want to remove '{{ comment.data.text }}'? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="deleteCommentDiaLog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deleteComment"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import VEmojiPicker from 'v-emoji-picker'

export default {
  name: "PostComments",
  components: {
    VEmojiPicker
  },
  props: {
    comment: Object,
    size: Number,
    reply: Boolean,
  },
  data: () => ({
    like_state: false,
    toggle_exclusive: 2,
    like_icon: "mdi-thumb-up-outline",
    showReplyMessage: false,
    updateCommentShow: false,
    deleteCommentDiaLog: false,
    updatedComment: '',
    showDialog: false,
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
  created() {
    this.updatedComment = this.comment.data.text
    console.log(this.comment)
    console.log('data from id')
    this.$store.dispatch('GSFeed/retrieveActivityReactions', this.comment.activity_id).then(response => {
      console.log(response)
      console.log('that was the comment response')
    })
    this.$store.dispatch('GSFeed/retrieveChildReactions', this.comment.activity_id).then(response => {
      console.log(response)
      console.log('that was the child response')
    })
    // likeActivity(activity) {
    //   if (this.data.own_reactions.like) {
    //     this.data.own_reactions.like.forEach(item => {
    //       this.$store.dispatch('GSFeed/removeReaction', item.id).then(async response => {
    //         await this.$store.dispatch('GSFeed/retrieveFeed')
    //         this.likeState = false
    //       })
    //     })
    //   } else {
    //     const payload = {
    //       id: activity.id,
    //       type: 'like',
    //       whoNotify: activity.actor.id
    //     }
    //     this.$store.dispatch('GSFeed/addReaction', payload).then(response => {
    //       this.likeState = true
    //       this.$store.dispatch('GSFeed/retrieveFeed')
    //     })
    //   }
    // },
  },
  methods: {
    updateComment() {
      console.log('updating')
    },
    cancelUpdate() {
      this.updatedComment = this.comment.data.text
      this.updateCommentShow = false
    },
    toogleDialogEmoji() {
      this.showDialog = !this.showDialog
    },
    onSelectEmoji(emoji) {
      this.updatedComment += emoji.data
      this.toogleDialogEmoji()
    },
    deleteComment() {
      console.log('delete comment')
      this.deleteCommentDiaLog = false
      // client.reactions.delete(reactionId);
      this.$store.dispatch('GSFeed/removeReaction', this.comment.id).then(async response => {
        console.log(response)
        await this.$store.dispatch('GSFeed/retrieveFeed')
      })
    }
  },
};
</script>
<style scoped>
.likes-comment {
  bottom: -13px;
}
</style>