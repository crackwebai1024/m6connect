<template>
  <v-container class="pa-0 d-flex flex-wrap">
    <header-component hasslot :info="{title:'Search All Companies', icon:''}"  
      class="max-w-tight mb-3 card-custom-shadow rounded w-full mx-auto h-auto">
      <template v-slot:select>
        <v-menu transition="slide-y-transition" offset-y bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="0" class="capitalize mb-0 px-0 pl-1 transparent purple--text text--darken-1 font-weight-bold" v-bind="attrs" v-on="on">
              {{ filterTypeText }}
              <v-icon class="blue--text text--darken-3">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="setTypeFilter(item.type)" v-for="(item, i) in areas" :key="i" v-if="item.type !== typeFilter">
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
    <panel-details-template
      :editPanel="true"
    >
      <div slot="header" class="max-w-lg pt-6 pb-4 w-full mx-auto d-flex justify-space-between align-center">
          <div class="d-flex align-center">
              <div class="grey lighten-3 pa-16">
                  <v-icon class="grey--text text--lighten-1" size="38">mdi-image-filter-hdr</v-icon>
              </div>
              <div class="ml-8">
                  <v-text-field class="font-weight-regular add-field grey lighten-3 pt-1 px-4 rounded-xl mb-1" label="Title">
                  </v-text-field>
                  <v-btn
                      elevation="0"
                      color="transparent"
                      class="blue--text capitalize px-1"
                  >
                      Add field
                  </v-btn>
              </div>
          </div>
      </div>
      <div slot="tabs" class="d-flex align-center">
          <v-tabs
              active-class="font-weight-black blue--text active-tab-company" 
          >
              <v-tab class="capitalize blue--text" v-for="(tab, index) in tabs" :key="'tabs-' + index">{{ tab }}</v-tab>
          </v-tabs>
          <v-btn
              icon
              class="green lighten-2 pa-0 white--text ml-6"
          >
              <v-icon size="23">mdi-plus</v-icon>
          </v-btn>
      </div>
      <div slot="btns" class="d-flex align-center">
          <v-btn
              elevation="0"
              class="grey capitalize lighten-2 grey--text text--darken-3 left-0 ml-3 pa-1 font-weight-black"
              light
          >
              <v-icon>mdi-magnify</v-icon>
          </v-btn>
      </div>
      <div slot="">

      </div>
    </panel-details-template>
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
import PanelDetailsTemplate from '@/views/Home/PanelDetailsTemplate'

export default {
  components: {
    CompanyItem,
    HeaderComponent,
    PanelDetailsTemplate
  },
  name: "CompaniesList",
  data: () => ({
    perPage: 8,
    searchInput: "",
    typeFilter: "all",
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    areas: [
      { text: "All Companies", type: "all" },
      { text: "Vendor", type: "Vendor" },
      { text: "Customer", type: "Customer" },
    ],
    tabs: ['Home'],
    newTabName: ''
  }),
  computed: {
    ...mapGetters("GeneralListModule", ["get_companies_list"]),
    companies() {
      return this.get_companies_list();
    },
    filteredCompanies() {
      return this.companies.filter((company) => {
        let indexFound = company.record_name.toUpperCase().trim().indexOf(this.searchInput.toUpperCase().trim()) !== -1
          || company.title.toUpperCase().trim().indexOf(this.searchInput.toUpperCase().trim()) !== -1
          || company.url.toUpperCase().trim().indexOf(this.searchInput.toUpperCase().trim()) !== -1

        let typeFound = true
        if(this.typeFilter !== "all") {
          typeFound = company.type.toUpperCase() === this.typeFilter.toUpperCase() ? true : false
        }
        return indexFound &&  typeFound
      })
    },
    filterTypeText() {
      return this.areas.filter((area) => {
        return area.type == this.typeFilter
      })[0].text
    }
  },
  methods: {
    ...mapActions("GeneralListModule", ["load_mock_companies_data"]),
    setTypeFilter(type) {
      this.typeFilter = type
    }
  },
  created() {
    this.load_mock_companies_data();
  },
};
</script>
