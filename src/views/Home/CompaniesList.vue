<template>
  <v-container class="py-0 px-3 d-flex flex-wrap">
    <header-component hasslot :info="{title:'Search All Companies', icon:''}"  
      class="max-w-tight mb-3 card-custom-shadow rounded w-full mx-auto h-auto">
      <template v-slot:select>
        <v-menu transition="slide-y-transition" offset-y bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="0" class="capitalize mb-0 px-0 pl-1 transparent purple--text text--darken-1 font-weight-bold" v-bind="attrs" v-on="on">
              All Companies
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
          v-model="searchInput"
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
      :key="index + 'company'"
      v-for="(item, index) of filteredCompanies"
      class="w-half px-1"
    >
      <company-item :companyData="item" />
    </div>
    <div v-if="filteredCompanies.length === 0">No results found</div>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CompanyItem from "@/components/Companies/CompanyItem";
import HeaderComponent from "@/components/Home/HeaderComponent";

export default {
  components: {
    CompanyItem,
    HeaderComponent,
  },
  name: "CompaniesList",
  data: () => ({
    perPage: 8,
    searchInput: "",
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
    ...mapGetters("GeneralListModule", ["get_companies_list"]),
    companies() {
      return this.get_companies_list();
    },
    filteredCompanies() {
      return this.companies.filter((company) => {
            return company.record_name.toUpperCase().trim().indexOf(this.searchInput.toUpperCase().trim()) !== -1
              || company.title.toUpperCase().trim().indexOf(this.searchInput.toUpperCase().trim()) !== -1
              || company.url.toUpperCase().trim().indexOf(this.searchInput.toUpperCase().trim()) !== -1;            
      })
    }
  },
  methods: {
    ...mapActions("GeneralListModule", ["load_mock_companies_data"]),
  },
  created() {
    this.load_mock_companies_data();
  },
};
</script>
