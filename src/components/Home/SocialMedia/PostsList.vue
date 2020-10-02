<template>
  <v-container class="px-0 py-0">
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

    // This is for demo
    if (this.user.id !== 'af754c91-d327-4d66-a031-814d37540e0d') {
      this.feed.follow('users', 'af754c91-d327-4d66-a031-814d37540e0d')
    }

    this.feed.subscribe(data => {
      if (data.new) {
        this.$store.dispatch('GSFeed/pushActivity', data.new)
      }
    })
  },
  methods: {
    ...mapActions('SocialNetworkModule', ['set_posts_data']),
    ...mapActions(['set_user_data'])

  }
}
</script>
