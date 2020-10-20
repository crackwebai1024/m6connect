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
      feedNotification: 'getFeedNotification',
      timeline: 'getTimeline',
      feed: 'getFeed'
    }),
    ...mapGetters('Auth', { user: 'getUser' })
  },
  async created() {
    this.set_user_data()
    this.set_posts_data()
    await this.$store.dispatch('GSFeed/retrieveFeed')

    this.feed.subscribe(async data => {
      if (data.new) {
        await this.$store.dispatch('GSFeed/retrieveFeed')
      }
    })
  },
  methods: {
    ...mapActions('SocialNetworkModule', ['set_posts_data']),
    ...mapActions(['set_user_data']),
    successCallback: () => {
      console.log('now listening to changes in realtime');
    },
    failCallback: data => {
      alert('something went wrong, check the console logs');
      console.log(data);
    }
  },
  mounted() {
    this.feedNotification.get().then(res => {});
    this.feedNotification.subscribe(data => {
      if (data.new.length > 0) {
        // Aqui se agrega una reaccion :DD
        let newReaction = data.new[0]['object'];
        let objectIndex = this.timeline.indexOf( this.timeline.filter((e) => { return e.id === newReaction['id']})[0] );

        if (this.timeline[objectIndex].reaction_counts.like == 0) {
          this.timeline[objectIndex]['own_reactions']['like'] = [];
        }
        this.timeline[objectIndex]['own_reactions']['like'].push(newReaction);
        this.timeline[objectIndex].reaction_counts.like ++;
      }
      if (data.deleted.length > 0) {
        // Aqui se elimina una reaccion :DD
      }
    });
  }
}
</script>
