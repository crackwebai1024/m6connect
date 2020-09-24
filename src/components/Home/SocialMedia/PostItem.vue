<template>
  <v-container class="px-0 py-0 relative">
    <div class="mb-3 card-custom-shadow white rounded">
      <div v-if="data['postTagTitle']" :class="tagColor + ' card-content__tag absolute white--text d-flex justify-center align-center text-body-1 font-weight-regular'">
        {{ data['postTagTitle'] }}
      </div>
      <v-card-title class="pb-0 pt-6">
        <v-row no-gutters align="center">
          <div class="d-flex align-center">
            <v-avatar size="40" class="mr-2">
              <img :src="data.imageUrl" />
            </v-avatar>
            <div class="d-flex flex-column">
              <div
                class="cursor-hover underline size-15 line-height-1 font-weight-bold"
                style="margin-bottom: 2px;"
              >{{data.name}}</div>
              <div class="d-flex text-caption line-height-1 grey--text">
                <div class="grey--text text--darken-1">{{ data.occupation }}</div>
                <div class="mx-1 grey--text text--darken-1">·</div>
                <div class="grey--text text--darken-1">{{ data.timestamps.created }}</div>
              </div>
            </div>
          </div>
          <v-spacer></v-spacer>
          <v-menu bottom offset-y left nudge-left>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-dots-vertical</v-icon>
            </template>
            <v-list>
              <v-list-item @click="()=> {}">Edit Post</v-list-item>
              <v-list-item @click="()=> {}">Delete Post</v-list-item>
            </v-list>
          </v-menu>
        </v-row>
      </v-card-title>
      <div>
        <div class="px-4 py-4">
          <v-btn
            @click="showAll()"
            outlined
            color="primary"
            v-if="all_images && data.images.length>4"
            class="float-button"
          >Show less</v-btn>
          <v-row no-gutters v-if="data.images.length !== 0">
            <v-col :cols="widthCols()" v-for="(image, index) of picture_items" :key="index">
              <v-img
                :src="image.url"
                class="mx-1 my-1 pointer"
                aspect-ratio="1.7"
                @click="previewImage(image)"
              ></v-img>
            </v-col>
          </v-row>
          <v-btn
            @click="showAll()"
            block
            outlined
            class="mt-2"
            color="primary"
            v-if="!all_images && data.images.length>4"
          >Show All</v-btn>
          <div
            class="size-14 text-style black--text"
            :class="data.images.length !== 0 ? 'mt-3' : ''"
            v-line-clamp="5"
          >{{data.contain}}</div>
        </div>
      </div>
      <div v-if="data['postType'] === 'request'" class="ma-4 mt-0 border-1">
        <div :class="'text-h6 py-2 px-3 font-weight-regular ' + this.tagColor + '--text'">{{ data['request'].title }}</div>
        <v-divider></v-divider>
        <!-- post component reference-->
        <template v-if="data['componentName']">
          <component v-bind:is="data['componentName']" class="pa-0 profile-component"></component>
        </template>
        <div class="d-flex justify-space-between pa-3 pt-0 align-center">
          <div>
            <div class="pt-6 pb-2 d-flex align-center">
              <div v-for="(userRequest, index) in data['request'].users" :key="index+'userrequest'" class="d-flex">
                <v-badge
                  :bordered="userRequest.approval ? false : true"
                  :dark="userRequest.approval ? false : true"
                  top
                  :color="userRequest.approval ? 'green accent-3' : 'white black--text'"
                  :icon="userRequest.approval ? 'mdi-check' : 'mdi-help'"
                  offset-x="12"
                  offset-y="12"
                >
                  <v-avatar size="35">
                    <v-img :src="userRequest.imgSrc"></v-img>
                  </v-avatar>
                </v-badge>
                <template v-if="index !== data['request'].users.length - 1">
                  <span style="height: 5px; width: 25px;" :class="lineColor(userRequest.approval) + 'my-auto'"></span>
                </template>
              </div>
            </div>
            <div class="text-caption black--text" v-if="pendingApprovals(data['request'].users) > 0">{{ pendingApprovals(data['request'].users  ) }} Pending Approvals</div>
          </div>
          <div class="d-flex justify-end">
            <v-btn class="my-2 mr-2 px-6 capitalize" text color="grey darken-3">Deny</v-btn>
            <v-btn class="my-2 px-8 capitalize" outlined color="green accent-4">Approve</v-btn>
          </div>
        </div>
      </div>
      <v-divider class="mx-4" />
      <v-card-actions class="px-4">
        <v-row no-gutters align="center" class="px-2">
          <v-icon class="mr-1" @click="likeIcon()">{{like_icon}}</v-icon>
          <div
            class="my-0 cursor-hover grey--text text--darken-1"
            @click="likeIcon()"
          >{{ contLikes() }}</div>
          <v-spacer />
          <div
            class="my-0 cursor-hover underline grey--text text--darken-1 size-15"
            @click="showCommentsPost()"
          >
            Comments
            <span>{{data.comments.length}}</span>
          </div>
        </v-row>
      </v-card-actions>
      <v-divider class="mx-4" />
      <v-col cols="12">
        <v-text-field
          height="37"
          v-model="comment_data"
          placeholder="Write a comment..."
          filled
          rounded
          dense
          hide-details
          @keyup.enter="pushComment()"
        ></v-text-field>
      </v-col>
      <div v-if="showComments" class="px-4 pb-3">
        <post-comments
          :comment="comment"
          :size="48"
          v-for="(comment, index) of data.comments"
          :key="index"
        >
          <div>
            <post-comments
              :comment="nested_comment"
              :size="36"
              v-for="(nested_comment, index2) of comment.nested_comments"
              :key="index2"
            />
          </div>
        </post-comments>
      </div>
    </div>
  </v-container>
