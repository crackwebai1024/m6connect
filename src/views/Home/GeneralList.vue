<template>
  <v-container class="py-0 px-3" style="height: 100%;">
    <header-component hasslot :info="{title:'Search All Apps', icon:''}"  class="mb-3 card-custom-shadow rounded" style="height: auto;">
      <template v-slot:select>
        <v-menu transition="slide-y-transition" offset-y bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="0" class="capitalize mb-0 px-0 pl-1 transparent purple--text text--darken-1 font-weight-bold" v-bind="attrs" v-on="on">
              All Apps
              <v-icon class="blue--text text--darken-3">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item v-for="(item, i) in areas" :key="i" style="height: 15px;">
              <v-list-item-title
                :class="item.type == 'title' ? 'grey--text' : 'black--text'"
              >{{ item.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:input>
        <v-text-field
          class="font-weight-bold"
          height="40"
          label="Start Typing to Search"
          rounded
          flat
          dense
          @keyup.enter="filter_posts(['author', 1])"
          v-model="searchText"
          single-line
          hide-details
          solo-inverted
        >
          <template v-slot:append>
            <v-row class="d-flex align-center">
              <v-icon>mdi-magnify</v-icon>
            </v-row>
          </template>
        </v-text-field>
      </template>
    </header-component>
    <div
      :key="index"
      v-for="(item, index) of records"
      :class="Object.keys(records).length !== index + 1 ? 'mb-3' : ''"
    >
      <general-item :recordData="item" />
    </div>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import GeneralItem from "@/components/Home/GeneralItem";
import HeaderComponent from "@/components/Home/HeaderComponent";

export default {
  components: {
    GeneralItem,
    HeaderComponent,
  },
  name: "GeneralList",
  data: () => ({
    perPage: 8,
    searchText: "",
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    areas: [
      { text: "Everyone", type: "subtitle" },
      { text: "My company", type: "subtitle" },
      { text: "Teams", type: "title" },
      { text: "All my teams", type: "subtitle" },
      { text: "IT Team XY", type: "subtitle" },
      { text: "CPM Team Z", type: "subtitle" },
      { text: "Departments", type: "title" },
      { text: "All my departments", type: "subtitle" },
      { text: "Finances", type: "subtitle" },
      { text: "Operations", type: "subtitle" },
    ],
  }),
  computed: {
    ...mapGetters("GeneralListModule", ["get_general_list"]),
    records() {
      return this.get_general_list();
    },
  },
  methods: {
    ...mapActions("GeneralListModule", ["load_mock_general_data"]),
    remainingPerPage(page) {
      let remaining = this.perPage;
      if (page + 1 === this.pages) {
        remaining =
          this.perPage - (this.perPage * this.pages - this.recordsLength);
      }
      return remaining;
    },
    getIndex(i, index) {
      let ind = i * this.perPage + index - 1;
      return ind;
    },
  },
  created() {
    this.load_mock_general_data();
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