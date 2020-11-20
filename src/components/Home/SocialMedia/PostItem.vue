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
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list class="grey lighten-4">
              <v-list-item @click="openPostEdit()">
                <v-list-item-title>Edit Post</v-list-item-title>                
              </v-list-item>
              <v-list-item @click="deleteDiaLog = true">
                <v-list-item-title>Delete Post</v-list-item-title>                
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
        <v-btn v-if="data.props" @click="closeAction()" class="ml-2" icon color="red">
          <v-icon size="22">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <div>
        <div class="px-5 pt-4">
          <template v-if="!updatePostShow">
            {{ data.message }}
            <slot name="record"></slot>
            <slot name="assignments"></slot>
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
            <div v-if="!data['props']" class="d-flex flex-column">
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
          <v-row v-if="updatePostShow && data['props']">
            <v-col cols="4" class="py-0">
              <v-select
                v-on:change="changeRecord($event)"
                v-model="record_type"
                item-value="value"
                item-text="label"
                label="Record Type"
                :items="records_type"
              >
              </v-select>
            </v-col>
            <v-col cols="8" class="py-0">
              <v-select
                :class="{ disabled: record_type === null }"
                v-model="updateInfo.record_id"
                label="Record"
                :items="options.records"
                item-value="id"
              >
                <template slot="selection" slot-scope="data">
                  <!-- HTML that describe how select should render selected items -->
                  {{ data.item.app_type }} - {{ data.item.title }}
                </template>
                <template slot="item" slot-scope="data">
                  <!-- HTML that describe how select should render items when the select is open -->
                  {{ data.item.app_type }} - {{ data.item.title }}
                </template>
              </v-select>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                :items="companyUsers"
                v-model="updateInfo.assignment_list"
                chips
                label="People"
                item-value="user.id"
                hide-details
                deletable-chips
                hide-no-data
                item-text="user.firstName"
                hide-selected
                multiple
                single-line
              >
                <template slot="item" slot-scope="data">
                  <v-avatar size="25" class="mr-3">
                    <v-img :src="data.item.user.profilePic"></v-img>
                  </v-avatar>
                  <span> {{ data.item.user.firstName }} {{ data.item.user.lastName }} </span>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row v-if="updatePostShow && data['props']">
            <v-spacer></v-spacer>
            <v-btn @click="cancelUpdate"   class="white grey--text" width="120px" elevation="0">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="updateActivity(data)" color="green darken-1" outlined width="120px" elevation="0">Save</v-btn>
            <v-spacer></v-spacer>
          </v-row>
        </div>
      </div>
      <div>
        <div class="px-5 py-4">
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
      <v-divider v-if="showComments" class="mx-4" />

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
          :reply="true"
          :feedActivity="data.props ? true : false"
          :size="48"
          :userData="client.currentUser.data"
        />
      </div>
      <v-skeleton-loader
        v-if="showComments && showSkeleton"
        class="post-item px-1 my-1"
        type="list-item-avatar-two-line"
      ></v-skeleton-loader>
    </div>
    <v-dialog
      v-model="deleteDiaLog"
      persistent
      max-width="350"
    >
      <delete-dialog :element="`post: '${data.message}'`" @closeDeleteModal="$event ? deletePost(data) : deleteDiaLog = false" />
    </v-dialog>
  </v-container>
</template>

<script>
import PostComments from './Comments'
import { mapGetters, mapActions } from 'vuex'
import VEmojiPicker from 'v-emoji-picker'
import DeleteDialog from '@/components/Dialogs/DeleteDialog'

