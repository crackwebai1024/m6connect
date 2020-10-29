<template>
    <div>
        <img
            @click="dialog = true"
            v-if="currentCompany.logo"
            :alt="currentCompany.name" 
            class="rounded ml-6 pointer" 
            width="62" 
            height="45" 
            :src="currentCompany.logo"
        >
        <template>
            <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                scrollable
            >
            <v-card class="relative vertical-scroll dont-show-scroll" tile>
                <v-btn
                    class="absolute top-0 left-0 ml-3 mt-1"
                    icon
                    light
                    @click="dialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>

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
                <div class="grey lighten-3 h-full pt-2">
                    <v-row class="max-w-lg w-full pt-1 mx-auto d-flex justify-space-between align-start">
                        <v-col cols="5" class="pa-0 pr-1">
                            <div class="white py-3 px-4">
                                <h3 class="grey--text text--darken-3 spacing-tight font-weight-bold">Information</h3>
                                <div>
                                    <div class="overflow-hidden links" ref="showLinksDiv">
                                        <div class="d-flex align-center my-3">
                                            <v-icon class="grey--text text--darken-3" size="24">mdi-heart</v-icon>
                                            <p class="ml-3 w-4/5 text-body-2 font-weight-ligshten black--text mb-0">{{ currentCompany.legalCompanyName }}</p>
                                        </div>
                                        <div class="d-flex align-center my-3">
                                            <v-icon class="grey--text text--darken-3" size="24">mdi-heart</v-icon>
                                            <p class="ml-3 w-4/5 text-body-2 font-weight-ligshten black--text mb-0">{{ currentCompany.email }}</p>
                                        </div>
                                        <div class="d-flex align-center my-3">
                                            <v-icon class="grey--text text--darken-3" size="24">mdi-heart</v-icon>
                                            <p class="ml-3 w-4/5 text-body-2 font-weight-ligshten black--text mb-0">{{ currentCompany.name }}</p>
                                        </div>
                                        <div class="d-flex align-center my-3">
                                            <v-icon class="grey--text text--darken-3" size="24">mdi-heart</v-icon>
                                            <p class="ml-3 w-4/5 text-body-2 font-weight-ligshten black--text mb-0">{{ currentCompany.phone }}</p>
                                        </div>
                                        <div class="d-flex align-center my-3">
                                            <v-icon class="grey--text text--darken-3" size="24">mdi-heart</v-icon>
                                            <p class="ml-3 w-4/5 text-body-2 font-weight-ligshten black--text mb-0">{{ currentCompany.website }}</p>
                                        </div>
                                        <div class="d-flex align-center my-3">
                                            <v-icon class="grey--text text--darken-3" size="24">mdi-heart</v-icon>
                                            <p class="ml-3 w-4/5 text-body-2 font-weight-ligshten black--text mb-0">{{ currentCompany.location }}</p>
                                        </div>
                                        <div class="d-flex align-center my-3">
                                            <v-icon class="grey--text text--darken-3" size="24">mdi-heart</v-icon>
                                            <p class="ml-3 w-4/5 text-body-2 font-weight-ligshten black--text mb-0">{{ currentCompany.socialMediaLinks[0].link }}</p>
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
                            <v-row class="mt-4 d-block ma-0 py-4 px-5 white width-100 vertical-scroll dont-show-scroll">
                                <p class="black--text font-weight-medium text-h6 mb-2">Sharp Healthcare</p>
                                <v-row class="d-flex ma-0">
                                    <v-col cols="6" class="pa-0">
                                        <div class="d-flex align-center mb-2">
                                            <v-icon class="black--text">mdi-email-outline</v-icon>
                                            <p class="mb-0 ml-2 body-2">contact@sharp.com</p>
                                        </div>
                                        <div class="d-flex align-center mb-2">
                                            <v-icon class="black--text">mdi-earth</v-icon>
                                            <p class="mb-0 ml-2 body-2">www.sharphealthcare.com</p>
                                        </div>
                                    </v-col>
                                    <v-col cols="6" class="pa-0">
                                        <div class="d-flex align-center justify-end mb-2">
                                            <v-icon class="black--text">mdi-phone</v-icon>
                                            <p class="mb-0 ml-2 body-2">(915) 445 - 1234</p>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-row>
                            <div class="white d-flex align-center mb-2">
                                hola
                            </div>
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

export default {
  components: {
    ProjectSocialMedia
  },
  data: () => ({
    dialog: false,
    showLinks: false,
    departmentsLinks: [
      { url: "", icon: "chart-pie", title: "Information Technology" },
      { url: "", icon: "cookie", title: "Supply Chain" },
      { url: "", icon: "shield-half-full", title: "Capital Projects" },
      { url: "", icon: "earth", title: "Request for Proposal" },
      { url: "", icon: "alert", title: "Contracts" },
      { url: "", icon: "asterisk", title: "Forensics" },
      { url: "", icon: "biohazard", title: "BioMed" }
    ]
  }),
  name: "CompanyDetails",
  computed: {
    ...mapState('Companies', {
      currentCompany: 'currentCompany'
    }),
    showLinksMessage: function() {
      return this.showLinks ? "Less" : "More";
    },
    iconShowLinks: function() {
      return this.showLinks ? "up" : "down";
    },
    heightShowLinksDiv: function() {
      return this.departmentsLinks.length * 37 + "px";
    }
  },
  methods: {
    toogleLinks() {
      this.showLinks = !this.showLinks;
      let linksdiv = this.$refs.showLinksDiv;
      this.showLinks
        ? (linksdiv.style.height = this.heightShowLinksDiv)
        : (linksdiv.style.height = "150px");
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
}
</style>