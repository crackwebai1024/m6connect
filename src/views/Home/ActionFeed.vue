<template>
  <div v-if="!loading" class="transparent px-4 vertical-scroll dont-show-scroll h-full w-side">
    <div class="pl-3 mt-4 mb-1 d-flex justify-space-between align-center">
      <p class="font-weight-bold mb-0">Action Feed</p>
      <div class="d-flex align-center">
        <v-menu transition="slide-y-transition" offset-y bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="0" class="capitalize mb-0 px-0 pl-1 transparent purple--text text--darken-1 font-weight-bold" v-bind="attrs" v-on="on">
              {{filterTag.value}}
              <v-icon class="blue--text text--darken-3">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item v-for="(item, i) in areas" :key="i">
              <v-list-item-title
                @click="item.function"
                :class="item.type == 'title' ? 'grey--text' : 'black--text pointer'"
              >{{ item.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn icon color="grey darken-4" @click="showSearchInputFunction">
          <v-icon class="grey--text text--darken-2">mdi-magnify</v-icon>
        </v-btn>
      </div>
    </div>
    <input ref="searchInput" v-show="showSearchInput" v-model="searchInput" class="search-input" type="text" placeholder="Start Typing to Search" />
    
    <action-feed-item v-for="(notification, index) in filteredNotifications.filter((e, i) => i < currentIndex)" :key="'notification-'+index" :notification="notification"/>
    <infinite-loading
      infinite-scroll-disabled="busy"
      @infinite="infiniteHandler" :identifier="filteredNotifications">
      <div slot="spinner"></div>
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
    <div v-if="filteredNotifications.length === 0">No results found</div>
  </div>
  <v-container v-else class="transparent px-4 vertical-scroll dont-show-scroll h-full w-side">
    <v-progress-circular
      style="margin-left: 45%;"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </v-container>
</template>

<script>
import ActionFeedItem from './ActionFeedItem'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    ActionFeedItem
  },
  data: () => ({
    busy: false,
    currentIndex: 0,
    loading: true,
    user:{},
    showSearchInput: false,
    searchInput: '',
    showActionBtns: false,
    // action feed data 
    notifications: [ ],
    status: [],
  }),
  name: "ActionFeed",
  computed: {
    ...mapGetters('Auth',            { cUser:   'getUser'       }),
    ...mapGetters('WorkOrderModule', { actFeed: 'getActionFeed', filterTag: 'getFilter' }),
    areas() {
      return [
        { text: "Everyone",           type: "subtitle", function: () => { this.setFilterTag({key: 'everyone',        value: 'Everyone'           }); this.workOrder()}},
        { text: "My company",         type: "subtitle", function: () => { this.setFilterTag({key: 'company',         value: 'My company'         }); this.workOrder()}},
        { text: "Records",            type: "title",    function: () => {                                                                                            }},
        { text: "All Apps",           type: "subtitle", function: () => { this.setFilterTag({key: 'all_apps',        value: 'All Apps'           }); this.workOrder()}},
        { text: "ITApps",             type: "subtitle", function: () => { this.setFilterTag({key: 'itapps',          value: 'ITApps'             }); this.workOrder()}},
        { text: "Teams",              type: "title",    function: () => {                                                                                            }},
        { text: "All my teams",       type: "subtitle", function: () => { this.setFilterTag({key: 'all_teams',       value: 'All my teams'       }); this.workOrder()}},
        { text: "IT Team XY",         type: "subtitle", function: () => { this.setFilterTag({key: 'it_team_xy',      value: 'IT Team XY'         }); this.workOrder()}},
        { text: "CPM Team Z",         type: "subtitle", function: () => { this.setFilterTag({key: 'cpm_team_z',      value: 'CPM Team Z'         }); this.workOrder()}},
        { text: "Departments",        type: "title",    function: () => {                                                                                            }},
        { text: "All my departments", type: "subtitle", function: () => { this.setFilterTag({key: 'all_departments', value: 'All my departments' }); this.workOrder()}},
        { text: "Finances",           type: "subtitle", function: () => { this.setFilterTag({key: 'finances',        value: 'Finances'           }); this.workOrder()}},
        { text: "Operations",         type: "subtitle", function: () => { this.setFilterTag({key: 'operations',      value: 'Operations'         }); this.workOrder()}}
      ]
    },
    filteredNotifications() {
      return this.actFeed.filter( notification => {
        if (typeof notification.post.actor.data === 'object') {
          return notification.post.actor.data.name.toUpperCase().trim().indexOf(this.searchInput.toUpperCase().trim()) !== -1
          || notification.description.toUpperCase().trim().indexOf(this.searchInput.toUpperCase().trim()) !== -1;
        }
        
        return notification.description.toUpperCase().trim().indexOf(this.searchInput.toUpperCase().trim()) !== -1;
      });
    },
  },
  methods: {
    ...mapActions( 'WorkOrderModule' , {
      workOrder:  'setWorkOrder',
      setFilterTag: 'setWorkFilter'
    }),
    ...mapActions("ITAppsModule", {
      select: "get_selects"
    }),
    infiniteHandler($state) {
      this.busy = true;
      setTimeout(() => {
        if(this.currentIndex < this.filteredNotifications.length){
          this.currentIndex ++;
          $state.loaded();
        }else{
          $state.complete();
        }
        this.busy = false;
      }, 100);
    },
    showSearchInputFunction() {
      this.showSearchInput = !this.showSearchInput
      this.$nextTick(() => this.$refs.searchInput.focus())
    }
  },
  watch: {
    cUser: function (val) {
      this.user = val;
      this.loading = true;
      this.workOrder().then(() => {
        this.loading = false;
      });
    },
    actFeed: function(val) {
      this.currentIndex = 0;
    }
  },
  mounted(){
    this.setFilterTag({key: 'everyone', value: 'Everyone'});
    this.user = this.cUser;
    this.select('/wo_status').then(res => {
      this.status = res.data;
    });
    this.workOrder().then(() => {
      this.loading = false;
    });
  },
};
</script>

<style lang="scss">
  .card-content__tag {
    z-index: 0;
    top: 0px;
    right: 0;
    padding: 0 16px;
    height: 34px;
    border-radius: 0px 4px;
  }
  .feed-btns {
    bottom: 0;
    left: 0;
  }
  .action-btns {
    bottom: 0;
    right: 0;
  }
  .message-box {
    border-left: 2px solid grey;
  }
</style>