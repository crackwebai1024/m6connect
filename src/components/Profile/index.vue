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
    <v-col class="pa-0 mb-3" v-show="currentTab == 0">
      <v-btn
        v-show="!(showColumnLeft && !showColumnRight)"
        class="ma-2"
        color="secondary"
        @click="showColumnLeft = !showColumnLeft"
      >
        Toggle Column Left
      </v-btn>
      <v-btn
        v-show="!(showColumnRight && !showColumnLeft)"
        class="ma-2"
        color="red"
        @click="showColumnRight = !showColumnRight"
      >
        Toggle Column Right
      </v-btn>
    </v-col>
    <v-tabs-items v-model="tab">
        <v-row no-gutters class="grey lighten-2" v-show="currentTab == 0">
          <v-expand-x-transition>
            <v-card v-show="showColumnLeft"
              elevation="0"
              :height="showColumnLeft ? 'auto': '0'"
              :width="showColumnLeft ? showColumnRight ? '50%' : '100%' : '0'"
              :class="{'pr-2' : showColumnRight && showColumnLeft}"
              class="transparent"
            >
              <post-profile/>
            </v-card>
          </v-expand-x-transition>
          <v-expand-x-transition>
            <v-card v-show="showColumnRight"
              elevation="0"
              :height="showColumnRight ? 'auto': '0'"
              :width="showColumnRight ? showColumnLeft ? '50%' : '100%' : '0'"
              :class="{'pl-2' : showColumnRight && showColumnLeft}"
              class="transparent"
            >
              <profile-info/>
              <template v-for="i in 2">
                <chart-card :key="'chart'+i"/>
              </template>
            </v-card>
          </v-expand-x-transition>
        </v-row>
        <v-row no-gutters class="grey lighten-2" v-show="currentTab == 1">
          <v-col cols="6" class="pr-2">
            <employees/>
          </v-col>
          <v-col cols="6" class="pl-2">
            <month-employee/>
          </v-col>
        </v-row>
    </v-tabs-items>
  </div>
</template>

<script>
import PostProfile from './Wall/PostProfile'
import ProfileInfo from './Wall/ProfileInfo'
import ChartCard from './Wall/ChartCard'
import Employees from './People/Employees'
import MonthEmployee from './People/MonthEmployee'

export default {
  components: {
    PostProfile,
    ProfileInfo,
    ChartCard,
    Employees,
    MonthEmployee
  },
  data: () => ({
    tab: null,
    items: [
      'Profile', 'People', 'Details',
    ],
    currentTab: 0,
    showColumnLeft: true,
    showColumnRight: true
  }),
  name: "SharpProfilePage",
  computed: {
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
  .v-tab {
    font-weight: 300;
    min-width: 40px;
    text-transform: none;
  }
</style>