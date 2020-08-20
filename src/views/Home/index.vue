<template>
  <v-row no-gutters>
    <v-col cols="3">
      <!-- Module of user or project info -->
      <project-info/>
    </v-col>
    <v-col cols="6">
      <!-- Module of projects list -->
      <projects-list/>
      <views-list/>
    </v-col>
    <v-col cols="3">
      <!-- Module of users list -->
      <team-list/>
    </v-col>
  </v-row>
</template>

<script>
  import TeamList from "./TeamList"
  import ProjectInfo from "./ProjectInfo"
  import ProjectsList from "./ProjectsList"
  import ViewsList from "./ViewsList"

export default {
  components: {
    TeamList,
    ProjectInfo,
    ProjectsList,
    ViewsList
  },
  name: "Home",
};
</script>