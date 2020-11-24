<template>
  <div class="nav-bar px-4 w-full blue darken-3 d-flex justify-center">
    <div class="nav-content w-full d-flex justify-space-between align-center">
      <div class="align-center d-flex w-side">
        <img alt="M6Connect" src="@/assets/m6-home-logo.png" height="36px">
      </div>

      <v-tabs height="60" :value="3" active-class="blue darken-4" background-color="transparent" color="white" :hide-slider="true" class="max-w-content d-flex justify-center align-center">
        <v-tab v-for="(link,i) in quickAccessLinks" :key="'link' + i" :to="link.url" class="px-13 mb-0">
            <v-icon color="white" :large="true">mdi-{{ link.icon }}</v-icon>
        </v-tab>
      </v-tabs>

      <div class="align-center d-flex justify-end w-side">
        <snap-shot-nav />
        <v-menu
            class="mt-3"
            :close-on-content-click="false"
            elevation="0"
            offset-y
            bottom
        >
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                class="align-center btns-message d-flex justify-center white--text"
                elevation="0"
                fab
                height="25"
                width="25"
                x-small
                v-on="on"
            >
                <v-icon size="19">
                mdi-plus
                </v-icon>
            </v-btn>
            </template>

            <v-list class="mb-2 pa-0 transparent">
            <v-list-item class="ma-0 pa-0 uploadfile-btn">
                <v-tooltip
                class="tooltip-upload-file"
                left
                >
                <template v-slot:activator="{ on, attrs }">
                    <div
                    class="mt-3"
                    v-bind="attrs"
                    v-on="on"
                    >
                      <add-feed>
                          <v-btn
                              slot="btn"
                              block
                              @click="modal = 'app-builder'"
                              color="yellow darken-1"
                              class="px-3 pointer align-center d-flex justify-center ma-0 pa-0 upload-icon white--text"
                          >
                              New Action
                          </v-btn>
                      </add-feed>
                    </div>
                </template>
                <span class="black--text blue lighten-2 pa-1 rounded text-caption white--text">New Action</span>
                </v-tooltip>
            </v-list-item>
            <v-list-item class="ma-0 pa-0 uploadfile-btn">
                <v-tooltip
                class="tooltip-upload-file"
                left
                >
                <template v-slot:activator="{ on, attrs }">
                    <div
                    class="mt-3"
                    v-bind="attrs"
                    v-on="on"
                    >
                      <create-app>
                          <v-btn
                              slot="btn"
                              block
                              color="green darken-1"
                              class="px-3 pointer align-center d-flex justify-center ma-0 pa-0 upload-icon white--text"
                          >
                              Add New Application
                          </v-btn>
                      </create-app>
                    </div>
                </template>
                <span class="black--text blue lighten-2 pa-1 rounded text-caption white--text">Add New Record</span>
                </v-tooltip>
            </v-list-item>
            </v-list>
        </v-menu>

        <user-options />

        <span class="white--text font-weight-bold">
          {{ $h.dg(currentUser, 'firstName', '') }} {{ $h.dg(currentUser, 'lastName', '') }}
        </span>

        <company-home />

        <app-builder-show />

      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SnapShotNav from "@/components/Home/TopNav/SnapShotNav";
import UserOptions from "@/components/Home/TopNav/UserOptions";
// import AppTemplate from "@/views/Home/AppTemplate";
// import ProjectSocialMedia from "./ProjectSocialMedia";
// import PanelFull from "@/components/AppBuilder/Content/PanelFull";
// import PanelTwoColumns from "@/components/AppBuilder/Content/PanelTwoColumns";
import CreateApp from "@/components/Dialogs/CreateAppDialog";
import AddFeed from "./AddFeed";
import CompanyHome from './CompanyHome'
import AppBuilderShow from './AppBuilderShow'

export default {
  name: "TopNav",
  components: {
    UserOptions,
    SnapShotNav,
    // AppTemplate,
    // ProjectSocialMedia,
    // PanelFull,
    // PanelTwoColumns,
    AddFeed,
    CreateApp,
    CompanyHome,
    AppBuilderShow
  },

  computed: {
    ...mapState("Auth", {
      currentUser: "user"
    }),
    ...mapState("Companies", {
      currentCompany: "currentCompany"
    }),
    showLinksMessage: function() {
      return this.showLinks ? "Less" : "More";
    },
    heightShowLinksDiv: function() {
      return 7 * 35 + "px";
    }
  },

  data: () => ({
    user: {
      name: "John Doe",
      imgSrc: "https://cdn.vuetifyjs.com/images/john.jpg"
    },
    modal: '',
    company: {
      name: "Sharp Healthcare"
    },
    quickAccessLinks: [
      { url: "/",              icon: "home"            },
      { url: "/apps",          icon: "view-comfy"      },
      { url: "/companies",     icon: "office-building" },
      { url: "/store",         icon: "storefront"      },
      { url: "/user/settings", icon: "cog"             }
    ]
  }),
  methods: {}
};
</script>

<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  z-index: 100;
}
.nav-content {
  height: 60px;
  max-width: 1800px;
}
</style>