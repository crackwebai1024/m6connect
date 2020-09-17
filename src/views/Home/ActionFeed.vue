<template>
  <div class="actionfeed-content transparent ml-4">
    <div class="pl-3 mt-4 mb-1 d-flex justify-space-between align-center">
      <p class="font-weight-bold mb-0">Action Feed</p>
      <div class="d-flex align-center">
        <v-menu transition="slide-y-transition" offset-y bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="0" class="capitalize-text mb-0 px-0 pl-1 transparent purple--text text--darken-1 font-weight-bold" v-bind="attrs" v-on="on">
              All Apps
              <v-icon class="blue--text text--darken-3">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item v-for="(item, i) in areas" :key="i" style="height: 15px;">
              <v-list-item-title
                :class="item.type == 'title' ? 'grey--text' : 'black--text'"
              >{{ item.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-icon size="28" class="ml-2">mdi-magnify</v-icon>
      </div>
    </div>
    <div v-for="post in 4" :key="post" class="actionfeed-content__card card-custom-shadow rounded white mb-4 pt-4 px-3">
      <div class="card-content__tag red white--text d-flex justify-center align-center text-body-1 font-weight-regular">
        CPM
      </div>
      <div class="d-flex">
        <v-avatar size="36">
          <v-img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"></v-img>
        </v-avatar>
        <div class="ml-2">
          <p class="font-weight-bold" style="margin-bottom: -5px;">Username M. Johnson</p>
          <span class="text-caption grey--text text--darken-1">Project Manager - 15 min</span>
        </div>
      </div>
      <p class="text-body-2 mt-2 mb-3 ml-2 grey--text text--darken-4">This is the budget for next year. Please review.</p>
      <p class="text-body-2 ml-1 mb-0 blue--text text--darken-3 d-flex align-center">
        <v-icon class="mr-1 blue--text text--darken-3">mdi-file-document-outline</v-icon>
        Elevator Modernization All Hospitals.cpm.bdg
      </p>
      <div class="d-flex mt-4 ml-2 align-center">
        <v-badge
          v-for="i in 3" :key="i" style="margin-left:-5px"
          top
          color="green lighten-2"
          dot
          offset-x="9"
          offset-y="7"
        >
          <v-avatar size="28">
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-avatar>
        </v-badge>
        <p class="ml-2 mb-0 text-caption grey--text text--darken-1">2 pending</p>
      </div>
      <div class="d-flex feed-btns pa-3 text-caption align-center">
        <p class="mb-0 mr-2"><v-icon size="17">mdi-thumb-up-outline</v-icon> 157</p>
        <p class="mb-0 mr-2"><v-icon size="17">mdi-message-outline</v-icon> 14</p>
        <p class="mb-0 mr-2"><v-icon size="17">mdi-share</v-icon> 4</p>
      </div>
    </div>

    <!-- <div class="d-flex align-center my-3" v-for="(link,i) in quickAccessLinks" :key="'link' + i">
      <v-icon :dark="true" :large="true">mdi-{{ link.icon }}</v-icon>
      <router-link :to="link.url" tag="p" class="ml-5 w-4/5 white--text mb-0">{{ link.title }}</router-link>
    </div> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    showLinks: false,
    quickAccessLinks: [
      { url:'', icon:'heart', title: 'My Favorites' },
      { url:'/company/123', icon:'briefcase-variant', title: 'Sharp Profile Page' }
    ],
    departmentsLinks: [
      { url:'', icon:'chart-pie', title: 'Information Technology' },
      { url:'', icon:'cookie', title: 'Supply Chain' },
      { url:'', icon:'shield-half-full', title: 'Capital Projects' },
      { url:'', icon:'earth', title: 'Request for Proposal' },
      { url:'', icon:'alert', title: 'Contracts' },
      { url:'', icon:'asterisk', title: 'Forensics' },
      { url:'', icon:'biohazard', title: 'BioMed' }
    ],
    cardsList: [
      { imgSrc:'', title: 'Cool Title', description: 'Lorem ipsum dolor sit amet, consetetus sadipscing elitr, sed.'},
      { imgSrc:'', title: 'Cool Title', description: 'Lorem ipsum dolor sit amet, consetetus sadipscing elitr, sed.' }
    ],
    areas: [
      { text: "Everyone", type: "subtitle" },
      { text: "My company", type: "subtitle" },
      { text: "Teams", type: "title" },
      { text: "All my teams", type: "subtitle" },
      { text: "IT Team XY", type: "subtitle" },
      { text: "CPM Team Z", type: "subtitle" },
      { text: "Departments", type: "title" },
      { text: "All my departments", type: "subtitle" },
      { text: "Finances", type: "subtitle" },
      { text: "Operations", type: "subtitle" },
    ],
  }),
  name: "ActionFeed",
  computed: {
    showLinksMessage: function() {
      return this.showLinks ? 'Less' : 'More'
    },
    iconShowLinks: function()  {
      return this.showLinks ? 'up' : 'down'
    },
    heightShowLinksDiv: function() {
      return (this.departmentsLinks.length * 48) + 'px'
    }
  },
  methods: {
    toogleLinks() {
      this.showLinks = !this.showLinks
      let linksdiv = this.$refs.showLinksDiv
      this.showLinks ? linksdiv.style.height = this.heightShowLinksDiv : linksdiv.style.height = "150px"
    }
  }
};
</script>

<style lang="scss">
  .capitalize-text {
    text-transform: capitalize;
  }
  .card-custom-shadow {
    box-shadow: 0px 3px 6px #00000028;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .actionfeed-content {
    width: 400px;
  }
  .actionfeed-content__card {
    position: relative;
    min-height: 223px;
  }
  .card-content__tag {
    position: absolute;
    top: 0px;
    right: 0;
    width: 62px;
    height: 34px;
    border-radius: 0px 4px;
  }
  .feed-btns {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  // esto es para que se vean mejor las letras pequenhas
  // .text-caption {
  //   letter-spacing: 0 !important;
  // }
</style>