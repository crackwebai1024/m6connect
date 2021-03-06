<template>
  <div>
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
              <v-icon size="13" class="blue--text">{{ likeIcon }}</v-icon>
              <span class="text-caption ml-1">{{ comment.children_counts.like || 0 }}</span>
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
              <v-list-item class="px-2" @click="showUpdateInputs">
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
          />
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
          <div class="px-3 py-3">
            <v-row>
              <span @click="likeReaction" :class="likeClass + 'cursor-hover underline comment-btn pointer'">Like</span>
              <div class="px-1">·</div>
              <span v-if="reply" @click="showReplyMessage = !showReplyMessage" class="cursor-hover underline comment-btn pointer">Reply</span>
              <div v-if="reply" class="px-1">·</div>
              <span class="cursor-hover underline timestamp">
              {{new Date(comment.created_at).toString().substr(16,5)}} - {{new Date(comment.created_at).toString().substr(0,10)}}</span>
              <v-spacer></v-spacer>
            </v-row>
          </div>
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
    <div v-if="reply && showReplyMessage" class="mb-3 mr-3 ml-16">
      <div v-if="comment.latest_children.comment">
        <component 
          v-bind:is="'PostComments'"
          v-for="(childComment, index2) of comment.latest_children.comment.slice().reverse()"
          :key="index2"
          :comment="childComment"
          :reply="false"
          :size="36"
        >
        </component>
      </div>

      <div class="d-flex">
        <v-badge
          bottom
          color="green accent-3"
          dot
          offset-x="10"
          offset-y="10"
        >
          <v-avatar size="37">
            <img
              :alt="userData.name"
              :src="userData.image"
            >
          </v-avatar>
        </v-badge>
        <v-text-field
          v-model="reply_data"
          class="ml-3"
          dense
          filled
          height="35"
          hide-details
          placeholder="Write a reply..."
          rounded
          @keyup.enter="pushChildComment"
        />
      </div>
    </div>
    <div v-else @click="showReplyMessage = !showReplyMessage" class="mr-3 ml-16 mb-1 text-caption cursor-hover underline comment-btn pointer">
      <template v-if="reply">
        {{ replyLinkMessage }}
      </template>
    </div>
  </div>
</template>
<script>
import VEmojiPicker from 'v-emoji-picker'
import PostComments from './Comments'
import { mapGetters } from 'vuex'

export default {
  name: "PostComments",
  components: {
    VEmojiPicker,
    PostComments
  },
  props: {
    feedActivity:   Boolean,
    reply:          Boolean,
    userData:       Object,
    comment:        Object,
    size:           Number
  },
  data: () => ({
    likeState: false,
    toggle_exclusive: 2,
    showReplyMessage: false,
    updateCommentShow: false,
    deleteCommentDiaLog: false,
    updatedComment: '',
    showDialog: false,
    childComments: [],
    reply_data: ''
  }),
  computed: {
    ...mapGetters('GSFeed', {
      client: 'getClient'
    }),
    likeClass() {
      return this.likeState ? 'blue--text ' : ''
    },
    likeQuantity() {
      let quantity = this.likeState ? this.comment.reactions.likes + 1 : this.comment.reactions.likes
      return quantity
    },
    likeIcon() {
      return this.likeState ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'
    },
    replyLinkMessage() {
      return this.comment.children_counts.comment != 0 && this.comment.children_counts.comment != undefined ? this.comment.children_counts.comment + ' replies' : ''
    }
  },
  async mounted() {
    this.updatedComment = this.comment.data.text
    await this.$store.dispatch('GSFeed/retrieveFeed')

    if(this.comment.latest_children.like !== undefined) {
      let filteredLikesByCurrentUser = this.comment.latest_children.like.filter((element) => {
        return this.client.userId == element.user_id
      })
      if(filteredLikesByCurrentUser.lenght !== 0) {
        this.likeState = true
      }
    }
  },
  methods: {
    async retrieveChildReactions() {
      let res = await this.$store.dispatch('GSFeed/retrieveChildReactions', this.comment.id);

      this.childComments = res.results;
      this.updateCommentShow = false;
    },
    async updateComment() {
      await this.$store.dispatch('GSFeed/updateReaction', {
        id: this.comment.id,
        text: this.updatedComment
      });
      await this.$store.dispatch('GSFeed/retrieveFeed')
      await this.$store.dispatch('GSFeed/setPreviewPost', this.comment.activity_id);

      this.updateCommentShow = false
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
    async deleteComment() {
      await this.$store.dispatch('GSFeed/removeReaction', this.comment.id);
      await this.$store.dispatch('GSFeed/retrieveFeed')
      await this.$store.dispatch('GSFeed/setPreviewPost', this.comment.activity_id);
      
      this.deleteCommentDiaLog = false;
    },
    async pushChildComment() {
      let replyData = this.reply_data
      this.reply_data = ''
      
      if(replyData.trim() == '') return true
      await this.$store.dispatch('GSFeed/addChildReactionComment', {comment: this.comment, text: replyData});
      if (this.feedActivity) {
        await this.$store.dispatch('GSFeed/setActionPost')
      }else {
        await this.$store.dispatch('GSFeed/retrieveFeed')
        await this.$store.dispatch('GSFeed/setPreviewPost', this.comment.activity_id);
      }
      
      this.showReplyMessage = true
    },
    likeReaction() {
      let addLike = false
      if(this.comment.latest_children.like !== undefined) {
        let filteredLikesByCurrentUser = this.comment.latest_children.like.filter((element) => {
          return this.client.userId == element.user_id
        })
        if(filteredLikesByCurrentUser.lenght !== 0) {
          filteredLikesByCurrentUser.forEach(async item => {
            await this.$store.dispatch('GSFeed/removeReaction', item.id);
            await this.$store.dispatch('GSFeed/retrieveFeed')
            await this.$store.dispatch('GSFeed/setPreviewPost', this.comment.activity_id);
            
            this.likeState = false
          });
        } else {
          addLike = true
        }
      } else {
        addLike = true
      }

      if(addLike) {
        this.$store.dispatch('GSFeed/addChildReaction', this.comment).then(async () => {
          await this.$store.dispatch('GSFeed/retrieveFeed')
          await this.$store.dispatch('GSFeed/setPreviewPost', this.comment.activity_id);
          this.likeState = true
        })
      }
    },
    showUpdateInputs() {
      this.updatedComment = this.comment.data.text
      this.updateCommentShow = true
    }
  },
};
</script>
<style scoped>
.likes-comment {
  bottom: -13px;
}
</style>