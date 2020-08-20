<template>
<v-container>
  <header-component :info="{height:'100px', title:'M6Works', icon:'mdi-map-marker'}">
    <v-spacer></v-spacer>
    <v-col cols="4" >
        <v-text-field
          label="Search"
          v-model="searchText"
          single-line
          outlined
        ></v-text-field>
      </v-col>
  </header-component>
  <v-carousel hide-delimiters :continuous="false" height="415">
    <v-carousel-item v-for="(item,i) in pages" :key="i" class="pa-4">
      <v-row dense>
        <v-col cols="4" class="pa-1" :key="index" v-for="index of remainingPerPage(i)">
          <card-project-list :info="Object.values(get_projects())[getIndex(i, index)]" />
        </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CardProjectList from "@/components/Home/CardProjectList";
import HeaderComponent from "@/components/Home/HeaderComponent";

export default {
  components: {
    CardProjectList,
    HeaderComponent
  },
  name: "ProjectsList",
  data: () => ({
    perPage: 6,
    searchText:''
  }),
  computed: {
    ...mapGetters(["get_projects"]),
    projectsLength() {
      let length = Object.keys(this.get_projects()).length;
      console.log("length: ", length);
      return length;
    },
    pages() {
      let pages = Math.ceil(this.projectsLength / this.perPage);
      console.log("pages", pages);
      return pages;
    },
  },
  methods: {
    ...mapActions(["set_projects"]),
    remainingPerPage(page) {
      let remaining = this.perPage;
      console.log("page", page + 1, "this.pages", this.pages);
      if (page + 1 === this.pages) {
        console.log("entering page === this.pages");
        remaining =
          this.perPage - (this.perPage * this.pages - this.projectsLength);
      }
      console.log("remaining", remaining);
      return remaining;
    },
    getIndex(i, index) {
      let ind = i * this.perPage + index - 1;
      console.log("ind", ind);
      return ind;
    },
  },
  created() {
    this.set_projects();
  },
};
</script>

<style scoped lang="scss">
</style>