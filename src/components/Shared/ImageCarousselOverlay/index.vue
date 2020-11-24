<template>
  <transition name="fade">
    <v-overlay opacity="0.6" :value="overlay">
      <v-card class="h-viewport w-viewport"
        @keydown.esc="closeOverlay()"
        @keydown.left="this.images.indexOf(navigate++)"
        @keydown.right="this.images.indexOf(navigate--)"
      >
        <v-row no-gutters align="center" justify="center" class="fill-height">
          <v-col cols="8" class="relative">
            <v-avatar
              @click="closeOverlay()"
              size="50"
              color="grey lighten-2"
              class="pointer absolute top-0"
              style="height: 50px; width: 50px; left: 15px; z-index: 100;"
            >
              <v-icon size="30" color="black">mdi-close</v-icon>
            </v-avatar>
            <carousel
              class="w-full"
              :navigationEnabled="false"
              :paginationEnabled="true"
              :perPage="1"
              :navigateTo="navigate"
            >
              <slide v-for="(item,index) in images" :key="index+'-image'">
                <v-img style="height:80vh;" :src="item"/>
              </slide>
            </carousel>
          </v-col>
          <v-col cols="4" class="h-viewport white">
            <v-card 
              class="card-custom-shadow mb-4 white"
              v-if="Object.keys(post).length > 0"
              style="height: 20vh;"
            >
              <v-card-title class="pb-0 pt-6 px-5">
                <v-row
                  align="center"
                  no-gutters
                >
                  <div class="align-center d-flex">
                    <v-avatar
                      class="mr-2"
                      :color="post.actor.data.image ? 'transparent' : 'blue'"
                      size="36"
                    >
                      <v-img
                        v-if="post.actor.data.image"
                        :src="post.actor.data.image"
                      />
                      <template v-else>
                        <span class="text-uppercase white--text">{{ post.actor.data.name.charAt(0) }}</span>
                      </template>
                    </v-avatar>
                    <div class="d-flex flex-column">
                      <div
                        class="cursor-hover font-weight-bold line-height-1 size-15 underline"
                        style="margin-bottom: 2px;"
                      >
                        {{ post.actor.data.name }}
                      </div>
                    </div>
                  </div>
                </v-row>
              </v-card-title>
              <div>
                <div class="px-5 py-4">
                  <template>
                    {{ post.message }}
                    <slot name="record"></slot>
                    <slot name="assignments"></slot>
                  </template>
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
                  >
                    {{ likeIcon }}
                  </v-icon>
                  <div
                    class="cursor-hover grey--text my-0 text--darken-1"
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
                  >
                    Comments
                    <span>{{ post.reaction_counts.comment || 0 }}</span>
                  </div>
                </v-row>
              </v-card-actions>
            </v-card>
            <div 
              v-if="Object.keys(post).length > 0" 
              style="overflow-y:auto; height: 80vh;"
            >
              <v-col
                class="d-flex px-5"
                cols="12">
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
                  solo
                  height="40"
                  hide-details
                  placeholder="Write a comment..."
                  rounded
                  @keyup.enter="pushComment(post)"
                />
              </v-col>
              <div
                v-if="post.latest_reactions.comment"
                class="pb-1 px-5"
              >
                <post-comments
                  v-for="(comment, index) of post.latest_reactions.comment.slice().reverse()"
                  :key="index"
                  :comment="comment"
                  :reply="true"
                  :feedActivity="post.props ? true : false"
                  :size="48"
                  :userData="client.currentUser.data"
                />
              </div>
              <v-skeleton-loader
                v-if="showSkeleton"
                class="post-item px-1 my-1"
                type="list-item-avatar-two-line"
              ></v-skeleton-loader>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-overlay>
  </transition>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import { mapGetters } from "vuex";
import PostComments from '@/components/Home/SocialMedia/Comments';
import CarouselImage from "@/components/Shared/ImageCarousselOverlay/CarouselImage";

export default {
  components: {
    Carousel,
    Slide,
    PostComments,
    CarouselImage,
  },
  props: {
    value: {
      default: false,
    },
    images: {
      required: true,
    },
    selected: {
      required: true,
    },
  },
  data() {
    return {
      overlay: false,
      likeState: false,
      progressLike: false,  
      showSkeleton: false,
      comment_data: '',
      navigate: 0,
    };
  },
  watch: {
    value(val) {
      this.overlay = val;
    },
    post(val) {
      this.post.actor = JSON.parse(this.post.actor);
    },
    selected(val) {
      this.navigate = [this.images.indexOf(val), false];
    },
  },
  computed: {
    ...mapGetters('GSFeed', {
      post: 'getPreviewPost'
    }),
    ...mapGetters('GSFeed', {
      client: 'getClient'
    }),
    likeIcon() {
      return this.likeState ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'
    },
  },
  methods: {
    closeOverlay() {
      this.overlay = false;
      this.$emit("restartImageArray");
    },
    showCommentsPost() {
      this.rotate = 'full-rotate'
      if (!this.$refs.currentUserComment) {
        this.$nextTick(() => this.$refs.currentUserComment.focus())
      }
    },
    contLikes() {
      return this.$h.dg(this.post, 'reaction_counts.like', '0')
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
          await this.$store.dispatch('GSFeed/setPreviewPost', this.post['id']);
        }
        this.showSkeleton = false
      })

      if (!this.data.comments) {
        this.data.comments = []
      }
      this.comment_data = ''
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>