</template>
<script>
import PostComments from "./Comments";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PostItem",
  components: {
    PostComments,
  },
  props: {
    data: Object,
  },
  data: () => ({
    like_icon: "mdi-thumb-up-outline",
    showComments: false,
    picture_items: [],
    like_state: false,
    all_images: false,
    comment_data: "",
    rotate: "",
  }),
  methods: {
    ...mapActions("GeneralListModule", ["push_data_to_active"]),
    ...mapActions(["set_image_preview_overlay"]),
    widthCols() {
      return this.data.images.length === 1 ? 12 : 6;
    },
    contLikes() {
      let reac = this.data.reactions;
      return reac.likes + reac.enchants + reac.unlikes;
    },
    showAll() {
      this.picture_items = this.all_images
        ? this.data.images.slice(0, 4)
        : this.data.images;
      this.all_images = !this.all_images;
    },
    showCommentsPost() {
      this.rotate = this.showComments ? "" : "full-rotate";
      this.showComments = !this.showComments;
    },
    likeIcon() {
      this.like_state = !this.like_state;
      this.like_icon = this.like_state
        ? "mdi-thumb-up"
        : "mdi-thumb-up-outline";
      this.print();
    },
    pushComment() {
      this.data.comments.push({
        name: this.get_user_data().name,
        imageUrl: this.get_user_data().imageUrl,
        message: this.comment_data,
        reactions: {
          likes: 0,
          enchants: 0,
          unlikes: 0,
        },
        timestamps: {
          created: "1 min",
        },
      });
      this.comment_data = "";
    },
    print() {
      console.log(this.data.comments.nested_comments);
    },
    previewImage(selected) {
      this.set_image_preview_overlay([this.picture_items, selected]);
    },
    lineColor(approval) {
      return approval ? 'green accent-3 ' : 'grey '
    },
    pendingApprovals(approvals) {
      let pendingApprovals = 0 ;
      approvals.forEach(element => {
        if(!element.approval) pendingApprovals++
      });
      
      return pendingApprovals;
    }
  },
  created() {
    this.picture_items = this.data.images.slice(0, 4);
  },
  computed: {
    ...mapGetters(["get_user_data"]),
    tagColor() {
      return this.data['postType'] === 'request' ? 'red' : 'teal accent-3';
    }
  },
};
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
</style>