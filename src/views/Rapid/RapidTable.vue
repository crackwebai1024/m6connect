<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="2" />
      <v-col cols="8">
         <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="5"
        ></v-data-table>
      </v-col>
      <v-col cols="2" />
    </v-row>
  </v-container> 
</template>

<script>
import { mapMutations } from 'vuex'
export default {

  name: "RapidTable",

  data: () => ({
    headers: [
      { text: 'Title', value: 'rapid_title' },
      { text: 'Description', value: 'rapid_description' },
      { text: 'Status', value: 'rapid_status' },
      { text: 'Emoji', value: 'rapid_reaction' },
      { text: 'Color', value: 'rapid_color_rating' }, 

    ]
  }),

  methods: {
    ...mapMutations('PageControl', {
      setShowSidePanels: 'setShowSidePanels'
    })
  }, 

  mounted() {
    console.log('mounted?')
    this.setShowSidePanels(false)
  },

  beforeDestroy() {
    this.setShowSidePanels(true)
  }
}
</script>