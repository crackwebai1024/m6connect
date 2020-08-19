<template>
  <v-row no-gutters>
    <v-col cols="3">
      <v-card
        class="pa-2"
        outlined
        tile
      >
        Proyect Info
      </v-card>
    </v-col>
    <v-col cols="7">
      <v-card
        class="pa-2"
        outlined
        tile
      >
        Proyects List
      </v-card>
    </v-col>
    <v-col cols="2">
      <!-- Module of users list -->
      <TeamList/>
    </v-col>
  </v-row>
</template>

<script>
  import TeamList from "./TeamList"

export default {
  components: {
    TeamList
  },
  name: "Home",
  data: () => ({
    //
  }),
};
</script>