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
              <v-menu
                open-on-hover
                bottom
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-file-plus-outline</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-file-input
                      accept="application/msword, application/sql, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf"
                      class="align-center blue--text d-flex justify-center ma-0 pa-0 upload-icon"
                      hide-input
                      multiple
                      prepend-icon="mdi-file-document-outline"
                      @change="onDocsChange"
                      :disabled="postListShow"
                    />
                  </v-list-item>
                  <v-list-item>
                    <v-file-input
                      accept="image/png, image/jpeg, image/bmp"
                      class="align-center blue--text d-flex justify-center ma-0 pa-0 upload-icon"
                      hide-input
                      multiple
                      prepend-icon="mdi-image-outline"
                      @change="onImagesChange"
                      :disabled="postListShow"
                    />
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                bottom
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-file-table-box-multiple-outline</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-select
                      v-model="itemInfo.application_id"
                      item-text="title"
                      item-value="id"
                      :items="availableApps"
                      label="Application"
                      @change="changeApp($event)"
                    />
                  </v-list-item>
                  <v-list-item>
                    <v-select
                      v-model="itemInfo.record_id"
                      :class="{ disabled: itemInfo.application_id === null }"
                      :item-value="Object"
                      :items="options.records"
                      label="Record"
                      @change="selectRecord($event)"
                    >
                      <template
                        slot="selection"
                        slot-scope="data"
                      >
                        <!-- HTML that describe how select should render selected items -->
                        {{ data.item.record_number }} - {{ data.item.title }}
                      </template>
                      <template
                        slot="item"
                        slot-scope="data"
                      >
                        <!-- HTML that describe how select should render items when the select is open -->
                        {{ data.item.record_number }} - {{ data.item.title }}
                      </template>
                    </v-select>
                  </v-list-item>
                  <v-list-item>
                    <v-select
                      v-model="itemInfo.panel"
                      :class="{ disabled: itemInfo.application_id === null }"
                      :item-value="Object"
                      item-text="label"
                      :items="options.panles"
                      label="Panel"
                      @change="selectPanel($event)"
                    />
                  </v-list-item>
                </v-list>
              </v-menu>
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
    menu: false,
    activityText: '',
    docsFiles: [],
    imageFiles: [],
    posts_list: [{}],
    urlInfo: {},
    itemInfo: {
      application_id: null,
      record_id: null,
      panel: null
    },
    showSkeletonPost: false,
    options: {
      records: [],
      panles: [],
      type: []
    },
    availableApps: [],
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
    ...mapActions('WorkOrderModule', {
      getApps: 'getAvailableApps',
      getActions: 'getActionsFeed'
    }),
    ...mapActions('AppBuilder', {
      getFieldValues: 'getFieldValuesPerPanel'
    }),
    changeApp(event) {
      this.getActions(event).then(response => {
        this.options['records'] = response.data
      });
    },
    async selectRecord($event){
      let panel = [];
      this.itemInfo['panel'] = null;
      this.options['panles'] = [];

      let app = await this.$store.dispatch('AppBuilder/getApp', $event['app']['id']);
      
      app['tabs'].forEach(tab => {
        tab.panels.forEach(panel => {
          this.options['panles'].push({
            id: $event['id'],
            recordTitle: $event.title,
            label: `${tab['title']} - ${panel['title']}`,
            panelTitle: panel['title'],
            fields: panel['fields'],
            panelId: panel['id'],
            subtitle: $event.app.title,
            image: $event.app.iconLink,
            description: $event.description
          });
        });
      });
    },
    async selectPanel($event){
      let values = await this.getFieldValues({ recordID: $event['id'], panelID: $event['panelId'] });
      
      let panel = [];

      $event['fields'].forEach( field => {
        panel.push({name:field.label, value: values['values'][field.id]} );
      });

      this.urlInfo = {
        url: `${new URL(location.href)['href']}record/${$event.id}`,
        id: $event.id,
        panel: panel,
        description: $event['description'],
        panel_title: $event['panelTitle'],
        subtitle: $event['subtitle'],
        title: $event['recordTitle'],
        image: $event['image']
      }
      this.menu = false;
    },
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
            record_url: this.urlInfo,
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
        this.urlInfo = {};
        this.itemInfo.application_id = null;
        this.itemInfo.record_id = null;
        this.itemInfo.panel = null;
        this.showSkeletonPost = false;
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

    this.getApps().then(response => {
      response.data.map(app => {
        this.availableApps.push({
          id: app.id,
          title: app.title
        })
      })
    });
  }
}
</script>
