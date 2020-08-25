<template>
  <div>
    <div class="blue darken-3 ma-2 py-3 px-4">
      <div class="d-flex">
        <img
          alt=""
          class="mr-2"
          width="100"
          height="50"
          src="@/assets/sharp-logo.png"
        >
        <h2 class="ml-2 white--text">Sharp<br>Healthcare</h2>
      </div>
      <v-divider class="my-3 light-blue accent-1"></v-divider>
      <div>
        <p class="ml-3 grey--text text--lighten-2 body-2">Quick Access</p>
        <div class="d-flex align-center my-3" v-for="(item,i) in 2" :key="'link' + i">
          <img
            alt=""
            width="32"
            height="32"
            src="@/assets/heart.png"
          >
          <p class="ml-5 w-4/5 white--text mb-0">My Favorites</p>
        </div>
        <v-divider class="my-3 light-blue accent-1"></v-divider>
        <p class="ml-3 grey--text text--lighten-2 body-2">Departments</p>
        <div class="d-flex align-center my-3" v-for="(item,i) in 7" :key="'link' + i">
          <img
            alt=""
            width="32"
            height="32"
            src="@/assets/heart.png"
          >
          <p class="ml-5 w-4/5 white--text mb-0">My Favorites</p>
        </div>
      </div>
    </div>
    <div class="mt-3 t-6 white ma-2 py-3 px-4">
      <p class="ml-3 grey--text text--lighten-1 body-2">Links</p>
      <div class="d-flex">
        <img
          alt=""
          width="150"
          height="80"
          src="@/assets/image.png"
        >
        <div class="ml-3">
          <p class="mb-1 font-weight-medium">Cool title</p>
          <p class="body-2 mb-0">Lorem ipsum dolor sit amet, consetetus sadipscing elitr, sed.</p>
        </div>
      </div>
      <v-divider class="my-3 grey lighten-2"></v-divider>
            <div class="d-flex">
        <img
          alt=""
          width="150"
          height="80"
          src="@/assets/image.png"
        >
        <div class="ml-3">
          <p class="mb-1 font-weight-medium">Cool title</p>
          <p class="body-2 mb-0">Lorem ipsum dolor sit amet, consetetus sadipscing elitr, sed.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
  }),
  name: "SidePanel",
  computed: {
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
</style>