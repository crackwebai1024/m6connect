<template>
  <div v-if="!loading" class="transparent px-4 vertical-scroll dont-show-scroll h-full w-side">
    <div class="pl-3 mt-4 mb-1 d-flex justify-space-between align-center">
      <p class="font-weight-bold mb-0">Action Feed</p>
      <div class="d-flex align-center">
        <v-menu transition="slide-y-transition" offset-y bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="0" class="capitalize mb-0 px-0 pl-1 transparent purple--text text--darken-1 font-weight-bold" v-bind="attrs" v-on="on">
              All Apps
              <v-icon class="blue--text text--darken-3">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item v-for="(item, i) in areas" :key="i">
              <v-list-item-title
                :class="item.type == 'title' ? 'grey--text' : 'black--text'"
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
    
    <action-feed-item v-for="(notification, index) in filteredNotifications" :key="'notification-'+index" :notification="notification"/>
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
    loading: true,
    user:{},
    showSearchInput: false,
    searchInput: '',
    showActionBtns: false,
    // action feed data 
    notifications: [ ],
    areas: [
      { text: "Everyone",           type: "subtitle" },
      { text: "My company",         type: "subtitle" },
      { text: "Teams",              type: "title"    },
      { text: "All my teams",       type: "subtitle" },
      { text: "IT Team XY",         type: "subtitle" },
      { text: "CPM Team Z",         type: "subtitle" },
      { text: "Departments",        type: "title"    },
      { text: "All my departments", type: "subtitle" },
      { text: "Finances",           type: "subtitle" },
      { text: "Operations",         type: "subtitle" },
    ],
  }),
  name: "ActionFeed",
  computed: {
    ...mapGetters('Auth', { cUser: 'getUser' }),
    filteredNotifications() {
      return this.notifications.filter( notification => {
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
      workOrder: 'getWorkOrder'
    }),
    showSearchInputFunction() {
      this.showSearchInput = !this.showSearchInput
      this.$nextTick(() => this.$refs.searchInput.focus())
    }
  },
  watch: {
    cUser: function (val) {
      this.user = val;
      this.workOrder(this.user.id).then(res => {
        this.notifications = res;
        this.loading = false;
      });
    },
  },
  mounted(){
    this.user = this.cUser;
    this.workOrder(this.user.id).then(res => {
      this.notifications = res;
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