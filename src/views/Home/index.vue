<template>
  <v-row no-gutters>
    <v-col cols="3" v-if="false">
      <!-- Module of project or user info -->
      <project-info />
    </v-col>
    <v-col cols="8">
      <!-- Module of projects list -->
      <projects-list />
      <views-list />
    </v-col>
    <v-col cols="4">
      <!-- Module of users list -->
      <team-list />
    </v-col>
  </v-row>
</template>

<script>
import TeamList from "./TeamList";
import ProjectInfo from "./ProjectInfo";
import ProjectsList from "./ProjectsList";
import ViewsList from "./ViewsList";

export default {
  components: {
    TeamList,
    ProjectInfo,
    ProjectsList,
    ViewsList,
  },
  name: "Home",
};
</script>