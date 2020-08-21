<template>
  <div>
    <v-row no-gutters>
      <v-col :cols="computedFirstPreviewColumns" v-if="computedFirstPreviewColumns > 0">
        <div>
          <v-row no-gutters class="pa-3">
            <v-spacer></v-spacer>
            <v-icon @click="change_preview_navigation_drawer(false)">mdi-arrow-collapse-left</v-icon>
          </v-row>
          <!-- Module of project or user info -->
          <project-info class="pa-0" :stayColumn="'right'"/>
        </div>
      </v-col>
      <v-col :cols="computedGridColumns">
        <!-- Module of projects list -->
        <projects-list />
        <!-- <views-list /> -->
      </v-col>
      <!--v-col cols="4">
        //Module of users list
        <team-list />
      </v-col-->
    </v-row>

    <!-- <v-navigation-drawer
      width="33%"
      :permanent="drawer"
      hide-overlay
      right
      v-model="drawer"
      absolute
    >
      <v-row no-gutters class="pa-2">
        <v-spacer></v-spacer>
        <v-icon @click="change_preview_navigation_drawer(false)">mdi-close</v-icon>
      </v-row>
      <project-info />
    </v-navigation-drawer>-->
  </div>
</template>

<script>
// import TeamList from "./TeamList";
import ProjectInfo from "./ProjectInfo";
import ProjectsList from "./ProjectsList";
// import ViewsList from "./ViewsList";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    // TeamList,
    ProjectInfo,
    ProjectsList,
    // ViewsList,
  },
  data: () => ({
    first_preview: false,
  }),
  name: "Home",
  computed: {
    computedFirstPreviewColumns() {
      if (this.first_preview) {
        return 3;
      } else {
        return 0;
      }
    },
    computedGridColumns() {
      if (!this.first_preview) {
        return 12;
      } else {
        return 9;
      }
    },
    ...mapGetters(["get_preview_navigation_drawer"]),
    navigationDrawer() {
      let navdrawer = this.get_preview_navigation_drawer();
      return navdrawer;
    },
  },
  methods: {
    ...mapActions(["change_preview_navigation_drawer"]),
  },
  watch: {
    navigationDrawer(val) {
      this.first_preview = val;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>