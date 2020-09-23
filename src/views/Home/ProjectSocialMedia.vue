<template>
  <v-container class="py-0 px-3" style="height: 100%;">
    <header-component class="mb-3 card-custom-shadow rounded" hasslot :info="{title:'Create Post', icon:''}" style="height: auto;">
      <template v-slot:select>
        <v-menu transition="slide-y-transition" offset-y bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="0" class="capitalize mb-0 px-0 pl-1 transparent purple--text text--darken-1 font-weight-bold" v-bind="attrs" v-on="on">
              Public
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
        <img :alt="user.name" class="mr-1 rounded-circle" width="40" height="40" :src="user.imgSrc">
        <v-text-field
          class="font-weight-bold ml-1"
          height="40"
          label="Whats on your mind, John?"
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
              <v-icon class="blue--text text--lighten-1">mdi-file-document-outline</v-icon>
              <v-icon class="lime--text text--darken-1 mx-1">mdi-image</v-icon>
              <v-icon class="red--text text--lighten-1">mdi-link-variant</v-icon>
            </v-row>
          </template>
        </v-text-field>
      </template>
    </header-component>
    <posts-list />
  </v-container>
</template>
<script>
import HeaderComponent from "@/components/Home/HeaderComponent";
import PostsList from "@/components/Home/SocialMedia/PostsList";
import { mapActions } from "vuex";

export default {
  name: "SocialMedia",
  components: {
    HeaderComponent,
    PostsList,
  },
  data: () => ({
    user: {
      name: 'John Doe',
      imgSrc: 'https://cdn.vuetifyjs.com/images/john.jpg'
    },
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
    searchText: "",
    // items:['Everyone', 'My Company', 'All My Teams', 'IT Team XY', 'CPM TeamZ', 'All My Departments', 'Finances', 'Operations'],
    items: [
      {
        text: "Everyone",
        value: "Everyone",
      },
      {
        text: "My posts",
        value: "author",
      },
      {
        text: "My Company",
        value: "company",
      },
    ],
    item: "Everyone",
    posts_list: [{}],
  }),
  methods: {
    ...mapActions("SocialNetworkModule", ["filter_posts"]),
  },
};
</script>
