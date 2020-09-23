<template>
  <v-app>
    <template v-if="loggedIn && !$route.meta.public" >
      <top-nav />
      <v-row no-gutters style="height: calc(100vh - 60px);" class="top-60 relative w-full flex flex-nowrap grey lighten-3 justify-space-between">
        <action-feed />
        <!-- Home / Company Profile -->
        <router-view />
        <m6-chat />
      </v-row>
      <!-- Preview overlay -->
      <chat-wrapper />
      <general-overlay />
    </template>
    <template v-else >
      <router-view />
    </template>    
  </v-app>
</template>

<script>
import TopNav from "@/views/Home/TopNav";
import ActionFeed from "@/views/Home/ActionFeed";
import M6Chat from "@/components/Home/M6Chat";
import ChatWrapper from "@/components/Home/M6Chat/ChatWrapper";
import GeneralOverlay from "@/components/Shared/GeneralOverlay";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    TopNav,
    ActionFeed,
    M6Chat,
    ChatWrapper,
    GeneralOverlay,
  },
  data: () => ({
    //
  }),
  computed:{
    ...mapState(['layout']),
    ...mapGetters('Auth', {
      loggedIn: 'loggedIn'
    })
  },
  methods: {
    ...mapActions('Auth', {
      searchForToken: 'searchForToken'
    })
  },
  mounted() {
    this.searchForToken()
  },

};
</script>
<style>
  .max-w-none {
    max-width: none;
  }
  #app {
    font-family: 'Raleway', sans-serif;
    font-size: 15px;
  }
  * {
    color: var(--v-secondary-lighten1);
  }
</style>
