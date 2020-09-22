<template>
  <v-container class="py-0 px-3" style="height: 100%;">
    <header-component hasslot :info="{title:'Search All Companies', icon:''}"  class="mb-3 card-custom-shadow rounded" style="height: auto;">
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
      v-for="(item, index) of companies"
      :class="Object.keys(companies).length !== index + 1 ? 'mb-3' : ''"
    >
      <company-item :companyData="item" />
    </div>
  </v-container>
</template>
<script>
// import { mapGetters, mapActions } from "vuex";
import CompanyItem from "@/components/Companies/CompanyItem";
import HeaderComponent from "@/components/Home/HeaderComponent";

export default {
  components: {
    CompanyItem,
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
    companies: [
      {
        title: "The Lorem Ipsum Co.",
        tagType: false,
        type: 'Vendor',
        email: "contact@sharp.com",
        phone: "(915) 445 - 1234",
        url: "www.sharphealthcare.co",
        tags: ['Veteran Owned','Economically Disadvantaged Women',' Women-Owned Small Business Joint Venture'],
        record_image_url: "https://picsum.photos/" + '1280' + "/" + '1280' + "?nocache=" + Math.random(),
      },
      {
        title: "Awesome Company X",
        tagType: true,
        type: 'Vendor',
        email: "contact@sharp.com",
        phone: "(915) 445 - 1234",
        url: "www.sharphealthcare.co",
        tags: ['Veteran Owned','Economically Disadvantaged Women',' Women-Owned Small Business Joint Venture'],
        record_image_url: "https://picsum.photos/" + '1280' + "/" + '1280' + "?nocache=" + Math.random(),
      },
      {
        title: "Nicest Customer Ever",
        tagType: true,
        type: 'Customer',
        email: "contact@sharp.com",
        phone: "(915) 445 - 1234",
        url: "www.sharphealthcare.co",
        tags: ['Veteran Owned','Economically Disadvantaged Women',' Women-Owned Small Business Joint Venture'],
        record_image_url: "https://picsum.photos/" + '1280' + "/" + '1280' + "?nocache=" + Math.random(),
      },
    ],
  }),
  computed: {
  },
  methods: {
  },
};
</script>