<template>
  <v-app id="complete-app">
    <div class="grey h-viewport lighten-3">
      <template v-if="loggedIn && !$route.meta.public">
        <top-nav />
        <v-row
          class="central-content flex flex-nowrap grey justify-space-between lighten-3 max-w-container mx-auto relative top-60 w-full"
          no-gutters
        >
          <v-col
            v-if="!isFullScreen"
            cols="3"
          >
            <action-feed v-show="showSidePanels" />
          </v-col>
          <v-col :cols="isFullScreen ? 12 : 6">
            <!-- Home / Company Profile -->
            <router-view />
          </v-col>
          <v-col
            v-if="!isFullScreen"
            cols="3"
          >
            <m6-chat v-show="showSidePanels" />
          </v-col>
        </v-row>
        <!-- Preview overlay -->
        <chat-wrapper />
        <general-overlay />
      </template>
      <template v-else>
        <router-view />
      </template>
    </div>
    <vue-snotify />
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
    isFullScreen() {
      return this.$route.name === 'app.cpm'
    },
    ...mapState(['layout']),
    ...mapGetters('Auth', {
      loggedIn: 'loggedIn'
    }),
    ...mapState('PageControl', {
      showSidePanels: 'showSidePanels'
    }),
    ...mapState('SnackBarNotif', {
      notifShow: 'notifShow',
      notifSuccess: 'notifSuccess',
      notifDanger: 'notifDanger',
      notifText: 'notifText'
    })
  },
  methods: {
    ...mapMutations('SnackBarNotif', {
      notifClose: 'notifClose'
    })
  }
}
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
