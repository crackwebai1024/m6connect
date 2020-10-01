<template>
  <v-app>
    <template v-if="loggedIn && !$route.meta.public">
      <top-nav />
      <v-row no-gutters class="central-content top-60 relative w-full flex flex-nowrap grey lighten-3 justify-space-between">
        <action-feed v-show="showSidePanels" />
        <!-- Home / Company Profile -->
        <router-view />
        <m6-chat v-show="showSidePanels" />
      </v-row>
      <!-- Preview overlay -->
      <chat-wrapper />
      <general-overlay />
    </template>
    <template v-else>
      <router-view />
    </template>
  </v-app>
</template>

<script>
import TopNav from '@/views/Home/TopNav'
import ActionFeed from '@/views/Home/ActionFeed'
import M6Chat from '@/components/Home/M6Chat'
import ChatWrapper from '@/components/Home/M6Chat/ChatWrapper'
import GeneralOverlay from '@/components/Shared/GeneralOverlay'
import { mapState, mapGetters } from 'vuex'
// mapActions
export default {
  name: 'App',
  components: {
    TopNav,
    ActionFeed,
    M6Chat,
    ChatWrapper,
    GeneralOverlay
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapState(['layout']),
    ...mapGetters('Auth', {
      loggedIn: 'loggedIn'
    }),
    ...mapState('PageControl', {
      showSidePanels: 'showSidePanels'
    })
  },
  // methods: {
  //   ...mapActions('Auth', {
  //     searchForToken: 'searchForToken'
  //   })
  // },
  // mounted() {
  //   this.searchForToken()
  // },

};
</script>

<style>
  .max-w-none {
    max-width: none;
  }
  #app {
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
  }
  * {
    color: var(--v-secondary-lighten1);
  }
  .central-content {
    height: calc(100vh - 60px);
  }
</style>
