<template>
  <div class="ma-3">
    <search-bar/>
    <!-- Profile Router -->
    <!-- <v-row no-gutters class="mt-4">
      <v-col cols="6" class="pr-2">
        <post-profile/>
      </v-col>
      <v-col cols="6" class="pl-2">
        <profile-info/>
      </v-col>
    </v-row> -->
    <!-- People Router -->
    <v-row no-gutters class="mt-4">
      <v-col cols="6" class="pr-2">
        <employees/>
      </v-col>
      <v-col cols="6" class="pl-2">
        <month-employee/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SearchBar from './SearchBar'
// import PostProfile from './Wall/PostProfile'
// import ProfileInfo from './Wall/ProfileInfo'
import Employees from './People/Employees'
import MonthEmployee from './People/MonthEmployee'

export default {
  components: {
    SearchBar,
    // PostProfile,
    // ProfileInfo
    Employees,
    MonthEmployee
  },
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
  name: "SharpProfilePage",
  computed: {
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
</style>