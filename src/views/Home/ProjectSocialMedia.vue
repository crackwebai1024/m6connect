<template>
  <v-container
    class="h-full px-3 py-0"
  >
    <header-component
      class="card-custom-shadow h-auto mb-3 rounded"
      hasslot
      :info="{title: 'Create Post', icon: ''}"
    >
      <template v-slot:select>
        <v-menu
          bottom
          offset-y
          transition="slide-y-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              class="capitalize font-weight-bold mb-0 pl-1 purple--text px-0 text--darken-1 transparent"
              elevation="0"
              v-on="on"
            >
              Public
              <v-icon class="blue--text text--darken-3">
                mdi-chevron-down
              </v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
              v-for="(item, i) in areas"
              :key="i"
            >
              <v-list-item-title
                :class="item.type === 'title' ? 'grey--text' : 'black--text'"
              >
                {{ item.text }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:input>
        <img
          :alt="user.firstName"
          class="mr-1 rounded-circle"
          height="40"
          :src="user.imgSrc"
          width="40"
        >

        <v-text-field
          v-model="activityText"
          class="font-weight-bold ml-1"
          dense
          flat
          height="40"
          hide-details
          :label="`Whats on your mind, ${user.firstName}?`"
          rounded
          single-line
          solo-inverted
          @keyup.enter="addActivity"
        >
          <template v-slot:append>
            <v-row class="align-center d-flex">
              <!--              <v-icon class="blue&#45;&#45;text text&#45;&#45;lighten-1">-->
              <!--                mdi-file-document-outline-->
              <!--              </v-icon>-->
              <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                class="align-center blue--text d-flex justify-center ma-0 pa-0 upload-icon"
                hide-input
                multiple
                prepend-icon="mdi-image-outline"
                @change="onImagesChange($event)"
              />
              <!--              <v-icon class="red&#45;&#45;text text&#45;&#45;lighten-1">-->
              <!--                mdi-link-variant-->
              <!--              </v-icon>-->
              <v-btn
                icon
                @click="addActivity"
              >
                <v-icon
                  class="blue--text text--lighten-1"
                >
                  mdi-send
                </v-icon>
              </v-btn>
            </v-row>
          </template>

          <template v-slot:prepend-inner>
            <template v-if="srcImageFiles.length > 0">
              <div class="d-flex images-container mx-1 px-0 py-3">
                <div
                  v-for="(srcImageFile, index) in srcImageFiles"
                  :key="'previewimage-' + index"
                  class="mx-1 relative w-fit"
                >
                  <img
                    class="image-preview"
                    :src="srcImageFile"
                  >
                  <v-btn
                    class="absolute btn-chat-shadow ml-2 right-0 top-0"
                    color="grey lighten-2"
                    fab
                    style="height:15px; width:15px;"
                    @click="removeImage(index)"
                  >
                    <v-icon
                      size="12"
                    >
                      mdi-close
                    </v-icon>
                  </v-btn>
                </div>
              </div>
            </template>
          </template>
        </v-text-field>
      </template>
    </header-component>
    <v-skeleton-loader
      v-if="showSkeletonPost"
      class="my-3"
      type="list-item-avatar-three-line, actions"
    ></v-skeleton-loader>
    <posts-list />
  </v-container>
</template>

<script>
import HeaderComponent from '@/components/Home/HeaderComponent'
import PostsList from '@/components/Home/SocialMedia/PostsList'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SocialMedia',
  components: {
    HeaderComponent,
    PostsList
  },
  data: () => ({
    areas: [
      { text: 'Everyone', type: 'subtitle' },
      { text: 'My company', type: 'subtitle' },
      { text: 'Teams', type: 'title' },
      { text: 'All my teams', type: 'subtitle' },
      { text: 'IT Team XY', type: 'subtitle' },
      { text: 'CPM Team Z', type: 'subtitle' },
      { text: 'Departments', type: 'title' },
      { text: 'All my departments', type: 'subtitle' },
      { text: 'Finances', type: 'subtitle' },
      { text: 'Operations', type: 'subtitle' }
    ],
    activityText: '',
    // items:['Everyone', 'My Company', 'All My Teams', 'IT Team XY', 'CPM TeamZ', 'All My Departments', 'Finances', 'Operations'],
    items: [
      {
        text: 'Everyone',
        value: 'Everyone'
      },
      {
        text: 'My posts',
        value: 'author'
      },
      {
        text: 'My Company',
        value: 'company'
      }
    ],
    item: 'Everyone',
    imageFiles: [],
    posts_list: [{}],
    showSkeletonPost: false
  }),
  computed: {
    ...mapGetters('Auth', { user: 'getUser' }),
    srcImageFiles() {
      const srcImages = []
      this.imageFiles.forEach(imageFile => {
        srcImages.push(URL.createObjectURL(imageFile))
      })
      return srcImages
    }
  },
  methods: {
    ...mapActions('SocialNetworkModule', ['filter_posts']),
    addActivity() {
      if (this.activityText.trim() === '') {
        return
      }
      this.showSkeletonPost = true
      const activity = {
        message: this.activityText,
        verb: 'post',
        object: 1,
        images: this.imageFiles
      }
      this.activityText = ''
      this.$store.dispatch('GSFeed/addActivity', activity).then(() => {
        this.showSkeletonPost = false
      })
    },
    onImagesChange(e) {
      this.imageFiles = e
    },
    removeImage(index) {
      this.imageFiles.splice(index, 1)
    }
  }
}
</script>
