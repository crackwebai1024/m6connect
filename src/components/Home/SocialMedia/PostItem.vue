<template>
  <v-container class="px-0 py-0 relative">
    <div class="card-custom-shadow mb-4 rounded white">
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
              :color="authorPostItem.data.image ? 'transparent' : 'blue'"
              dark
              size="36"
            >
              <v-img
                v-if="authorPostItem.data.image"
                :src="authorPostItem.data.image"
              />
              <template v-else>
                <span class="text-uppercase white--text">{{ authorPostItem.data.name.charAt(0) }}</span>
              </template>
            </v-avatar>
            <div class="d-flex flex-column">
              <div
                class="cursor-hover font-weight-bold line-height-1 size-15 underline"
                style="margin-bottom: 2px;"
              >
                {{ authorPostItem.data.name }}
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
                v-show="isAuthor()"
                v-bind="attrs"
                icon
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list class="grey lighten-4">
              <v-list-item @click="openPostEdit">
                <v-list-item-title>Edit Post</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteDiaLog = true">
                <v-list-item-title>Delete Post</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
        <v-btn
          v-if="data.props"
          class="ml-2"
          color="red"
          icon
          @click="closeAction"
        >
          <v-icon size="22">
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>

      <div>
        <div class="pt-4 px-5">
          <template v-if="!updatePostShow">
            {{ data.message }}
            <slot name="record" />

            <template v-if="recordFields">
              <form-show-generator :fields="recordFields" />
            </template>

            <slot name="assignments" />
          </template>
          <div
            v-else
            class="d-flex"
          >
            <v-textarea
              v-model="updateMessage"
              class="mb-0"
              label="Edit Post Message"
              name="input-7-4"
              outlined
              @keyup.enter="editMessage('inputMessage-' + index)"
              @keyup.esc="cancelMessage"
            />
            <div
              v-if="!data['props']"
              class="d-flex flex-column"
            >
              <v-btn
                class="ml-2"
                color="grey"
                icon
                @click="toogleDialogEmoji"
              >
                <v-icon size="22">
                  mdi-emoticon-happy-outline
                </v-icon>
              </v-btn>
              <v-btn
                class="ml-2"
                color="red"
                icon
                @click="cancelUpdate"
              >
                <v-icon size="22">
                  mdi-close
                </v-icon>
              </v-btn>
              <v-btn
                class="ml-2"
                color="green accent-3"
                :disabled="data.message == updateMessage"
                icon
                @click="updatePost(data)"
              >
                <v-icon size="22">
                  mdi-checkbox-marked-circle-outline
                </v-icon>
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
          <v-row v-if="updatePostShow && data['props']">
            <v-col
              class="py-0"
              cols="4"
            >
              <v-select
                v-model="record_type"
                item-text="label"
                item-value="value"
                :items="records_type"
                label="Record Type"
                @change="changeRecord($event)"
              />
            </v-col>
            <v-col
              class="py-0"
              cols="8"
            >
              <v-select
                v-model="updateInfo.record_id"
                :class="{ disabled: record_type === null }"
                item-value="id"
                :items="options.records"
                label="Record"
              >
                <template
                  slot="selection"
                  slot-scope="data"
                >
                  <!-- HTML that describe how select should render selected items -->
                  {{ data.item.app_type }} - {{ data.item.title }}
                </template>
                <template
                  slot="item"
                  slot-scope="data"
                >
                  <!-- HTML that describe how select should render items when the select is open -->
                  {{ data.item.app_type }} - {{ data.item.title }}
                </template>
              </v-select>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="updateInfo.assignment_list"
                chips
                deletable-chips
                hide-details
                hide-no-data
                hide-selected
                item-text="user.firstName"
                item-value="user.id"
                :items="companyUsers"
                label="People"
                multiple
                single-line
              >
                <template
                  slot="item"
                  slot-scope="data"
                >
                  <v-avatar
                    class="mr-3"
                    size="25"
                  >
                    <v-img :src="data.item.user.profilePic" />
                  </v-avatar>
                  <span> {{ data.item.user.firstName }} {{ data.item.user.lastName }} </span>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row v-if="updatePostShow && data['props']">
            <v-spacer />
            <v-btn
              class="grey--text white"
              elevation="0"
              width="120px"
              @click="cancelUpdate"
            >
              Cancel
            </v-btn>
            <v-spacer />
            <v-btn
              color="green darken-1"
              elevation="0"
              outlined
              width="120px"
              @click="updateActivity(data)"
            >
              Save
            </v-btn>
            <v-spacer />
          </v-row>
        </div>
      </div>
      <div>
        <v-row class="my-2" v-if="data['files'] && data['files'].length > 0">
          <v-col
            cols="12"
            class="my-0 py-0 mx-5"
            v-for="(file, index) of data['files']"
            :key="index+'-file'"
          >
            <v-icon
              @click="redirect(file)"
            >
              mdi-file-document-outline
            </v-icon>
            <p
              class="text-subtitle-1 font-weight-bold text-left pointer mx-2 my-0 py-0"
              @click="redirect(file)"
            >
              {{file.substring(file.lastIndexOf('/')+1).replace(/%20/g, ' ').replace('%28', '(').replace('%29', ')')}}
            </p>
          </v-col>
        </v-row>

        <div v-if="data['record_url'] && data['record_url']['id']" class="py-0 my-0 px-5">
          <p class="pointer text-subtitle-1 font-weight-bold blue--text" @click="redirect(data['record_url']['url'])">
            {{data['record_url']['url']}}
          </p>

          <v-row 
            no-gutters
            class="px-1 mx-2 py-0 my-0" 
            style="borderLeft: thick solid rgb(238 238 238);" 
            align="center"
          >
            <v-col cols="2">
              <v-img
                v-if="data['record_url']['img']"
                width="50" height="50"
                aspect-ratio="1.7"
                class="mx-1 my-1 rounded"
                :src="data['record_url']['image']"
                @click="previewImage(image)"
              />
              <v-icon v-else
                size="50"
              >
                mdi-store
              </v-icon>
            </v-col>
            <v-col cols="10">
              <p 
                class="py-0 my-0 font-weight-medium text--blue-grey"
              >
                {{data['record_url']['title']}}
              </p>
              <v-spacer></v-spacer>
              <p 
                class="py-0 my-0 font-weight-medium text--blue-grey"
              >
                {{data['record_url']['subtitle']}}
              </p>
              
            </v-col>
            <v-col cols="12">
              <p 
                class="py-0 my-1 font-weight-medium text--blue-grey"
              >
                {{data['record_url']['description']}}
              </p>
            </v-col>
            <v-card class="mx-5 my-7 px-2" width="50%">
              <v-card-title class="font-weight-regular my-0 pt-3 pb-0 mx-2">
                  {{data['record_url']['panel_title']}}
              </v-card-title>
              <v-row>
                <v-col 
                  v-for="(value, index) of data['record_url']['panel']"
                  :key="index+'-panel'"  cols="12"
                >
                  <p class="font-weight-light my-0 py-0 mx-2">
                    {{value['name']}}
                  </p>
                  <v-spacer></v-spacer>
                  <p class="my-0 py-0 mx-2">{{value['value']}}</p>
                </v-col>
              </v-row>
            </v-card>
          </v-row>
        </div>
        
        <div 
          v-if="images.length !== 0"
          class="px-5 py-4"
        >
          <v-btn
            v-if="all_images && images.length>4"
            class="float-button"
            color="primary"
            outlined
            @click="showAll"
          >
            Show less
          </v-btn>
          <v-row
            v-if="images.length !== 0"
            no-gutters
          >
            <v-col
              v-for="(image, index) of picture_items"
              :key="index"
              :cols="widthCols()"
            >
              <v-img
                aspect-ratio="1.7"
                class="mx-1 my-1 pointer"
                :src="image"
                @click="previewImage(image)"
              />
            </v-col>
          </v-row>
          <v-btn
            v-if="!all_images && images.length>4"
            block
            class="mt-2"
            color="primary"
            outlined
            @click="showAll"
          >
            Show All
          </v-btn>
          <div
            v-line-clamp="5"
            class="black&#45;&#45;text size-14 text-style"
            :class="images.length !== 0 ? 'mt-3' : ''"
          >
            {{ data.contain }}
          </div>
        </div>
      </div>

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
              indeterminate
              size="10"
              width="1"
            />
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
      <v-divider
        v-if="showComments"
        class="mx-4"
      />

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
      <div
        v-if="showComments && data.latest_reactions.comment"
        class="pb-1 px-5"
      >
        <post-comments
          v-for="(comment, index) of data.latest_reactions.comment.slice().reverse()"
          :key="index"
          :comment="comment"
          :feed-activity="data.props ? true : false"
          :reply="true"
          :size="48"
          :user-data="client.currentUser.data"
        />
      </div>
      <v-skeleton-loader
        v-if="showComments && showSkeleton"
        class="my-1 post-item px-1"
        type="list-item-avatar-two-line"
      />
    </div>
    <v-dialog
      v-model="deleteDiaLog"
      max-width="350"
      persistent
    >
      <delete-dialog
        :element="`post: '${data.message}'`"
        @closeDeleteModal="$event ? deletePost(data) : deleteDiaLog = false"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import PostComments from './Comments'
