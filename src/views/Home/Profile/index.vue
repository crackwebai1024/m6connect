<template>
  <div>
    <search-bar/>
    <v-row no-gutters class="mr-2">
      <v-col cols="6">
          first col
      </v-col>
      <v-col cols="6">
        first col
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SearchBar from './SearchBar'

export default {
  components: {
    SearchBar
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