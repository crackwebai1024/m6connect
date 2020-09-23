<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="mx-auto" tile :class="{ 'on-hover': !hover }" @click="updateInfo()">
      <component v-bind:is="compData" :info="recordData" ></component>
    </v-card>
  </v-hover>
</template>

<script>
import { mapActions } from "vuex";
import globalDataApp from "../../store/data"

export default {
  name: "GeneralItem",
  data: () => ({
    compData:{}
  }),
  props: {
    recordData: Object,
  },
  methods: {
    ...mapActions("InfoModule", [
      "set_info_data",
      "change_preview_navigation_drawer",
    ]),
    ...mapActions("GeneralListModule", ["push_data_to_active"]),
    updateInfo() {
      this.push_data_to_active(this.recordData);
      this.change_preview_navigation_drawer(true);
    }
  },
  created(){
    this.compData = globalDataApp.records_widgets[this.recordData.app_type][0].component;
  }
};
</script>

<style lang="scss" scoped>
$card-team-line-height: 1rem;

.custom-line-height {
  line-height: $card-team-line-height;
}
.v-card {
  transition: opacity 0.4s ease-in-out;
}
.v-card:not(.on-hover) {
  opacity: 0.5;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
  background: transparent;
}
</style>