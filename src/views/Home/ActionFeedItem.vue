<template>
    <div @mouseover="showActionBtns = true"
      @mouseleave="showActionBtns = false" class="actionfeed-content__card relative card-custom-shadow rounded white mb-4 pt-4 px-3 pb-12">
      <div :class="notification.colorTag +' card-content__tag absolute white--text d-flex justify-center align-center text-body-1 font-weight-regular'">
        {{ notification.typeContent }}
      </div>
      <div class="d-flex">
        <v-avatar size="36">
          <v-img :src="notification.userFrom.imgSrc"></v-img>
        </v-avatar>
        <div class="ml-2">
          <p class="font-weight-bold" style="margin-bottom: -5px;">{{ notification.userFrom.name }}</p>
          <span class="leading-tight text-caption grey--text text--darken-1">{{ notification.userFrom.title }} -  {{ diffNow(notification.date) }}</span>
        </div>
      </div>
      <p class="text-body-2 mt-2 mb-3 ml-2 grey--text text--darken-4">{{ notification.textContent }}</p>
      <p v-if="notification.notificationType === 'document'" :class="notification.colorTag + '--text ' + 'text-body-2 ml-1 mb-0 d-flex align-center'">
        <v-icon :class="notification.colorTag + '--text ' + 'mr-1'">mdi-file-document-outline</v-icon>
        {{ notification.message }}
      </p>
      <p v-if="notification.notificationType === 'message'" class="message-box text-caption black--text pl-3 ml-1 mb-0 d-flex align-center">
        {{ notification.message }}
      </p>
      <div v-if="notification.notificationType !== 'message'" class="d-flex mt-4 ml-2 align-center">
        <v-badge
          v-for="(follower, index) in notification.followers" :key="index + 'follower'" style="margin-left:-5px"
          :bordered="follower.review ? false : true"
          :dark="follower.review ? false : true"
          top
          :color="follower.review ? 'green accent-3' : 'white black--text'"
          :icon="follower.review ? 'mdi-check' : 'mdi-help'"
          offset-x="12"
          offset-y="12"
        >
          <v-avatar size="28">
            <v-img :src="follower.imgSrc"></v-img>
          </v-avatar>
        </v-badge>
        <p v-if="pendingApprovals(notification.followers) > 0" class="ml-2 mb-0 text-caption grey--text text--darken-1">
          {{ pendingApprovals(notification.followers) }} pending
        </p>
      </div>
      <div v-if="notification.notificationType !== 'message'" class="d-flex feed-btns absolute pa-3 text-caption align-center">
        <p class="mb-0 mr-2"><v-icon size="17">mdi-thumb-up-outline</v-icon> {{ notification.likes }}</p>
        <p class="mb-0 mr-2"><v-icon size="17">mdi-message-outline</v-icon> {{ notification.comments }}</p>
        <p class="mb-0 mr-2"><v-icon size="17">mdi-share</v-icon> {{ notification.shared }}</p>
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
export default {
  props: {
    notification: Object,
  },
  data: () => ({
    showActionBtns: false,
  }),
  name: "ActionFeed",
  computed: {
  },
  methods: {
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
    }
  }
};
</script>