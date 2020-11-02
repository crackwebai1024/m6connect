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

        <user-options />

        <span class="white--text font-weight-bold">
          {{ $h.dg(currentUser, 'firstName', '') }} {{ $h.dg(currentUser, 'lastName', '') }}
        </span>

        <panel-details-template>
          <img
            slot="actionbtn"
            v-if="currentCompany.logo"
            :alt="currentCompany.name"
            class="rounded ml-6 pointer"
            width="62"
            height="45"
            :src="currentCompany.logo"
          >
          <div slot="header" class="max-w-lg pt-6 pb-4 w-full mx-auto d-flex justify-space-between align-center">
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
          <div slot="tabs" class="d-flex align-center">
              <v-tabs
                  :hide-slider="true"
                  active-class="font-weight-black blue--text active-tab-company" 
              >
                  <v-tab class="capitalize blue--text">Home</v-tab>
                  <v-tab class="capitalize blue--text">People</v-tab>
                  <v-tab class="capitalize blue--text">Topics</v-tab>
                  <v-tab class="capitalize blue--text">Store</v-tab>
              </v-tabs>
          </div>
          <div slot="btns" class="d-flex align-center">
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
          <div slot="leftPanel">
              <h3 class="grey--text text--darken-3 spacing-tight font-weight-bold">Information</h3>
              <div class="overflow-hidden">
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
          </div>
          <div slot="rightPanel">
              <project-social-media class="main-content px-0" />
          </div>
        </panel-details-template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SnapShotNav from '@/components/Home/TopNav/SnapShotNav'
import UserOptions from '@/components/Home/TopNav/UserOptions'
import PanelDetailsTemplate from '@/views/Home/PanelDetailsTemplate'
import ProjectSocialMedia from './ProjectSocialMedia'

export default {
  name: "TopNav",
  components: {
    UserOptions,
    SnapShotNav,
    PanelDetailsTemplate,
    ProjectSocialMedia,
  },

  computed: {
    ...mapState('Auth', {
      currentUser: 'user'
    }),
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

  data: () => ({
    user: {
      name: 'John Doe',
      imgSrc: 'https://cdn.vuetifyjs.com/images/john.jpg'
    },
    company: {
      name: 'Sharp Healthcare',
    },
    quickAccessLinks: [
      { url:'/', icon:'home' },
      { url:'/apps', icon:'view-comfy' },
      { url:'/companies', icon:'office-building' },
      { url:'/store', icon:'storefront' },
      { url:'/user/settings', icon:'cog' }
    ],
  }),  
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