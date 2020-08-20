<template>
  <v-card class="mx-auto" tile>
    <v-img
      class="white--text align-end"
      height="130px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <div
        class="grey darken-4 px-3 py-1"
        style="position:absolute; top: 0; right: 0;"
      >{{ info['phase'] }}</div>
    </v-img>
    <v-card-text class="text--primary py-1">
      <div class="d-flex flex-row flex-nowrap align-baseline">
        <div class="subtitle-1 font-weight-black">{{ info['project_name'] }}</div>
        <v-spacer></v-spacer>
        <div>ID: {{ info['projecj_id'] }}</div>
      </div>
      <div class="caption">
        <div>Company: {{ info['company'] }}</div>
        <div>Department: {{ info['department'] }}</div>
        <div>Project Leader: {{ info['project_leader'] || 'Not assigned' }}</div>
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
</template>

<script>
export default {
  name: "CardProjectList",
  props: {
    // info has project_name, projecj_id, phase, company, department, project_leader,
    // project_support, designer, role_two, client_status, internal_description,
    // internal_objective, projet_image_url, client_original_request, client_requested_due_date,
    // client_in_take_clarification_description, client_follow_up_date
    info: Object,
  },
};
</script>

<style lang="scss" scoped>
</style>