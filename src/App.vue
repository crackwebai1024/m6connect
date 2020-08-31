<template>
  <v-app>
    <div>
      <v-row no-gutters class="grey lighten-2">
        <v-col cols="2" class="height-100-vh vertical-scroll dont-show-scroll">
          <!-- Side Panel Component  -->
          <side-panel />
        </v-col>
        <v-col :cols="layout.contacts ? 9 : 8" class="height-100-vh vertical-scroll dont-show-scroll">
          <router-view />
        </v-col>
        <v-col :cols="layout.contacts ? 1 : 2" style="position:fixed; right: 0; bottom: 0; top: 0;"
               class="pt-3 d-flex flex-column align-end">
          <!-- Chat Component -->
          <v-card class="fill-height" :width="layout.contacts ? 56 : '100%'">
            <m6-chat></m6-chat>
          </v-card>
        </v-col>
      </v-row>
      <!-- Preview overlay -->
      <chat-wrapper></chat-wrapper>
      <general-overlay></general-overlay>
    </div>
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
