<template>
  <div @mouseover="showActionBtns = true"
    @mouseleave="showActionBtns = false" class="actionfeed-content__card relative card-custom-shadow rounded white mb-4 pt-4 px-3 pb-12">
      <div v-if="notification.record" :class="'blue' +' card-content__tag absolute white--text d-flex justify-center align-center text-body-1 font-weight-regular'">
        {{ notification.record.app_type }}
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
      <p class="text-body-2 mt-2 mb-3 ml-2 grey--text text--darken-4">{{ notification.post.message }}</p>
      <p v-if="notification.record" :class="notification.colorTag + '--text ' + 'text-body-2 ml-1 mb-0 d-flex align-center'">
        <v-icon :class="notification.colorTag + '--text ' + 'mr-1'">mdi-file-document-outline</v-icon>
        {{ notification.record.title }}
      </p>
      <div v-if="users.length > 0" class="d-flex mt-4 ml-2 align-center">
      <v-badge
        v-for="(follower, index) in users" :key="index + 'follower'" style="margin-left:-5px"
        :bordered="follower.review ? false : true"
        :dark="follower.review ? false : true"
        top
        :color="follower.review ? 'green accent-3' : 'white black--text'"
        :icon="follower.review ? 'mdi-check' : 'mdi-help'"
        offset-x="12"
        offset-y="12"
      > 
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar size="28">
              <v-img v-if="follower.profilePic !== ''" :src="follower.profilePic"></v-img>
              <v-icon v-else color="light-blue lighten-3">mdi-account</v-icon>
            </v-avatar>
          </template>
          <span>Aooo</span>
        </v-tooltip>
      </v-badge>
      <p v-if="pendingApprovals(users) > 0" class="ml-2 mb-0 text-caption grey--text text--darken-1">
        {{ pendingApprovals(users) }} pending
      </p>
      </div>
      <div class="d-flex feed-btns absolute pa-3 text-caption align-center">
        <p class="mb-0 mr-2"><v-icon size="17">mdi-thumb-up-outline</v-icon> {{ cont('likes') }}</p>
        <p class="mb-0 mr-2"><v-icon size="17">mdi-message-outline</v-icon> {{ cont('comment') }}</p>
      </div>
      <div v-if="showActionBtns" class="d-flex action-btns absolute pa-3 text-caption align-center">
        <v-btn icon color="grey">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn icon color="green accent-3">
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
        </v-btn>
      </div>
  </div>
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
    users: [],
  }),
  name: "ActionFeed",
  computed: {
  },
  methods: {
    ...mapActions("WorkOrderModule", {
      getUsers: "getUsersList"
    }),
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
        if(!element.review) pendingApprovals++
      });
      
      return pendingApprovals;
    },
    cont(item) {
      return this.$h.dg(this.notification.post, `reaction_counts.${ item }`, '0');
    },
  },
  created() {
    this.notification['post']['actor'] = JSON.parse(this.notification['post']['actor']);
  },
  mounted() {
    if (this.notification.wo_assignments && this.notification.wo_assignments.length > 0) {
      let localUsers = [];
      this.notification.wo_assignments.forEach(assign => {
        localUsers.push(assign.assignee)
      });
      
      this.getUsers(localUsers).then(res => {
        this.users = res.data
      });
    }
  }
};
</script>