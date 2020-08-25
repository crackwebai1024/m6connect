<template>
    <v-row class="d-flex justify-space-between ma-3 py-2 px-5 white width-100 vertical-scroll dont-show-scroll rounded-pill">
      <v-col cols="5" class="pa-0">
        <img alt="" class="mr-2"  height="35" src="@/assets/sharp-logo2.png">
      </v-col>
      <v-col cols="2" class="pa-0 d-flex align-center">
        <v-row class="d-flex align-center">
          <v-col cols="4" class="font-weight-medium pa-0 text-right">
            Profile
          </v-col>
          <v-col cols="4" class="font-weight-light pa-0 text-center">
            People
          </v-col>
          <v-col cols="4" class="font-weight-light pa-0 text-left">
            Details
          </v-col>
        </v-row>
      </v-col>      
      <v-col cols="5" class="d-flex justify-end pa-0">
        <v-icon :large="true" class="black--text">mdi-magnify</v-icon>
      </v-col>
    </v-row>
</template>

<script>
export default {
  data: () => ({
  }),
  name: "SearchBar",
  computed: {
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
</style>