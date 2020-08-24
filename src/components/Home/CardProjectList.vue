<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="mx-auto" tile :class="{ 'on-hover': hover }" @click="updateInfo()">
      <v-img class="white--text align-end" height="100px" :src="info['projet_image_url']">
        <div
          class="px-3 py-1"
          style="position:absolute; top: 0; right: 0;"
        >{{ info['phase'] }}</div>
      </v-img>
      <v-card-text class="text--primary py-1">
        <div class="d-flex flex-row flex-nowrap align-baseline">
          <div class="subtitle-1 font-weight-black">{{ info['project_name'] }}</div>
          <v-spacer></v-spacer>
          <div class="caption">
            <span class="font-weight-black">ID:</span>
            {{ info['projecj_id'] }}
          </div>
        </div>
        <div class="caption custom-line-height">
          <div>
            <span class="font-weight-black">Company:</span>
            {{ info['company'] }}
          </div>
          <div>
            <span class="font-weight-black">Department:</span>
            {{ info['department'] }}
          </div>
          <div>
            <span class="font-weight-black">Project Leader:</span>
            {{ info['project_leader'] || 'Not assigned' }}
          </div>
        </div>
      </v-card-text>
      <!-- <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">{{info['department']}}</div>
        <v-list-item-title class="headline mb-1">{{info['project_name']}}</v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
      </v-list-item>-->
    </v-card>
  </v-hover>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CardProjectList",
  props: {
    // info has project_name, projecj_id, phase, company, department, project_leader,
    // project_support, designer, role_two, client_status, internal_description,
    // internal_objective, projet_image_url, client_original_request, client_requested_due_date,
    // client_in_take_clarification_description, client_follow_up_date
    info: Object,
  },
  methods: {
    ...mapActions(["set_info_data", "change_preview_navigation_drawer", "push_info_data_carousel"]),
    updateInfo() {
      this.change_preview_navigation_drawer(true);
      let data = {left: this.info, right: this.info}
      this.set_info_data(data);
      let validator = false;
      this.get_info_carousel().forEach(element => {
        if(element.projecj_id === this.info.projecj_id){
          validator = true;
        }
      });
      if(!validator){
        this.push_info_data_carousel(this.info);
      }
    },
  },
  computed: {
    ...mapGetters(["get_info_carousel"])
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
</style>