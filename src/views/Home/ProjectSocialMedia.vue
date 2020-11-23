<template>
  <v-container
    class="h-full py-0"
  >
    <header-component
      class="card-custom-shadow h-auto mb-4 rounded"
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
              {{titlePage}}
              <v-icon class="blue--text text--darken-3">
                mdi-chevron-down
              </v-icon>
            </v-btn>
          </template>
          <template v-if="!postListShow" >
            <v-list dense >
              <v-list-item
                v-for="(item, i) in areas"
                :key="i"
              >
                <v-list-item-title
                  @click="item.function"
                  :class="item.type === 'title' ? 'grey--text' : 'black--text pointer' "
                >
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </template>
        </v-menu>
      </template>
      <template v-slot:input>
        <v-icon size="40" color="primary" v-if="user.profilePic === ''">
          mdi-account-outline
        </v-icon>
        <img
          v-else
          :alt="user.firstName"
          class="mr-1 rounded-circle"
          height="40"
          :src="user.profilePic"
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
          :disabled="postListShow"
        >
          <template v-slot:append>
            <v-row class="align-center d-flex">
              <!--              <v-icon class="blue&#45;&#45;text text&#45;&#45;lighten-1">-->
              <!--                mdi-file-document-outline-->
              <!--              </v-icon>-->
              <v-file-input
                accept="application/msword, application/sql, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf"
                class="align-center blue--text d-flex justify-center ma-0 pa-0 upload-icon"
                hide-input
                multiple
                prepend-icon="mdi-file-document-outline"
                @change="onDocsChange"
                :disabled="postListShow"
              />
              <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                class="align-center blue--text d-flex justify-center ma-0 pa-0 upload-icon"
                hide-input
                multiple
                prepend-icon="mdi-image-outline"
                @change="onImagesChange"
                :disabled="postListShow"
              />
              <!--              <v-icon class="red&#45;&#45;text text&#45;&#45;lighten-1">-->
              <!--                mdi-link-variant-->
              <!--              </v-icon>-->
              <v-btn
                icon
                @click="addActivity"
                :disabled="postListShow"
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
            <template v-if="docsFiles.length > 0">
              <div class="d-flex images-container mx-1 px-0 py-3">
                <div
                  v-for="(doc, index) in docsFiles"
                  :key="'doc-' + index"
                  class="mx-1 relative w-fit"
                >
                  <p>{{doc.name}}</p>
                  <v-btn
                    class="absolute btn-chat-shadow ml-2 right-0 top-0"
                    color="grey lighten-2"
                    fab
                    style="height:15px; width:15px;"
                    @click="removeFile(index)"
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
    <posts-list v-if="!postListShow" />
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
    titlePage: '',
    activityText: '',
    docsFiles: [],
    imageFiles: [],
    posts_list: [{}],
    showSkeletonPost: false
  }),

  props: {
    postListShow: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters('Auth', { user: 'getUser' }),
    srcImageFiles() {
      const srcImages = []
      this.imageFiles.forEach(imageFile => {
        srcImages.push(URL.createObjectURL(imageFile))
      })
      return srcImages
    },
    areas(){
      return [
        { text: 'Private',            type: 'subtitle', function: () => { this.privateState()                }},
        { text: 'Everyone',           type: 'subtitle', function: () => { this.printSc('Everyone')           }},
        { text: 'My company',         type: 'subtitle', function: () => { this.companyState()                }},
        { text: 'Teams',              type: 'title',    function  ()    {                                    }},
        { text: 'All my teams',       type: 'subtitle', function: () => { this.printSc('All my teams')       }},
        { text: 'IT Team XY',         type: 'subtitle', function: () => { this.printSc('IT Team XY')         }},
        { text: 'CPM Team Z',         type: 'subtitle', function: () => { this.printSc('CPM Team Z')         }},
        { text: 'Departments',        type: 'title',    function  ()    {                                    }},
        { text: 'All my departments', type: 'subtitle', function: () => { this.printSc('All my departments') }},
        { text: 'Finances',           type: 'subtitle', function: () => { this.printSc('Finances')           }},
        { text: 'Operations',         type: 'subtitle', function: () => { this.printSc('Operations')         }}
      ]
    },
  },
  methods: {
    ...mapActions('SocialNetworkModule', ['filter_posts']),
    ...mapActions("AppAttachments", { getPostsUrl: "get_post_file_url" }),
    ...mapActions('AppAttachments', {
      setStreamFiles: 'set_stream_attachments'
    }),
    printSc(msg) {
      this.titlePage = `${msg}`;
    },
    onDocsChange(docs){
      docs.forEach(doc => {
        this.docsFiles.push(doc);
      });
    },
    async privateState() {
      this.titlePage = 'Private';
      await this.$store.dispatch('GSFeed/setRoom', 'users');
      await this.$store.dispatch('GSFeed/setFeed', this.user.id);
      this.reloadFeed();
    },
    async companyState() {
      this.titlePage = 'My Company';
      await this.$store.dispatch('GSFeed/setRoom', 'companies');
      await this.$store.dispatch('GSFeed/setCompanyFeed', this.user.id);
      this.reloadFeed();
    },
    addActivity() {
      if (this.activityText.trim() === '') {
        return
      }
      this.showSkeletonPost = true
      let comp = this.user.companies.items.find(item => item.active === true);

      const activity = {
        req:{
          userID: this.user.id,
          data: {
            actor: JSON.stringify({
              created_at:new Date(),
              updated_at:new Date(),
              id: this.user.id,
              data:{
                  image:this.user.profilePic,
                  name:`${this.user.firstName} ${this.user.lastName}`
              }
            }),
            message: this.activityText,
            verb: 'post',
            object: 1,
            images: this.imageFiles
          }
        },
        compID: comp.company.id
      }
      
      this.activityText = ''

      this.$store.dispatch('GSFeed/addActivity', activity).then(async res => {
        if (this.imageFiles.length > 0) {
          this.imageFiles.forEach(async image => {
            await this.setStreamFiles({
              files: image,
              headers: {
                'Content-Type': image['type'],
                'Content-Name': image['name'],
                'Stream-Id': res['data']['results'][0]['id'],
                'Stream-type': 'post'
              }
            });
          });

          let activity = res['data']['results'][0];
          this.getPostsUrl(activity['id']).then( urls => {
            if( typeof activity['actor'] === 'string'){
              activity['actor'] = JSON.parse(activity['actor'])
            }
            
            activity['actor']['data']['name'] = `${this.user.firstName} ${this.user.lastName}`
            activity['actor']['data']['image'] = this.user.profilePic
            activity['images'] = urls;
            
            this.$store.dispatch('GSFeed/updateActivity', activity)
          });
        }

        if ( this.docsFiles.length > 0 ) {
          this.docsFiles.forEach(async file => {
            await this.setStreamFiles({
              files: file,
              headers: {
                'Content-Type': file['type'],
                'Content-Name': file['name'],
                'Stream-Id': res['data']['results'][0]['id'],
                'Stream-type': 'post'
              }
            });
          });

          let activity = res['data']['results'][0];
          this.getPostsUrl(activity['id']).then( urls => {
            if( typeof activity['actor'] === 'string'){
              activity['actor'] = JSON.parse(activity['actor'])
            }
            
            activity['actor']['data']['name'] = `${this.user.firstName} ${this.user.lastName}`
            activity['actor']['data']['image'] = this.user.profilePic
            activity['files'] = urls;
            
            this.$store.dispatch('GSFeed/updateActivity', activity)
          });
        }
        
        this.reloadFeed();
        this.showSkeletonPost = false
      })
    },
    async reloadFeed(){
      await this.$store.dispatch('GSFeed/retrieveFeed')
    },
    onImagesChange(files) {
      files.forEach(file => {
        this.imageFiles.push(file)
      })
      
    },
    removeImage(index) {
      this.imageFiles.splice(index, 1)
    },
    removeFile(index) {
      this.docsFiles.splice(index, 1)
    }
  },
  mounted() {
    this.companyState();
  }
}
</script>
