<template>
  <div class="blue darken-3 d-flex justify-center">
    <div class="nav-content d-flex justify-space-between align-center">
      <img alt="M6Connect" src="@/assets/m6-home-logo.png" height="36px">
      <v-tabs height="60" active-class="blue darken-4" background-color="transparent" color="white" :hide-slider="true" class="tabs-content d-flex justify-center align-center">
        <v-tab class="px-13"><v-icon color="white" :x-large="true">mdi-home</v-icon></v-tab>
        <v-tab class="px-13"><v-icon color="white" :large="true">mdi-view-comfy</v-icon></v-tab>
        <v-tab class="px-13"><v-icon color="white" :large="true">mdi-office-building</v-icon></v-tab>
        <v-tab class="px-13"><v-icon color="white" :large="true">mdi-storefront</v-icon></v-tab>
        <v-tab class="px-13"><v-icon color="white" :large="true">mdi-cog</v-icon></v-tab>
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
    }
  })
};
</script>

<style lang="scss" scoped>
.nav-content {
    width: 100%;
    height: 60px;
    max-width: 1800px;
}
.tabs-content {
    max-width: 720px;
}
</style>