<template>
  <div class>
    <div>
      <div class="d-flex blue darken-1 white--text pl-3 pr-2 py-2">
        <div class="font-weight-black" style="font-size: 17px;">{{ infoData.project_name }}</div>
        <v-spacer></v-spacer>
        <v-icon color="white" size="18" class="px-2">mdi-window-minimize</v-icon>
        <v-icon color="white" class>mdi-arrow-expand</v-icon>
        <v-icon color="white" @click="remove">mdi-close</v-icon>
      </div>
      <div style="width: 100%;">
        <div style="position: relative;">
          <v-img
            max-height="120"
            :src="!infoData.projecj_id ? infoData.imageUrl : infoData.projet_image_url"
          >
            <div
              class="m6-secondary-grey white--text px-3 py-1"
              v-if="infoData.projecj_id"
              style="position:absolute; bottom: 0; right: 0;"
            >{{ infoData.phase }}</div>
          </v-img>
        </div>

        <div class="pa-3 m6-secondary-grey white--text">
          <h2 class="font-weight-black text-center">
            <div>{{!infoData.projecj_id ? infoData.name : infoData.project_name}}</div>
          </h2>
          <div class="caption text-center font-weight-bold">
            <div>Project ID: {{!infoData.projecj_id ? infoData.contactPhone : infoData.projecj_id}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  name: "ProjectInfo",
  computed: {
    ...mapGetters("ProjectsListModule", ["get_active_projects"]),
    infoData() {
      let info = this.get_active_projects()[this.projectIndex];
      return info;
    },
  },
  methods: {
    ...mapActions("ProjectsListModule", ["remove_from_active"]),
    remove() {
      this.remove_from_active(this.infoData.projecj_id);
    },
  },
  props: {
    projectIndex: Number,
  },
};
</script>