<template>
  <v-app>
    <v-row no-gutters class="grey lighten-2 flex-nowrap">
      <!-- Side Panel Component  -->
      <side-panel />
      <!-- Home / Company Profile -->
      <router-view class="grey lighten-2 max-w-none" :class="layout.contacts ? 'content-expanded' : 'content-collapsed'"/>
      <!-- Chat Component -->
      <v-card class="fill-height pt-3 d-flex flex-column align-end" :width="layout.contacts ? 56 : 306" style="position:fixed; right: 0; bottom: 0; top: 0;">
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
import M6Chat from "@/components/Home/M6Chat";
import ChatWrapper from "@/components/Home/M6Chat/ChatWrapper";
import SidePanel from "@/views/Home/SidePanel";
import GeneralOverlay from "@/components/Shared/GeneralOverlay";
import { mapState} from "vuex";

export default {
  name: "App",
  components: {
    M6Chat,
    ChatWrapper,
    GeneralOverlay,
    SidePanel,
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
  .content-expanded {
    width: calc(100% - 371px);
  }
  .content-collapsed {
    width: calc(100% - 621px);
  }
  .max-w-none {
    max-width: none;
  }
</style>
