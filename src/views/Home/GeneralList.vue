<template>
  <v-container class="pa-0 grey lighten-2 pl-2" style="height: 100%;">
    <header-component hasslot :info="{title:'Create Post', icon:''}"  class="mb-3" style="height: auto;">
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
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="blue lighten-2"
          dark
          style="width:100%;"
          v-bind="attrs"
          v-on="on"
        >
          Do new Record
        </v-btn>
      </template>
      <new-record-dialog/>      
    </v-dialog>
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
import NewRecordDialog from "@/components/Home/Dialogs/NewRecordDialog";

export default {
  components: {
    GeneralItem,
    NewRecordDialog,
    HeaderComponent,
  },
  name: "GeneralList",
  data: () => ({
    perPage: 8,
    dialog: false,
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
    ...mapActions("ITAppsModule", ["get_it_apps","post_it_apps"]),

    remainingPerPage(page) {
      let remaining = this.perPage;
      if (page + 1 === this.pages) {
        remaining =
          this.perPage - (this.perPage * this.pages - this.recordsLength);
      }
      return remaining;
    },
    post(){
      this.post_it_apps({
        id:1,
        uid:"asda",
        record_type:"asda",
        record_name:"asd",
        company:"asd",
        description:"asd",
        created_at:new Date(),
        updated_at: new Date()
      });
    },
    getIndex(i, index) {
      let ind = i * this.perPage + index - 1;
      return ind;
    },
  },
  created() {
    this.get_it_apps();
    // this.load_mock_general_data();
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