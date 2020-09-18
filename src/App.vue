<template>
  <v-app>
    <top-nav />
    <v-row no-gutters class="main-components-content flex flex-nowrap grey lighten-3 justify-space-between">
      <action-feed />
      <!-- Home / Company Profile -->
      <router-view />
      <m6-chat />
    </v-row>
    <!-- Preview overlay -->
    <chat-wrapper />
    <general-overlay />
  </v-app>
</template>

<script>
import TopNav from "@/views/Home/TopNav";
import ActionFeed from "@/views/Home/ActionFeed";
import M6Chat from "@/components/Home/M6Chat";
import ChatWrapper from "@/components/Home/M6Chat/ChatWrapper";
import GeneralOverlay from "@/components/Shared/GeneralOverlay";
import { mapState} from "vuex";

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
    ...mapState(['layout'])
  }
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
  .main-components-content {
    width: 100%;
    position: absolute;
    top: 60px;
  }
</style>
