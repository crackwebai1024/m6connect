<template>
  <div class="actionfeed-content transparent px-4 vertical-scroll dont-show-scroll h-full">
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
            <v-list-item v-for="(item, i) in areas" :key="i" style="height: 15px;">
              <v-list-item-title
                :class="item.type == 'title' ? 'grey--text' : 'black--text'"
              >{{ item.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-icon size="28" class="ml-2">mdi-magnify</v-icon>
      </div>
    </div>
    <div v-for="(notification, index) in notifications" :key="'notification-'+index" class="actionfeed-content__card relative card-custom-shadow rounded white mb-4 pt-4 px-3 pb-12">
      <div :class="notification.colorTag +' card-content__tag absolute white--text d-flex justify-center align-center text-body-1 font-weight-regular'">
        {{ notification.typeContent }}
      </div>
      <div class="d-flex">
        <v-avatar size="36">
          <v-img :src="notification.userFrom.imgSrc"></v-img>
        </v-avatar>
        <div class="ml-2">
          <p class="font-weight-bold" style="margin-bottom: -5px;">{{ notification.userFrom.name }}</p>
          <span class="text-caption grey--text text--darken-1">{{ notification.userFrom.title }} -  {{ diffNow(notification.date) }}</span>
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
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    // action feed data 
    notifications: [
      {
        userFrom: {
          name: 'Username M. Johnson',
          title: 'Project Manager',
          imgSrc: 'https://cdn.vuetifyjs.com/images/john.jpg',
        },
        typeContent: 'CPM',
        colorTag: 'blue',
        textContent: 'This is the budget for next year. Please Review.',
        message: 'Elevator Modernization All Hospital.cpm.bdg',
        date: 1600475840821,
        notificationType: 'document',
        likes: 157,
        comments: 14,
        shared: 4,
        reviewed: true,
        followers: [
          {
            review: true,
            imgSrc: 'https://cdn.vuetifyjs.com/images/john.jpg',
          },
          {
            review: true,
            imgSrc: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          },
          {
            review: false,
            imgSrc: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          },
        ],
      },
      {
        userFrom: {
          name: 'John X. Smith',
          title: 'IT Manager',
          imgSrc: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
        },
        typeContent: 'PPL',
        colorTag: 'yellow darken-2',
        textContent: 'John X. Smith wants to connect with you!',
        message: "Hey! it's John from IT, how's it going? Let's chat and discuss this new awesome platform!",
        date: 1600747932248,
        notificationType: 'message',
        likes: 157,
        comments: 14,
        shared: 4,
      },
      {
        userFrom: {
          name: 'Sally Ackerman',
          title: 'IT Analyst',
          imgSrc: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        },
        typeContent: 'ITA',
        colorTag: 'red',
        textContent: 'We are doing rationalization and need your approval.',
        message: 'Awesome IT Application.ita',
        date: 1600475840821,
        notificationType: 'document',
        likes: 97,
        comments: 1,
        shared: 2,
        reviewed: true,
        followers: [
          {
            review: true,
            imgSrc: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          },
          {
            review: true,
            imgSrc: 'https://cdn.vuetifyjs.com/images/john.jpg',
          },
          {
            review: true,
            imgSrc: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          },
          {
            review: false,
            imgSrc: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          },
          {
            review: false,
            imgSrc: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          },
        ],
      },
      {
        userFrom: {
          name: 'Robert Perez',
          title: 'HR Manager',
          imgSrc: 'https://cdn.vuetifyjs.com/images/john.jpg',
        },
        typeContent: 'CPM',
        colorTag: 'cyan',
        textContent: 'Please read the September company announcement. Reading acknowledgement is required for all employees.',
        message: 'Company Announcement September.ann',
        date: 1600475840821,
        notificationType: 'document',
        likes: 2498,
        comments: 29,
        shared: 18,
        reviewed: true,
        followers: [
          {
            review: true,
            imgSrc: 'https://cdn.vuetifyjs.com/images/john.jpg',
          },
          {
            review: true,
            imgSrc: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          },
          {
            review: true,
            imgSrc: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          },
          {
            review: true,
            imgSrc: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          },
        ],
      },
    ],
    showLinks: false,
    departmentsLinks: [
      { url:'', icon:'chart-pie', title: 'Information Technology' },
      { url:'', icon:'cookie', title: 'Supply Chain' },
      { url:'', icon:'shield-half-full', title: 'Capital Projects' },
      { url:'', icon:'earth', title: 'Request for Proposal' },
      { url:'', icon:'alert', title: 'Contracts' },
      { url:'', icon:'asterisk', title: 'Forensics' },
      { url:'', icon:'biohazard', title: 'BioMed' }
    ],
    cardsList: [
      { imgSrc:'', title: 'Cool Title', description: 'Lorem ipsum dolor sit amet, consetetus sadipscing elitr, sed.'},
      { imgSrc:'', title: 'Cool Title', description: 'Lorem ipsum dolor sit amet, consetetus sadipscing elitr, sed.' }
    ],
    areas: [
      { text: "Everyone", type: "subtitle" },
      { text: "My company", type: "subtitle" },
      { text: "Teams", type: "title" },
      { text: "All my teams", type: "subtitle" },
      { text: "IT Team XY", type: "subtitle" },
      { text: "CPM Team Z", type: "subtitle" },
      { text: "Departments", type: "title" },
      { text: "All my departments", type: "subtitle" },
      { text: "Finances", type: "subtitle" },
      { text: "Operations", type: "subtitle" },
    ],
  }),
  name: "ActionFeed",
  computed: {
    showLinksMessage: function() {
      return this.showLinks ? 'Less' : 'More'
    },
    iconShowLinks: function()  {
      return this.showLinks ? 'up' : 'down'
    },
    heightShowLinksDiv: function() {
      return (this.departmentsLinks.length * 48) + 'px'
    }
  },
  methods: {
    toogleLinks() {
      this.showLinks = !this.showLinks
      let linksdiv = this.$refs.showLinksDiv
      this.showLinks ? linksdiv.style.height = this.heightShowLinksDiv : linksdiv.style.height = "150px"
    },
    diffNow(date) {
      let dateNow = new Date();
      let dateNotification = new Date(date);
      let diff =(dateNow.getTime() - dateNotification.getTime()) / 1000;
      let seconds = Math.abs(Math.round(diff % 60));
      diff = (diff - seconds) / 60;
      let minutes = Math.abs(Math.round(diff % 60));
      diff = (diff - minutes) / 60;
      let hours = Math.abs(Math.round(diff % 24));
      diff = (diff - hours) / 24;
      let days = Math.abs(Math.round(diff % 30));
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

<style lang="scss">
  .actionfeed-content {
    width: 440px;
  }
  .actionfeed-content__card {
    // min-height: 223px;
  }
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
  .message-box {
    border-left: 2px solid grey;
  }
</style>