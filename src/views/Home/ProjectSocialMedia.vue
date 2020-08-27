<template>
  <v-container>
    <header-component class="mb-4" hasslot :info="{title:'Create Post', icon:''}">
      <template v-slot:select>
        <!-- <v-select
          :items="items"
          label="Everyone"
          v-model="item"
          @change="filter_posts([item, 1])"
          dense
          flat
          push-tags
          solo
          hide-details
        ></v-select>-->
        <v-menu transition="slide-y-transition" offset-y bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text small color="primary" dark v-bind="attrs" v-on="on">
              Everyone
              <v-icon>mdi-menu-down</v-icon>
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
          height="37"
          label="Whats on your mind, Manuel?"
          rounded
          flat
          dense
          @keyup.enter="filter_posts(['author', 1])"
          v-model="searchText"
          single-line
          hide-details
          solo-inverted
        ></v-text-field>
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
