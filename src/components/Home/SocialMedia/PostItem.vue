<template>
  <v-container class="px-0 py-0 relative">
    <div class="card-custom-shadow mb-3 rounded white">
      <div
        v-if="data['postTagTitle']"
        :class="tagColor + ' card-content__tag absolute white--text d-flex justify-center align-center text-body-1 font-weight-regular'"
      >
        {{ data['postTagTitle'] }}
      </div>
      <v-card-title class="pb-0 pt-6 px-5">
        <v-row
          align="center"
          no-gutters
        >
          <div class="align-center d-flex">
            <v-avatar
              class="mr-2"
              color="blue"
              dark
              size="36"
            >
              <v-img
                v-if="user.pic"
                :src="user.pic"
              />
              <template v-else>
                <span class="text-uppercase white--text">{{ data.actor.data.name.charAt(0) }}</span>
              </template>
            </v-avatar>

            <!--            <v-avatar-->
            <!--              class="mr-2"-->
            <!--              size="40"-->
            <!--            >-->
            <!--              <img :src="data.actor.data.image">-->
            <!--            </v-avatar>-->
            <div class="d-flex flex-column">
              <div
                class="cursor-hover font-weight-bold line-height-1 size-15 underline"
                style="margin-bottom: 2px;"
              >
                {{ data.actor.data.name }}
              </div>
              <div class="d-flex grey--text line-height-1 text-caption">
                <!--                <div class="grey&#45;&#45;text text&#45;&#45;darken-1">-->
                <!--                  {{ data.occupation || '' }}-->
                <!--                </div>-->
                <!--                <div class="grey&#45;&#45;text mx-1 text&#45;&#45;darken-1">-->
                <!--                  ·-->
                <!--                </div>-->
                <div class="grey--text text--darken-1">
                  {{ new Date(data.time).toLocaleString('en-US') }}
                </div>
              </div>
            </div>
          </div>
          <v-spacer />
          <v-menu
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list class="grey lighten-4">
              <v-list-item @click="updatePostShow = true">
                <v-list-item-title>Edit Post</v-list-item-title>                
              </v-list-item>
              <v-list-item @click="deleteDiaLog = true">
                <v-list-item-title>Delete Post</v-list-item-title>                
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
      </v-card-title>

      <div>
        <div class="px-5 pt-4">
          <template v-if="!updatePostShow">
            {{ data.message }}
          </template>
          <div 
            v-else
            class="d-flex"
          >
            <v-textarea
              class="mb-0"
              outlined
              name="input-7-4"
              label="Edit Post Message"
              @keyup.esc="cancelMessage"
              @keyup.enter="editMessage('inputMessage-' + index)"
              v-model="updateMessage"
            ></v-textarea>
            <div class="d-flex flex-column">
              <v-btn
                class="ml-2"
                icon
                color="grey"
                @click="toogleDialogEmoji"
              >
                <v-icon size="22">
                  mdi-emoticon-happy-outline
                </v-icon>
              </v-btn>
              <v-btn @click="cancelUpdate" class="ml-2" icon color="red">
                <v-icon size="22">mdi-close</v-icon>
              </v-btn>
              <v-btn @click="updatePost(data)" :disabled="data.message == updateMessage" class="ml-2" icon color="green accent-3">
                <v-icon size="22">mdi-checkbox-marked-circle-outline</v-icon>
              </v-btn>
            </div>
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
          </div>
        </div>
      </div>
      <!--IMAGES-->
      <!--      <div>-->
      <!--        <div class="px-5 py-4">-->
      <!--          <v-btn-->
      <!--            v-if="all_images && data.images.length>4"-->
      <!--            class="float-button"-->
      <!--            color="primary"-->
      <!--            outlined-->
      <!--            @click="showAll"-->
      <!--          >-->
      <!--            Show less-->
      <!--          </v-btn>-->
      <!--          <v-row-->
      <!--            v-if="data.images.length !== 0"-->
      <!--            no-gutters-->
      <!--          >-->
      <!--            <v-col-->
      <!--              v-for="(image, index) of picture_items"-->
      <!--              :key="index"-->
      <!--              :cols="widthCols()"-->
      <!--            >-->
      <!--              <v-img-->
      <!--                aspect-ratio="1.7"-->
      <!--                class="mx-1 my-1 pointer"-->
      <!--                :src="image.url"-->
      <!--                @click="previewImage(image)"-->
      <!--              />-->
      <!--            </v-col>-->
      <!--          </v-row>-->
      <!--          <v-btn-->
      <!--            v-if="!all_images && data.images.length>4"-->
      <!--            block-->
      <!--            class="mt-2"-->
      <!--            color="primary"-->
      <!--            outlined-->
      <!--            @click="showAll"-->
      <!--          >-->
      <!--            Show All-->
      <!--          </v-btn>-->
      <!--          <div-->
      <!--            v-line-clamp="5"-->
      <!--            class="black&#45;&#45;text size-14 text-style"-->
      <!--            :class="data.images.length !== 0 ? 'mt-3' : ''"-->
      <!--          >-->
      <!--            {{ data.contain }}-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--END IMAGES-->


      <!--      <div-->
      <!--        v-if="data['postType'] === 'request'"-->
      <!--        class="border-1 ma-4 mt-0"-->
      <!--      >-->
      <!--        <div :class="'text-h6 py-2 px-3 font-weight-regular ' + this.tagColor + '&#45;&#45;text'">-->
      <!--          {{ data['request'].title }}-->
      <!--        </div>-->
      <!--        <v-divider />-->
      <!--        &lt;!&ndash; post component reference&ndash;&gt;-->
      <!--        <template v-if="data['componentName']">-->
      <!--          <component-->
      <!--            :is="data['componentName']"-->
      <!--            class="pa-0 profile-component"-->
      <!--          />-->
      <!--        </template>-->
      <!--        <div class="align-center d-flex justify-space-between pa-3 pt-0">-->
      <!--          <div>-->
      <!--            <div class="align-center d-flex pb-2 pt-6">-->
      <!--              <div-->
      <!--                v-for="(userRequest, index) in data['request'].users"-->
      <!--                :key="index+'userrequest'"-->
      <!--                class="d-flex"-->
      <!--              >-->
      <!--                <v-badge-->
      <!--                  :bordered="userRequest.approval ? false : true"-->
      <!--                  :color="userRequest.approval ? 'green accent-3' : 'white black&#45;&#45;text'"-->
      <!--                  :dark="userRequest.approval ? false : true"-->
      <!--                  :icon="userRequest.approval ? 'mdi-check' : 'mdi-help'"-->
      <!--                  offset-x="12"-->
      <!--                  offset-y="12"-->
      <!--                  top-->
      <!--                >-->
      <!--                  <v-avatar size="35">-->
      <!--                    <v-img :src="userRequest.imgSrc" />-->
      <!--                  </v-avatar>-->
      <!--                </v-badge>-->
      <!--                <template v-if="index !== data['request'].users.length - 1">-->
      <!--                  <span-->
      <!--                    :class="lineColor(userRequest.approval) + 'my-auto'"-->
      <!--                    style="height: 5px; width: 25px;"-->
      <!--                  />-->
      <!--                </template>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div-->
      <!--              v-if="pendingApprovals(data['request'].users) > 0"-->
      <!--              class="black&#45;&#45;text text-caption"-->
      <!--            >-->
      <!--              {{ pendingApprovals(data['request'].users ) }} Pending Approvals-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="d-flex justify-end">-->
      <!--            <v-btn-->
      <!--              class="capitalize mr-2 my-2 px-6"-->
      <!--              color="grey darken-3"-->
      <!--              text-->
      <!--            >-->
      <!--              Deny-->
      <!--            </v-btn>-->
      <!--            <v-btn-->
      <!--              class="capitalize my-2 px-8"-->
      <!--              color="green accent-4"-->
      <!--              outlined-->
      <!--            >-->
      <!--              Approve-->
      <!--            </v-btn>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->

      <v-card-actions class="px-5">
        <v-row
          align="center"
          class="px-2"
          no-gutters
        >
          <v-icon
            class="blue--text mr-1"
            size="20"
            @click="likeActivity(data)"
          >
            {{ likeIcon }}
          </v-icon>
          <div
            class="cursor-hover grey--text my-0 text--darken-1"
            @click="likeActivity(data)"
          >
            {{ contLikes() }}
            <v-progress-circular
              v-show="progressLike"
              size="10"
              width="1"
              indeterminate
            ></v-progress-circular>
          </div>
          <v-spacer />
          <div
            class="cursor-hover grey--text my-0 size-15 text--darken-1 underline"
            @click="showCommentsPost"
          >
            Comments
            <span>{{ data.reaction_counts.comment || 0 }}</span>
          </div>
        </v-row>
      </v-card-actions>
      <v-divider class="mx-4" />
      <v-card-actions class="px-5 py-0">
        <v-row
          align="center"
          class="px-2"
          no-gutters
        >
          <v-col cols="4">
            <v-btn
              class="capitalize grey--text h-full my-1 py-5 text--darken-1 text-body-1 w-full"
              :class="{ 'grey lighten-4 white--text': likeState }"
              small
              text
              @click="likeActivity(data)"
            >
              <v-icon
                class="mr-2"
                size="18"
              >
                mdi-thumb-up-outline
              </v-icon> Like
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn
              class="capitalize grey--text h-full my-1 py-5 text--darken-1 text-body-1 w-full"
              small
              text
              @click="showCommentsPost"
            >
              <v-icon
                class="mr-2"
                size="18"
              >
                mdi-message-outline
              </v-icon> Comment
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn
              class="capitalize grey--text h-full my-1 py-5 text--darken-1 text-body-1 w-full"
              small
              text
            >
              <v-icon
                class="mr-2"
                size="18"
              >
                mdi-share
              </v-icon> Share
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
      <v-divider class="mx-4" />

      <v-col
        v-if="showComments"
        class="d-flex px-5"
        cols="12"
      >
        <v-badge
          bottom
          class="mr-3"
          color="green accent-3"
          dot
          offset-x="10"
          offset-y="10"
        >
          <v-avatar size="48">
            <img
              :alt="client.currentUser.data.name"
              :src="client.currentUser.data.image"
            >
          </v-avatar>
        </v-badge>
        <v-text-field
          ref="currentUserComment"
          v-model="comment_data"
          class="black--text"
          dense
          filled
          height="37"
          hide-details
          placeholder="Write a comment..."
          rounded
          @keyup.enter="pushComment(data)"
        />
      </v-col>
      <v-skeleton-loader
        v-if="showComments && showSkeleton"
        class="post-item px-1 my-1"
        type="list-item-avatar-two-line"
      ></v-skeleton-loader>
      <div
        v-if="showComments"
        class="pb-3 px-5"
      >
        <post-comments
          v-for="(comment, index) of data.latest_reactions.comment"
          :key="index"
          :comment="comment"
          :reply="true"
          :size="48"
          :userData="client.currentUser.data"
        />
      </div>
    </div>
    <v-dialog
      v-model="deleteDiaLog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Are you sure?
        </v-card-title>
        <v-card-text>Do you want to remove '{{ data.message }}'? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="deleteDiaLog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deletePost(data)"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import PostComments from './Comments'
