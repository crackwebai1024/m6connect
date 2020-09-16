<template>
  <v-app>
    <top-nav />
    <v-row no-gutters class="grey lighten-2 flex-nowrap">
      <!-- Side Panel Component  -->
      <side-panel />
      <!-- Home / Company Profile -->
      <router-view class="grey lighten-2 max-w-none" />
      <!-- Chat Component -->
      <v-card class="fill-height pt-3 d-flex flex-column align-end">
        <m6-chat></m6-chat>
      </v-card>
      <!-- </v-col> -->
    </v-row>
    <!-- Preview overlay -->
    <chat-wrapper></chat-wrapper>
    <general-overlay></general-overlay>
  </v-app>
</template>

<script>
import TopNav from "@/views/Home/TopNav";
import SidePanel from "@/views/Home/SidePanel";
import M6Chat from "@/components/Home/M6Chat";
import ChatWrapper from "@/components/Home/M6Chat/ChatWrapper";
import GeneralOverlay from "@/components/Shared/GeneralOverlay";
import { mapState} from "vuex";

export default {
  name: "App",
  components: {
    TopNav,
    SidePanel,
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
</style>
