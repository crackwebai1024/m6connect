<template>
  <v-container class="pa-0 grey lighten-2 pl-2">
    <header-component hasslot :info="{title:'Create Post', icon:''}" class="mb-3">
      <template v-slot:select>
        <v-select
          :items="items"
          label="Everyone"
          dense
          flat
          push-tags
          solo
          hide-details
        ></v-select>
      </template>
      <template v-slot:input>
        <v-text-field
          height="37"
          label="Start typing to search"
          rounded
          flat
          dense
          v-model="searchText"
          single-line
          hide-details
          solo-inverted
        ></v-text-field>
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