import { mapGetters, mapActions } from 'vuex'
import VEmojiPicker from 'v-emoji-picker'

export default {
  name: 'PostItem',
  components: {
    PostComments,
    VEmojiPicker
  },
  props: {
    data: {
      type: [String, Object],
      default: () => {}
    }
  },
  data: () => ({
    showBtnsPost: false,
    showComments: false,
    picture_items: [],
    likeState: false,
    all_images: false,
    comment_data: '',
    rotate: '',
    user: {},
    deleteDiaLog: false,
    updatePostShow: false,
    updateMessage: '',
    // Emoji Dialog
    showDialog: false,
    showSkeleton: false,
    progressLike: false
  }),
  computed: {
    ...mapGetters(['get_user_data']),
    ...mapGetters('GSFeed', {
      timeline: 'getTimeline',
      feed: 'getFeed',
      client: 'getClient'
    }),
    tagColor() {
      return this.data['postType'] === 'request' ? 'red' : 'teal accent-3'
    },
    likeIcon() {
      return this.likeState ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'
    }
  },
  created() {
    // this.picture_items = this.data.images.slice(0, 4)
    if (this.data.own_reactions.like !== undefined) {
      this.likeState = true
    }
    if(typeof this.data.actor === 'string'){
      this.data.actor = JSON.parse(this.data.actor);
    }
    this.updateMessage = this.data.message
    console.log(this.data.latest_reactions)
  },
  methods: {
    ...mapActions('GeneralListModule', ['push_data_to_active']),
    ...mapActions(['set_image_preview_overlay']),
    widthCols() {
      return this.data.images.length === 1 ? 12 : 6
    },
    contLikes() {
      return this.$h.dg(this.data, 'reaction_counts.like', '0')
    },
    showAll() {
      this.picture_items = this.all_images
        ? this.data.images.slice(0, 4)
        : this.data.images
      this.all_images = !this.all_images
    },
    showCommentsPost() {
      this.rotate = this.showComments ? '' : 'full-rotate'
      this.showComments = !this.showComments
      if (!this.$refs.currentUserComment) {
        this.$nextTick(() => this.$refs.currentUserComment.focus())
      }
    },
    likeActivity(activity) {
      if (this.progressLike) return true
      this.progressLike = true
      if (this.data.own_reactions.like) {
        this.data.own_reactions.like.forEach(item => {
          this.$store.dispatch('GSFeed/removeReaction', item.id).then(async response => {
            await this.$store.dispatch('GSFeed/retrieveFeed')
            this.likeState = false
            this.progressLike = false
          })
        })
      } else {
        const payload = {
          id: activity.id,
          type: 'like',
          whoNotify: activity.actor.id
        }
        this.$store.dispatch('GSFeed/addReaction', payload).then(response => {
          this.likeState = true
          this.progressLike = false
          this.$store.dispatch('GSFeed/retrieveFeed')
        })
      }
    },
    async pushComment(activity) {
      this.showSkeleton = true
      const payload = {
        id: activity.id,
        type: 'comment',
        options: {
          text: this.comment_data
        }
      }
      let self = this
      this.$store.dispatch('GSFeed/addReaction', payload).then(async response => {
        await this.$store.dispatch('GSFeed/retrieveFeed')
        this.showSkeleton = false
      })

      if (!this.data.comments) {
        this.data.comments = []
      }
      this.data.comments.push({
        name: `${this.user.firstName} ${this.user.lastName}`,
        imageUrl: this.get_user_data().imageUrl,
        message: this.comment_data,
        reactions: {
          likes: 0,
          enchants: 0,
          unlikes: 0
        },
        timestamps: {
          created: '1 min'
        }
      })
      await this.$store.dispatch('GSFeed/setFeed')
      this.comment_data = ''

    },
    async deletePost(activity) {
      this.$store.dispatch('GSFeed/removeActivity', activity.id)
      this.deleteDiaLog = false
      
      // this.$store.dispatch('GSFeed/addActivity', activity).then(() => {
      //   this.activityText = ''
      // })
    },
    async updatePost(activity) {
      activity.message = this.updateMessage;
      
      this.$store.dispatch('GSFeed/updateActivity', activity)
      this.updatePostShow = false
      this.updateMessage = this.data.message
    },
    cancelUpdate() {
      this.updatePostShow = false
      this.updateMessage = this.data.message
    },
    print() {
      // console.log(this.data.comments.nested_comments)
    },
    previewImage(selected) {
      this.set_image_preview_overlay([this.picture_items, selected])
    },
    lineColor(approval) {
      return approval ? 'green accent-3 ' : 'grey '
    },
    toogleDialogEmoji() {
      this.showDialog = !this.showDialog
    },
    onSelectEmoji(emoji) {
      this.updateMessage += emoji.data
      this.toogleDialogEmoji()
    },
    pendingApprovals(approvals) {
      let pendingApprovals = 0
      approvals.forEach(element => {
        if (!element.approval) pendingApprovals++
      })

      return pendingApprovals
    }
  }


}
</script>

<style>
.repeating-gradient {
  background-color: rgba(38, 38, 38, 0.7);
}
/* .v-text-field.v-input--dense:not(.v-text-field--outlined) input {
  padding: 0 !important;
} */
.v-badge--icon .v-badge__badge {
  height: 15px !important;
  min-width: 15px !important;
  display: flex;
  justify-content: center;
  padding: 0;
}
.profile-component .v-subheader, .profile-component .v-card {
  box-shadow: none !important;
  border-radius: 0 !important;
}
.v-text-field__details {
  display: none;
}
.emoji-component.post {
  bottom: -130px;
}
.post-item .v-skeleton-loader__avatar {
  width: 49px !important;
  height: 49px !important;
}
</style>
