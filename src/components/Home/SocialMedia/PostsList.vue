<template>
  <v-container
    class="px-0 py-0"
    style="margin-bottom: 80px;"
  >
    <post-item
      v-if="Object.keys(actionPost).length > 0"
      :data="actionPost"
    >
      <template v-slot:record>
        <p v-if="actionPost.props.record" @click="setRecord(actionPost.props.record)" :class="actionPost.props.colorTag + '--text ' + 'text-body-2 pointer ml-1 mb-0 d-flex align-center my-5'">
          <v-icon :class="actionPost.props.colorTag + '--text ' + 'mr-1'">mdi-file-document-outline</v-icon>
          {{ actionPost.props.record.title }}
        </p>
      </template>
      <template v-slot:assignments>
        <div class="my-5"></div>
        <v-badge
          v-for="(follower, index) in actionPost.props.wo_assignments" :key="index + 'follower'" style="margin-left:-5px"
          :bordered="follower.review ? false : true"
          :dark="follower.review ? false : true"
          top
          :color="follower.review ? 'green accent-3' : 'white black--text'"
          :icon="follower.review ? 'mdi-check' : 'mdi-help'"
          offset-x="12"
          offset-y="12"
        >
          <v-avatar size="28">
            <v-img v-if="follower.profilePic !== ''" :src="follower.profilePic"></v-img>
            <v-icon v-else color="light-blue lighten-3">mdi-account</v-icon>
          </v-avatar>
        </v-badge>
      </template>
    </post-item>
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
      actionPost: 'getActionPost',
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
    ...mapActions("GeneralListModule", { recordData:    "push_data_to_active"               }),
    ...mapActions("InfoModule",        { changeDrawer:  "change_preview_navigation_drawer"  }),
    successCallback: () => {
      return true
    },
    failCallback: data => {
      return false
    },
    setRecord(record){
      this.recordData(record);
      this.changeDrawer(true);
    },
  },
  mounted() {
    this.feedNotification.get().then(res => {});
    this.feedNotification.subscribe(data => {
      if (data.new.length > 0) {
        let newReaction = data.new[0]['object'];
        let objectIndex = this.timeline.indexOf( this.timeline.filter((e) => { return e.id === newReaction['id']})[0] );

        if (this.timeline[objectIndex].reaction_counts.like == 0) {
          this.timeline[objectIndex]['own_reactions']['like'] = [];
        }
        this.timeline[objectIndex]['own_reactions']['like'].push(newReaction);
        this.timeline[objectIndex].reaction_counts.like ++;
      }
      if (data.deleted.length > 0) {
      }
    });
  }
}
</script>
