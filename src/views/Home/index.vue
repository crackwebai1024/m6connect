<template>
  <v-row no-gutters>
    <v-col cols="3">
      <v-card
        class="pa-2"
        outlined
        tile
      >
        Project Info
      </v-card>
    </v-col>
    <v-col cols="7">
      <!-- Module of projects list -->
      <projects-list/>
    </v-col>
    <v-col cols="2">
      <!-- Module of users list -->
      <team-list/>
    </v-col>
  </v-row>
</template>

<script>
  import TeamList from "./TeamList"
  import ProjectsList from "./ProjectsList"

export default {
  components: {
    TeamList,
    ProjectsList
  },
  name: "Home",
};
</script>