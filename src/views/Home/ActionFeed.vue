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
    <action-feed-item v-for="(notification, index) in notifications" :key="'notification-'+index" :notification="notification"/>
  </div>
</template>

<script>
import ActionFeedItem from './ActionFeedItem'
export default {
  components: {
    ActionFeedItem,
  },
  data: () => ({
    showActionBtns: false,
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
  },
  methods: {
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
  .action-btns {
    bottom: 0;
    right: 0;
  }
  .message-box {
    border-left: 2px solid grey;
  }
</style>