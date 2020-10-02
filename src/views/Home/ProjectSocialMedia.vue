<template>
  <v-container class="h-full px-3 py-0">
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
          @keyup.enter="filter_posts(['author', 1])"
        >
          <template v-slot:append>
            <v-row class="align-center d-flex">
              <!--              <v-icon class="blue&#45;&#45;text text&#45;&#45;lighten-1">-->
              <!--                mdi-file-document-outline-->
              <!--              </v-icon>-->
              <!--              <v-icon class="lime&#45;&#45;text mx-1 text&#45;&#45;darken-1">-->
              <!--                mdi-image-->
              <!--              </v-icon>-->
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
        </v-text-field>
      </template>
    </header-component>
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
    posts_list: [{}]
  }),
  computed: {
    ...mapGetters('Auth', { user: 'getUser' })
  },
  methods: {
    ...mapActions('SocialNetworkModule', ['filter_posts']),
    addActivity() {
      if (this.activityText.trim() === '') {
        return
      }
      const activity = {
        message: this.activityText,
        verb: 'post',
        object: 1
      }
      this.$store.dispatch('GSFeed/addActivity', activity).then(() => {
        this.activityText = ''
      })
    }
  }
}
</script>
