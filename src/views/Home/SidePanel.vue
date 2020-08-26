<template>
  <div>
    <div class="blue darken-3 mt-3 ml-2 py-3 px-4">
      <div class="d-flex">
        <img alt="" class="mr-2" width="100" height="65" src="@/assets/sharp-logo.png">
        <h2 class="ml-2 white--text spacing-tight font-weight-medium">Sharp Healthcare</h2>
      </div>
      <v-divider class="mb-3 mt-4 light-blue accent-1"></v-divider>
      <div>
        <p class="ml-3 grey--text text--lighten-2 body-2 mb-1">Quick Access</p>
        <div class="d-flex align-center my-3" v-for="(link,i) in quickAccessLinks" :key="'link' + i">
          <v-icon :dark="true" :large="true">mdi-{{ link.icon }}</v-icon>
          <p class="ml-5 w-4/5 white--text mb-0">{{ link.title }}</p>
        </div>
        <v-divider class="my-3 light-blue accent-1"></v-divider>
        <p class="ml-3 grey--text text--lighten-2 body-2 mb-1">Departments</p>
        <div class="overflow-hidden links" ref="showLinksDiv">
          <div class="d-flex align-center my-3" v-for="(link,i) in departmentsLinks" :key="'link2' + i">
            <v-icon :dark="true" :large="true">mdi-{{ link.icon }}</v-icon>
            <p class="ml-5 w-4/5 white--text mb-0">{{ link.title }}</p>
          </div>
        </div>
        <div @click="toogleLinks" class="cursor-pointer d-flex align-center pt-2">
          <v-icon :dark="true" :large="true">mdi-chevron-{{ iconShowLinks }}</v-icon>
          <p class="ml-5 white--text mb-0">{{ showLinksMessage }}</p>
        </div>
      </div>
    </div>
    <div class="mt-3 t-6 white ml-2 pt-4 pb-5 px-4">
      <p class="ml-3 grey--text text--lighten-1 body-2 mb-3">Links</p>
      <template v-for="(card, index) in cardsList">
        <div :key="'card' + index">
          <div class="d-flex">
            <img alt="" width="150" height="70" src="@/assets/image.png">
            <div class="ml-3">
              <p class="mb-1 font-weight-medium leading-tight spacing-tight">{{ card.title }}</p>
              <p class="body-2 mb-0 leading-tight">{{ card.description }}</p>
            </div>
          </div>
          <div v-if="index !== cardsList.length - 1">
            <v-divider class="my-3 grey lighten-2"></v-divider>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    showLinks: false,
    quickAccessLinks: [
      { url:'', icon:'heart', title: 'My Favorites' },
      { url:'', icon:'briefcase-variant', title: 'Sharp Profile Page' }
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
    ]
  }),
  name: "SidePanel",
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

<style lang="scss" scoped>
  .leading-tight {
    line-height: 1.4;
  }
  .leading-tight	{
    line-height: 1.25;
  }
  .leading-snug	{
    line-height: 1.375;
  }
  .spacing-tight {
    letter-spacing: 1px;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .links {
    transition: height 5s;
    height: 150px;
    overflow:hidden;
    -webkit-transition: height .5s ease;
    -moz-transition: height .5s ease;
    -o-transition: height .5s ease;
    transition: height .5s ease;
  }
</style>