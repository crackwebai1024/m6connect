<template>
  <v-container>
    <header-component hasslot :info="{title:'Create Post', icon:''}" class="mb-3">
      <template v-slot:select>
        <v-select
            :items="items"
            label="Solo field"
            dense
            solo
            ></v-select>
      </template>
      <template v-slot:input>
        <v-text-field
            height="37"
            label="Whats on your mind, Manuel"
            rounded
            dense
            v-model="searchText"
            single-line
            hide-details
            solo-inverted
        ></v-text-field>
      </template>
    </header-component>
    <div :key="index" v-for="(item, index) of projects" :class="Object.keys(projects).length !== index + 1 ? 'mb-3' : ''">
      <card-project-list :info="projects[index]" />          
    </div>            
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CardProjectList from "@/components/Home/CardProjectList";
import HeaderComponent from "@/components/Home/HeaderComponent";

export default {
  components: {
    CardProjectList,
    HeaderComponent,
  },
  name: "ProjectsList",
  data: () => ({
    perPage: 8,
    searchText: "",
    items:['Foo', 'Bar', 'Fizz', 'Buzz']
  }),
  computed: {
    ...mapGetters(["get_projects"]),
    projects() {
      return this.get_projects()
    }
  },
  methods: {
    ...mapActions(["set_projects"]),
    remainingPerPage(page) {
      let remaining = this.perPage;
      if (page + 1 === this.pages) {
        remaining =
          this.perPage - (this.perPage * this.pages - this.projectsLength);
      }
      return remaining;
    },
    getIndex(i, index) {
      let ind = i * this.perPage + index - 1;
      return ind;
    },
  },
  created() {
    this.set_projects();
  },
};
</script>

<style lang="scss">
.v-text-field .v-input__control {
  min-height: auto !important;
  display: flex !important;
  align-items: center !important;
}
.v-text-field .v-input__control .v-input__slot {
  min-height: auto !important;
  display: flex !important;
  align-items: center !important;
}
</style>