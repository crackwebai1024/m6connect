<template>
  <div class="nav-bar px-4 w-full blue darken-3 d-flex justify-center">
    <div class="nav-content w-full d-flex justify-space-between align-center">
      <img alt="M6Connect" src="@/assets/m6-home-logo.png" height="36px">
      <v-tabs height="60" :value="3" active-class="blue darken-4" background-color="transparent" color="white" :hide-slider="true" class="max-w-content d-flex justify-center align-center ml-16">
        <v-tab v-for="(link,i) in quickAccessLinks" :key="'link' + i" :to="link.url" class="px-13 mb-0">
            <v-icon color="white" :large="true">mdi-{{ link.icon }}</v-icon>
        </v-tab>
      </v-tabs>
      <div class="d-flex align-center">
        <img :alt="user.name" class="mr-1 rounded-circle" width="42" height="42" :src="user.imgSrc">
        <span class="white--text font-weight-bold">{{ user.name }}</span>
        <img :alt="company.name" class="rounded ml-6" width="62" height="45" src="@/assets/sharp-logo.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNav",
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
    ]
  })
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