import { mapGetters, mapActions } from 'vuex'
import VEmojiPicker from 'v-emoji-picker'
import DeleteDialog from '@/components/Dialogs/DeleteDialog'
import FormShowGenerator from '@/components/AppBuilder/Form/FormShowGenerator.vue'

export default {
  name: 'PostItem',
  components: {
    DeleteDialog,
    PostComments,
    VEmojiPicker,
    FormShowGenerator
  },
  props: {
    data: {
      type: [String, Object],
      default: () => {}
    }
  },
  data: () => ({
    records_type: [
      { label: 'ITApps', value: 'itapps' }
    ],
    infoPanel: {},
    recordFields: [],
    record_type: null,
    options: {
      records: []
    },
    updateInfo: {
      record_id: null,
      assignment_list: [],
      preview_list: []
    },
    images:[],

    showBtnsPost: false,
    showComments: false,
    picture_items: [],
    likeState: false,
    profileImaga: '',
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
    ...mapGetters('Companies', { companyUsers: 'getCurrentCompanyUsers' }),
    ...mapGetters('Auth', { currentUser: 'getUser' }),
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
    },
    authorPostItem() {
      let authorPostData = this.data.actor
      if (typeof authorPostData === 'string') authorPostData = JSON.parse(authorPostData)
      return authorPostData
    }
  },
  mounted() {
    this.images = this.data.images;
    this.picture_items = this.images.slice(0, 4);
    this.user = this.currentUser;
    if (this.data.own_reactions.like !== undefined) {
      this.likeState = true
    }
    if (typeof this.data.actor === 'string') {
      this.data.actor = JSON.parse(this.data.actor)
    }
    this.updateMessage = this.data.message

    if (this.data.props && this.data.props.fields) {
      this.recordFields = this.data.props.fields.map(field => field.app_field)
    }
  },
  methods: {
    ...mapActions('GeneralListModule', ['push_data_to_active']),
    ...mapActions(['set_image_preview_overlay']),
    ...mapActions("WorkOrderModule", { records: "getRecords", putAct: "putAction", deleteAct: "deleteAction" }),
    ...mapActions("AppAttachments", { getPostsUrl: "get_post_file_url" }),

    isAuthor() {
      return typeof this.data.actor === 'string' ? JSON.parse(this.data.actor)['id'] === this.user.id
        : this.data.actor.id === this.user.id
    },
    changeRecord(event) {
      switch (event) {
        case 'itapps':
          this.records(event).then(res => {
            this.options['records'] = res['data']
          })
          break
      }
    },
    redirect(file){
      window.open(file,'_blank')
    },
    updateActivity(activity){
      this.updateInfo['description'] = this.updateMessage;
      this.activity = activity;
      this.putAct({
        id: activity['props']['id'],
        query: this.updateInfo
      }).then(() => {
        this.updateInfo['preview_list'] = this.updateInfo['assignment_list']
        this.updatePost(activity).then(() => {
          this.$store.dispatch('WorkOrderModule/setWorkOrder')
        })
        this.cancelUpdate()
      })
    },
    widthCols() {
      return this.images.length === 1 ? 12 : 6
    },
    contLikes() {
      return this.$h.dg(this.data, 'reaction_counts.like', '0')
    },
    showAll() {
      this.picture_items = this.all_images
        ? this.images.slice(0, 4)
        : this.images
      this.all_images = !this.all_images
    },
    showCommentsPost() {
      this.rotate = this.showComments ? '' : 'full-rotate'
      this.showComments = !this.showComments
      if (!this.$refs.currentUserComment) {
        this.$nextTick(() => this.$refs.currentUserComment.focus())
      }
    },
    async likeActivity(activity) {
      if (this.progressLike) return true
      this.progressLike = true
      const payload = {
        id: activity.id,
        type: 'like',
        whoNotify: activity.actor.id
      }

      if (this.data.own_reactions.like) {
        const activ = this.data.own_reactions.like.find(i => i.user_id === this.user.id)
        if (activ) {
          await this.$store.dispatch('GSFeed/removeReaction', activ.id)
          this.likeState = false
        } else {
          await this.$store.dispatch('GSFeed/addReaction', payload)
          this.likeState = true
        }
      } else {
        await this.$store.dispatch('GSFeed/addReaction', payload)
        this.likeState = true
      }
      if (activity.props) {
        await this.$store.dispatch('GSFeed/setActionPost')
        await this.$store.dispatch('WorkOrderModule/setWorkOrder')
      } else {
        await this.$store.dispatch('GSFeed/retrieveFeed')
      }

      this.progressLike = false
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

      this.$store.dispatch('GSFeed/addReaction', payload).then(async response => {
        if (activity.props) {
          await this.$store.dispatch('GSFeed/setActionPost')
          await this.$store.dispatch('WorkOrderModule/setWorkOrder')
        } else {
          await this.$store.dispatch('GSFeed/retrieveFeed')
        }
        this.showSkeleton = false
      })

      if (!this.data.comments) {
        this.data.comments = []
      }
      this.comment_data = ''
    },
    async deletePost(activity) {
      await this.$store.dispatch('GSFeed/removeActivity', activity.id)
      if (activity.props) {
        await this.deleteAct(activity.props.id)

        this.$store.dispatch('GSFeed/setEmptyActionPost')
        this.$store.dispatch('WorkOrderModule/setWorkOrder')
      }
      this.deleteDiaLog = false
      await this.$store.dispatch('GSFeed/retrieveFeed')
    },
    closeAction() {
      this.$store.dispatch('GSFeed/setEmptyActionPost')
    },
    async updatePost(activity) {
      if (typeof activity['actor'] === 'string') {
        activity['actor'] = JSON.parse(activity['actor'])
      }

      activity['actor']['data']['name'] = `${this.user.firstName} ${this.user.lastName}`
      activity['actor']['data']['image'] = this.user.profilePic
      activity.message = this.updateMessage

      this.$store.dispatch('GSFeed/updateActivity', activity)
      this.updatePostShow = false
      this.updateMessage = this.data.message
    },
    openPostEdit() {
      this.updatePostShow = true
      this.updateMessage = this.data.message
      if (this.data.props) {
        if (this.data.props.record) {
          this.records(this.data.props.record.app_type).then(res => {
            this.options['records'] = res['data']

            this.record_type = this.data['props']['record']['app_type']
            this.updateInfo['record_id'] = this.data['props']['record']['id']
          })
        }
        if (this.data['props']['wo_assignments'].length > 0) {
          this.data['props']['wo_assignments'].forEach(user => {
            this.updateInfo['assignment_list'].push(user.id)
          })
          this.updateInfo['preview_list'] = this.updateInfo['assignment_list']
        }
      }
    },
    cancelUpdate() {
      this.updatePostShow = false
      this.updateMessage = this.data.message
      this.updateInfo.assignment_list = []
    },
    async previewImage(selected) {
      await this.$store.dispatch('GSFeed/setPreviewPost', this.data['id']);
      this.set_image_preview_overlay([this.data.images, selected]);
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
v-icon, p {
  display: inline-block;
}
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
  bottom: -240px;
}
.post-item .v-skeleton-loader__avatar {
  width: 49px !important;
  height: 49px !important;
}
</style>
