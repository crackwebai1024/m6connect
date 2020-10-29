<template>
    <div>
        <v-btn
            class="white"
            text
            @click="dialog = true"
        >
            Add Company
        </v-btn>
        <template>
            <v-dialog
                class="vertical-scroll dont-show-scroll"
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                scrollable
            >
            <v-card class="relative" tile>
                <div class="max-w-lg pt-6 pb-4 w-full mx-auto d-flex justify-space-between align-center">
                    <div class="d-flex align-center">
                        <img
                            v-if="currentCompany.logo"
                            :alt="currentCompany.name" 
                            class="rounded pointer" 
                            width="180" 
                            height="150" 
                            :src="currentCompany.logo"
                        >
                        <div class="ml-8">
                            <p class="font-weight-regular text-h5 mb-1">{{ currentCompany.name }}</p>
                            <p>{{ currentCompany.legalCompanyName }}</p>
                        </div>
                    </div>
                    <div>
                        <v-btn
                            class="blue left-0 ml-3 mt-1 px-8 py-6 white--text font-weight-black"
                            text
                            light
                        >
                            Connect
                        </v-btn>
                    </div>
                </div>
                <v-divider class="max-w-lg w-full mx-auto blue-grey lighten-5"></v-divider>
                <div class="max-w-lg w-full pt-1 mx-auto d-flex justify-space-between align-center">
                    <template>
                        <v-tabs
                        :hide-slider="true"
                            active-class="font-weight-black blue--text active-tab-company" 
                        >
                            <v-tab class="capitalize blue--text">Home</v-tab>
                            <v-tab class="capitalize blue--text">People</v-tab>
                            <v-tab class="capitalize blue--text">Topics</v-tab>
                            <v-tab class="capitalize blue--text">Store</v-tab>
                        </v-tabs>
                    </template>
                    <div class="d-flex align-center">
                        <v-btn
                            class="grey capitalize lighten-2 grey--text text--darken-3 left-0 ml-3 pa-3 font-weight-black"
                            text
                            light
                        >
                            Follow
                        </v-btn>
                        <v-btn
                            class="grey capitalize lighten-2 grey--text text--darken-3 left-0 ml-3 pa-3 font-weight-black"
                            text
                            light
                        >
                            Message
                        </v-btn>
                        <v-btn
                            elevation="0"
                            class="grey capitalize lighten-2 grey--text text--darken-3 left-0 ml-3 pa-1 font-weight-black"
                            light
                        >
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </div>
                </div>
                <div class="grey lighten-3 h-fit min-h-full pt-2">
                    <v-row class="max-w-lg w-full pt-1 mx-auto d-flex justify-space-between align-start">
                        <v-col cols="5" class="pa-0 pr-1">
                            <div class="white py-3 px-4 mb-3">
                                <h3 class="grey--text text--darken-3 spacing-tight font-weight-bold">Information</h3>
                                <div>
                                    <div class="overflow-hidden links" ref="showLinksDiv">
                                        <div class="d-flex align-center my-3">
                                            <v-icon class="grey--text text--darken-3" size="22">mdi-clipboard-file-outline</v-icon>
                                            <p class="ml-3 w-4/5 text-body-2 font-weight-ligshten black--text mb-0">{{ currentCompany.legalCompanyName }}</p>
                                        </div>
                                        <div class="d-flex align-center my-3">
                                            <v-icon class="grey--text text--darken-3" size="22">mdi-email-outline</v-icon>
                                            <p class="ml-3 w-4/5 text-body-2 font-weight-ligshten black--text mb-0">{{ currentCompany.email }}</p>
                                        </div>
                                        <div class="d-flex align-center my-3">
                                            <v-icon class="grey--text text--darken-3" size="22">mdi-clipboard-file-outline</v-icon>
                                            <p class="ml-3 w-4/5 text-body-2 font-weight-ligshten black--text mb-0">{{ currentCompany.name }}</p>
                                        </div>
                                        <div class="d-flex align-center my-3">
                                            <v-icon class="grey--text text--darken-3" size="22">mdi-phone</v-icon>
                                            <p class="ml-3 w-4/5 text-body-2 font-weight-ligshten black--text mb-0">{{ currentCompany.phone }}</p>
                                        </div>
                                        <div class="d-flex align-center my-3">
                                            <v-icon class="grey--text text--darken-3" size="22">mdi-earth</v-icon>
                                            <p class="ml-3 w-4/5 text-body-2 font-weight-ligshten black--text mb-0">{{ currentCompany.website }}</p>
                                        </div>
                                        <div class="d-flex align-center my-3">
                                            <v-icon class="grey--text text--darken-3" size="24">mdi-heart</v-icon>
                                            <p class="ml-3 w-4/5 text-body-2 font-weight-ligshten black--text mb-0">{{ currentCompany.legalCompanyName }}</p>
                                        </div>
                                    </div>
                                    <div @click="toogleLinks" class="pointer d-flex align-center pt-2">
                                        <p class="ml-9 blue--text text-body-2 mb-0">{{ showLinksMessage }}</p>
                                    </div>
                                </div>
                            </div>
                            <panel-details v-for="i in 3" :key="i"/>
                        </v-col>
                        <v-col cols="7" class="pa-0 pl-1">
                            <project-social-media class="main-content px-0" />
                        </v-col>
                    </v-row>
                </div>
            </v-card>
            </v-dialog>
        </template>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProjectSocialMedia from './ProjectSocialMedia'
import PanelDetails from './PanelDetails'

export default {
  components: {
    ProjectSocialMedia,
    PanelDetails
  },
  data: () => ({
    dialog: false,
    showLinks: false,
  }),
  name: "CompanyDetails",
  computed: {
    ...mapState('Companies', {
      currentCompany: 'currentCompany'
    }),
    showLinksMessage: function() {
      return this.showLinks ? "Less" : "More";
    },
    heightShowLinksDiv: function() {
      return 7 * 35 + "px";
    }
  },
  methods: {
    toogleLinks() {
      this.showLinks = !this.showLinks;
      let linksdiv = this.$refs.showLinksDiv;
      this.showLinks
        ? (linksdiv.style.height = this.heightShowLinksDiv)
        : (linksdiv.style.height = "130px");
    }
  }
};
</script>

<style lang="scss">
.spacing-tight {
  letter-spacing: 1px;
}

.links {
  transition: height 5s;
  height: 150px;
  overflow: hidden;
  -webkit-transition: height 0.5s ease;
  -moz-transition: height 0.5s ease;
  -o-transition: height 0.5s ease;
  transition: height 0.5s ease;
}
.active-tab-company {
  border-bottom: 2px solid rgb(49, 174, 220);
}
.v-dialog--scrollable {
  position: absolute;
  top: 60px;
  height: calc(100vh - 60px) !important;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;
}
.v-dialog--scrollable::-webkit-scrollbar {
  width: 0px;
}
</style>