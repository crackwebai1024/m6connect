<template>
  <v-container
    class="px-0 py-0"
    style="margin-bottom: 80px;"
  >
    <post-item
      v-for="(item, index) of timeline"
      :key="index"
      :data="item"
    />
  </v-container>
</template>

<script>
import PostItem from './PostItem'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PostsList',
  components: {
    PostItem
  },
  data: () => ({

  }),
  computed: {
    ...mapGetters('SocialNetworkModule', ['get_filter_data']),
    ...mapGetters('GSFeed', {
      timeline: 'getTimeline',
      feed: 'getFeed'
    }),
    ...mapGetters('Auth', { user: 'getUser' })
  },
  async created() {
    this.set_user_data()
    this.set_posts_data()
    await this.$store.dispatch('GSFeed/retrieveFeed')
    this.feed.get({ limit: 5, offset: 5 }).then(res => console.log(res))

    this.feed.subscribe(data => {
      console.log("here it is")
      if (data.new) {
        console.log("new data")
        this.$store.dispatch('GSFeed/pushActivity', data.new)
      }
      console.log("here it is")
    })
  },
  methods: {
    ...mapActions('SocialNetworkModule', ['set_posts_data']),
    ...mapActions(['set_user_data']),

  }
}
</script>
