<template>
  <div class="px-5">
    <header-component :info="{ title:'Views', icon:'mdi-map-marker' }" />
    <v-row
      no-gutters
      align="center"
      justify="start icons-container flex-nowrap"
      style="overflow: scroll"
    >
      <div
        class="d-flex flex-column justify-center mr-3"
        :key="index"
        v-for="(item, index) of get_views_list()"
      >
        <div class="icon-box d-flex align-center justify-center border-1 rounded grey darken-3">
          <v-icon size="50">{{item.iconName}}</v-icon>
        </div>

        <div class="d-flex align-center justify-center pt-2 font-weight-bold">
          <div>{{item.name}}</div>
        </div>
      </div>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderComponent from "@/components/Home/HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
  },
  data: () => ({
    searchText: "",
  }),
  name: "ViewsList",
  computed: {
    // get_views_list has a list of objects with name, iconName, route
    ...mapGetters(["get_views_list"]),
  },
};
</script>

<style scoped lang="scss">
$icon-box: 80px;

.icon-box {
  width: $icon-box;
  height: $icon-box;
}

.icons-container {
  height: 150px;
}
</style>