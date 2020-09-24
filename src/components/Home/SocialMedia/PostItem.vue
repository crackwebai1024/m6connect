<template>
  <v-container class="px-0 py-0">
    <div class="card-custom-shadow mb-3 rounded white">
      <v-card-title class="pb-0">
        <v-row
          align="center"
          no-gutters
        >
          <div class="align-center d-flex">
            <v-avatar
              class="mr-2"
              size="40"
            >
              <img :src="data.imageUrl">
            </v-avatar>
            <div class="d-flex flex-column">
              <div
                class="cursor-hover font-weight-bold line-height-1 size-15 underline"
                style="margin-bottom: 2px;"
              >
                {{ data.name }}
              </div>
              <div class="d-flex grey--text line-height-1 text-caption">
                <div class="grey--text text--darken-1">
                  {{ data.occupation }}
                </div>
                <div class="grey--text mx-1 text--darken-1">
                  ·
                </div>
                <div class="grey--text text--darken-1">
                  {{ data.timestamps.created }}
                </div>
              </div>
            </div>
          </div>
          <v-spacer />
          <v-menu
            bottom
            left
            nudge-left
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-icon :on="on">
                mdi-dots-vertical
              </v-icon>
            </template>
            <v-list>
              <v-list-item @click="()=> {}">
                Edit Post
              </v-list-item>
              <v-list-item @click="()=> {}">
                Delete Post
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
      </v-card-title>
      <div>
        <div class="px-4 py-4">
          <v-btn
            v-if="all_images && data.images.length>4"
            class="float-button"
            color="primary"
            outlined
            @click="showAll"
          >
            Show less
          </v-btn>
          <v-row
            v-if="data.images.length !== 0"
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
                :src="image.url"
                @click="previewImage(image)"
              />
            </v-col>
          </v-row>
          <v-btn
            v-if="!all_images && data.images.length>4"
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
            class="black--text size-14 text-style"
            :class="data.images.length !== 0 ? 'mt-3' : ''"
          >
            {{ data.contain }}
          </div>
        </div>
      </div>
      <v-divider class="mx-4" />
      <v-card-actions class="px-4">
        <v-row
          align="center"
          class="px-2"
          no-gutters
        >
          <v-icon
            class="mr-1"
            @click="likeIcon"
          >
            {{ like_icon }}
          </v-icon>
          <div
            class="cursor-hover grey--text my-0 text--darken-1"
            @click="likeIcon"
          >
            {{ contLikes() }}
          </div>
          <v-spacer />
          <div
            class="cursor-hover grey--text my-0 size-15 text--darken-1 underline"
            @click="showCommentsPost"
          >
            Comments
            <span>{{ data.comments.length }}</span>
          </div>
        </v-row>
      </v-card-actions>
      <v-divider class="mx-4" />
      <v-col cols="12">
        <v-text-field
          v-model="comment_data"
          dense
          filled
          height="37"
          hide-details
          placeholder="Write a comment..."
          rounded
          @keyup.enter="pushComment"
        />
      </v-col>
      <div
        v-if="showComments"
        class="pb-3 px-4"
      >
        <post-comments
          v-for="(comment, index) of data.comments"
          :key="index"
          :comment="comment"
          :size="48"
        >
          <div>
            <post-comments
              v-for="(nested_comment, index2) of comment.nested_comments"
              :key="index2"
              :comment="nested_comment"
              :size="36"
            />
          </div>
        </post-comments>
      </div>
    </div>
  </v-container>
</template>

<script>
import PostComments from './Comments'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PostItem',
  components: {
    PostComments
  },
  props: {
    data: Object
  },
  data: () => ({
    like_icon: 'mdi-thumb-up-outline',
    showComments: false,
    picture_items: [],
    like_state: false,
    all_images: false,
    comment_data: '',
    rotate: ''
  }),
  methods: {
    ...mapActions('GeneralListModule', ['push_data_to_active']),
    ...mapActions(['set_image_preview_overlay']),
    widthCols() {
      return this.data.images.length === 1 ? 12 : 6
    },
    contLikes() {
      const reac = this.data.reactions
      return reac.likes + reac.enchants + reac.unlikes
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
    },
    likeIcon() {
      this.like_state = !this.like_state
      this.like_icon = this.like_state
        ? 'mdi-thumb-up'
        : 'mdi-thumb-up-outline'
      this.print()
    },
    pushComment() {
      this.data.comments.push({
        name: this.get_user_data().name,
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
      this.comment_data = ''
    },
    print() {
      console.log(this.data.comments.nested_comments)
    },
    previewImage(selected) {
      this.set_image_preview_overlay([this.picture_items, selected])
    }
  },
  created() {
    this.picture_items = this.data.images.slice(0, 4)
  },
  computed: {
    ...mapGetters(['get_user_data'])
  }
}
</script>

<style scoped>
.repeating-gradient {
  background-color: rgba(38, 38, 38, 0.7);
}
/* .v-text-field.v-input--dense:not(.v-text-field--outlined) input {
  padding: 0 !important;
} */
</style>
