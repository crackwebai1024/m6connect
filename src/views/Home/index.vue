<template>
  <v-row no-gutters>
    <v-col cols="3">
      <!-- Module of user or project info -->
      <project-info/>
    </v-col>
    <v-col cols="6">
      <!-- Module of projects list -->
      <projects-list/>
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

export default {
  components: {
    TeamList,
    ProjectInfo,
    ProjectsList
  },
  name: "Home",
};
</script>