export default {
  name: 'PostItem',
  components: {
    DeleteDialog,
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
    records_type: [
      { label: 'ITApps', value:'itapps' }
    ],
    record_type: null,
    options: {
      records: [],
    },
    updateInfo: {
      record_id: null,
      assignment_list: [],
      preview_list:[]
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
    ...mapGetters('Companies',  { companyUsers: 'getCurrentCompanyUsers' }),
    ...mapGetters('Auth',       { currentUser: 'getUser' }),
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
      if(typeof authorPostData === 'string') authorPostData = JSON.parse(authorPostData)
      return authorPostData
    }
  },
  mounted() {
    this.getPostsUrl(this.data.id).then( res => {
      this.images = res;
      this.picture_items = this.images.slice(0, 4)
    });
    this.user = this.currentUser;
    if (this.data.own_reactions.like !== undefined) {
      this.likeState = true
    }
    if(typeof this.data.actor === 'string'){
      this.data.actor = JSON.parse(this.data.actor);
    }
    this.updateMessage = this.data.message
  },
  methods: {
    ...mapActions('GeneralListModule', ['push_data_to_active']),
    ...mapActions(['set_image_preview_overlay']),
    ...mapActions("WorkOrderModule", { records: "getRecords", putAct: "putAction", deleteAct: "deleteAction" }),
    ...mapActions("AppAttachments", { getPostsUrl: "get_post_file_url" }),

    isAuthor(){
      return typeof this.data.actor === 'string' ? JSON.parse(this.data.actor)['id'] === this.user.id
        : this.data.actor.id === this.user.id;
    },
    changeRecord(event){
      switch( event ){
        case 'itapps':
          this.records(event).then(res => { this.options['records'] = res['data']; });
          break;
      }
    },
    updateActivity(activity){
      this.updateInfo['description'] = this.updateMessage;
      this.activity = activity;
      this.putAct({
        id: activity['props']['id'],
        query: this.updateInfo
      }).then(() =>{
        this.updateInfo['preview_list'] = this.updateInfo['assignment_list'];
        this.updatePost(activity).then(() => {
          this.$store.dispatch('WorkOrderModule/setWorkOrder');
        });
        this.cancelUpdate();
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
      };

      if (this.data.own_reactions.like) {
        let activ = this.data.own_reactions.like.find( i =>  i.user_id === this.user.id )
        if( activ ){
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
      if( activity.props ){
        await this.$store.dispatch('GSFeed/setActionPost')
        await this.$store.dispatch('WorkOrderModule/setWorkOrder');
      } else{
        await this.$store.dispatch('GSFeed/retrieveFeed');
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
        if( activity.props ){
          await this.$store.dispatch('GSFeed/setActionPost')
          await this.$store.dispatch('WorkOrderModule/setWorkOrder');
        }else{
          await this.$store.dispatch('GSFeed/retrieveFeed');
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
      if(activity.props){
        await this.deleteAct(activity.props.id);

        this.$store.dispatch('GSFeed/setEmptyActionPost');
        this.$store.dispatch('WorkOrderModule/setWorkOrder');
      }
      this.deleteDiaLog = false
      await this.$store.dispatch('GSFeed/retrieveFeed')
    },
    closeAction(){
      this.$store.dispatch('GSFeed/setEmptyActionPost');
    },
    async updatePost(activity) {
      if( typeof activity['actor'] === 'string'){
        activity['actor'] = JSON.parse(activity['actor'])
      }
      
      activity['actor']['data']['name'] = `${this.user.firstName} ${this.user.lastName}`
      activity['actor']['data']['image'] = this.user.profilePic
      activity.message = this.updateMessage;
      
      this.$store.dispatch('GSFeed/updateActivity', activity)
      this.updatePostShow = false
      this.updateMessage = this.data.message
    },
    openPostEdit() {
      this.updatePostShow = true
      this.updateMessage = this.data.message
      if(this.data.props){
        if(this.data.props.record) {
          this.records(this.data.props.record.app_type).then(res => {
            this.options['records'] = res['data'];

            this.record_type = this.data['props']['record']['app_type']
            this.updateInfo['record_id'] = this.data['props']['record']['id']
          });
        }
        if(this.data['props']['wo_assignments'].length > 0) {
          this.data['props']['wo_assignments'].forEach(user => {
            this.updateInfo['assignment_list'].push(user.id);
          });
          this.updateInfo['preview_list'] = this.updateInfo['assignment_list'];
        }
      }
    },
    cancelUpdate() {
      this.updatePostShow = false
      this.updateMessage = this.data.message
      this.updateInfo.assignment_list = [];
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
  bottom: -240px;
}
.post-item .v-skeleton-loader__avatar {
  width: 49px !important;
  height: 49px !important;
}
</style>
