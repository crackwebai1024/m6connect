<template>
  <div v-if="notification['post']['actor']['data']" @mouseover="showActionBtns = true"
    @click="setPost()"
    @mouseleave="showActionBtns = false" class="actionfeed-content__card relative pointer card-custom-shadow rounded white mb-4 pt-4 px-3 pb-12">
      <div v-if="notification.record" :class="notification.colorTag +' card-content__tag absolute mt-9 white--text d-flex justify-center align-center text-body-1 font-weight-regular'">
        {{ notification.record.app_type }}
      </div>
      <div :class="notification.colorTag +' card-content__tag absolute white--text d-flex justify-center align-center text-body-1 font-weight-regular'">
        {{notification.status}}
      </div>
      <div class="d-flex">
        <v-avatar size="36">
          <v-img :src="notification.post.actor.data.image"></v-img>
        </v-avatar>
        <div class="ml-2">
          <p class="font-weight-bold" style="margin-bottom: -5px;">{{ notification.post.actor.data.name }}</p>
          <span class="leading-tight text-caption grey--text text--darken-1">{{ diffNow(notification.post.actor.created_at) }}</span>
        </div>
      </div>
      <p v-if="notification.record" class="text-body-2 mt-2 mb-3 ml-2 grey--text text--darken-4">{{ notification.post.message }}</p>
      <p v-else class="message-box text-caption black--text pl-3 ml-1 mb-0 d-flex align-center">
        {{ notification.post.message }}
      </p>
      <p v-if="notification.record" :class="notification.colorTag + '--text ' + 'text-body-2 ml-1 mb-0 d-flex align-center'">
        <v-icon :class="notification.colorTag + '--text ' + 'mr-1'">mdi-file-document-outline</v-icon>
        {{ notification.record.title }}
      </p>
      <div v-if="users.length > 0" class="d-flex mt-4 ml-2 align-center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-badge
              v-for="(follower, index) in users" :key="index + 'follower'" style="margin-left:-5px"
              :bordered="follower.status === 'Complete' || follower.status === 'Declined' ? false : true"
              :dark="follower.status === 'Complete' || follower.status === 'Declined' ? false : true"
              top
              :color="follower.status === 'Complete' ? 'green accent-3' : follower.status === 'Declined' ? 'red' :'white black--text'"
              :icon="follower.status === 'Complete' ? 'mdi-check' : follower.status === 'Declined' ? 'mdi-close-circle' : 'mdi-help'"
              offset-x="12"
              offset-y="12"
            >
            <v-avatar size="28">
              <v-img v-if="follower.profilePic !== ''" :src="follower.profilePic"></v-img>
              <v-icon v-else color="light-blue lighten-3">mdi-account</v-icon>
            </v-avatar>
          </v-badge>
        </template>
        <span>Aooo</span>
      </v-tooltip>
      <p v-if="pendingApprovals(users) > 0" class="ml-2 mb-0 text-caption grey--text text--darken-1">
        {{ pendingApprovals(users) }} pending
      </p>
      </div>
      <div class="d-flex feed-btns absolute pa-3 text-caption align-center">
        <p class="mb-0 mr-2"><v-icon size="17">mdi-thumb-up-outline</v-icon> {{ cont('like') }}</p>
        <p class="mb-0 mr-2"><v-icon size="17">mdi-message-outline</v-icon> {{ cont('comment') }}</p>
      </div>
      <div v-if="showActionBtns" class="d-flex action-btns absolute pa-3 text-caption align-center">
        <v-btn @click="updateStatus(false)" icon color="grey">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn @click="updateStatus(true )" icon color="green accent-3">
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
        </v-btn>
      </div>
  </div>
  <v-container v-else>
    <v-progress-circular
      style="margin-left: 45%;"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    notification: {
      type: Object,
      default: () => {}
    },
  },
  data: () => ({
    showActionBtns: false,
    colors: ['green', 'blue', 'red', 'purple', 'orange', 'pink', 'brown', 'light-blue', 'cyan', 'teal', 'amber'],
    users: [],
  }),
  name: "ActionFeed",
  computed: {
  },
  methods: {
    ...mapActions("WorkOrderModule", {
      workOrder: "setWorkOrder",
      getUsers: "getUsersList"
    }),
    ...mapActions("InfoModule", {
      changeDrawer: "change_preview_navigation_drawer",
    }),
    ...mapActions("GSFeed", {
      setActPost: "setActionPost"
    }),
    ...mapActions("GeneralListModule", {recordData: "push_data_to_active"}),
    updateStatus(e){
      this.$store.dispatch('WorkOrderModule/updateActionItem', {
        items: this.notification['wo_assignments'],
        value: e ? 'Complete' : 'Declined'
      }).then(()=>{
        this.workOrder();
      });
    },
    setPost() {
      let { record, colorTag, id } = this.notification;
      
      this.setActPost({
        room: 'work_order',
        id: this.notification.post_id,
        props: {
          id: id,
          record: record,
          colorTag: colorTag,
          wo_assignments: this.users
        }
      });
    },
    diffNow(date) {
      let dateNow = new Date();
      let dateNotification = new Date(date);
      let diff =(dateNow.getTime() - dateNotification.getTime()) / 1000;
      let seconds = Math.abs(Math.floor(diff % 60));
      diff = (diff - seconds) / 60;
      let minutes = Math.abs(Math.floor(diff % 60));
      diff = (diff - minutes) / 60;
      let hours = Math.abs(Math.floor(diff % 24));
      diff = (diff - hours) / 24;
      let days = Math.abs(Math.floor(diff % 30));
      return days + ' days, ' + hours + ' hours, ' + minutes +' minutes, ' + seconds + ' seconds';
    },
    pendingApprovals(approvals) {
      let pendingApprovals = 0 ;
      approvals.forEach(element => {
        if(element.status === 'Pending') pendingApprovals++
      });
      
      return pendingApprovals;
    },
    cont(item) {
      return this.$h.dg(this.notification.post, `reaction_counts.${ item }`, '0');
    },
    getColorTag() {
      return this.colors[ Math.floor(Math.random() * 10) ];
    }
  },
  watch: {
    notification: function (val) {
      if(!this.notification['post']['actor']['data']){
        this.notification['post']['actor'] = JSON.parse(this.notification['post']['actor']);
      }
      this.notification['colorTag'] = this.getColorTag();
      
      if (val.wo_assignments && val.wo_assignments.length > 0) {
        let localUsers = [];
        val.wo_assignments.forEach(assign => {
          localUsers.push(assign.assignee)
        });
        
        this.getUsers(localUsers).then(res => {
          this.users = res.data
        });
      }
    }
  },
  created() {
    if(!this.notification['post']['actor']['data']){
      this.notification['post']['actor'] = JSON.parse(this.notification['post']['actor']);
    }
    this.notification['colorTag'] = this.getColorTag();
  },
  mounted() {
    if(!this.notification['post']['actor']['data']){
      this.notification['post']['actor'] = JSON.parse(this.notification['post']['actor']);
    }

    if (this.notification.wo_assignments && this.notification.wo_assignments.length > 0) {
      let localUsers = [];
      this.notification.wo_assignments.forEach(assign => {
        this.users.push({
          status: assign.status,
          actionId: assign.id
        });
        localUsers.push(assign.assignee)
      });
      
      this.getUsers(localUsers).then(res => {
        res.data.forEach((user, ind) => {
          let info = [user, this.users[ind]];
          this.users[ind] = Object.assign(...info);
        })
      });
    }
  }
};
</script>