<template>
  <div class="ma-3">
    <v-row class="d-flex justify-space-between ma-0 mb-4 py-2 px-5 white width-100 vertical-scroll dont-show-scroll rounded-pill">
      <v-col cols="5" class="pa-0">
        <img alt="" class="mr-2"  height="35" src="@/assets/sharp-logo2.png">
      </v-col>
      <v-col cols="2" class="pa-0 d-flex align-center">
        <v-row class="d-flex align-center">
          <v-tabs
            class="d-flex justify-center"
            height="35"
            :active-class="'font-weight-medium'"
            :hide-slider="true"
            v-model="tab"
          >
            <v-tab
              class="black--text px-2"
              v-for="(item,index) in items"
              :key="item"
              @click="currentTab = index"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
        </v-row>
      </v-col>      
      <v-col cols="5" class="d-flex justify-end pa-0">
        <v-icon :large="true" class="black--text">mdi-magnify</v-icon>
      </v-col>
    </v-row>
    
    <v-tabs-items v-model="tab">
        <v-row no-gutters class="grey lighten-2">
          <v-col cols="6" class="pr-2" v-show="currentTab == 0">
            <post-profile/>
          </v-col>
          <v-col cols="6" class="pl-2" v-show="currentTab == 0">
            <profile-info/>
          </v-col>
          <v-col cols="6" class="pr-2" v-show="currentTab == 1">
            <employees/>
          </v-col>
          <v-col cols="6" class="pl-2" v-show="currentTab == 1">
            <month-employee/>
          </v-col>
        </v-row>
    </v-tabs-items>
  </div>
</template>

<script>
import PostProfile from './Wall/PostProfile'
import ProfileInfo from './Wall/ProfileInfo'
import Employees from './People/Employees'
import MonthEmployee from './People/MonthEmployee'

export default {
  components: {
    PostProfile,
    ProfileInfo,
    Employees,
    MonthEmployee
  },
  data: () => ({
    tab: null,
    items: [
      'Profile', 'People', 'Details',
    ],
    currentTab: 0
  }),
  name: "SharpProfilePage",
  computed: {
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
  .no-transition .stepper__content { 
    transition: none; 
  }
  .v-tab {
    font-weight: 300;
    min-width: 40px;
    text-transform: none;
  }
</style>