<template>
  <v-app id="complete-app" >
    <div class="grey lighten-3 h-viewport">
      <template v-if="loggedIn && !$route.meta.public">
        <top-nav />
        <v-row no-gutters class="central-content max-w-container mx-auto top-60 relative w-full flex flex-nowrap grey lighten-3 justify-space-between">
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
    </div>

    <m6-notification
      :danger="notifDanger"
      :snackbar="notifShow"
      :success="notifSuccess"
      :text="notifText"
      top
      @closing="notifClose"
    />
  </v-app>
</template>

<script>
import TopNav from '@/views/Home/TopNav'
import ActionFeed from '@/views/Home/ActionFeed'
import M6Chat from '@/components/Home/M6Chat'
import ChatWrapper from '@/components/Home/M6Chat/ChatWrapper'
import GeneralOverlay from '@/components/Shared/GeneralOverlay'
import { mapState, mapGetters, mapMutations } from 'vuex'
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
    }),
    ...mapState('SnackBarNotif', {
      notifShow : 'notifShow',
      notifSuccess : 'notifSuccess',
      notifDanger : 'notifDanger',
      notifText : 'notifText'
    })
  },
  methods: {
    ...mapMutations('SnackBarNotif', {
      notifClose: 'notifClose'
    })
  },
};
</script>

<style>
  .max-w-none {
    max-width: none !important;
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
