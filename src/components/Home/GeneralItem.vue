<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="mx-auto" tile :class="{ 'on-hover': hover }" @click="updateInfo()">
      <v-img class="white--text align-end" height="100px" :src="info['record_image_url']">
        <div class="px-3 py-1" style="position:absolute; top: 0; right: 0;">{{ info['phase'] }}</div>
      </v-img>
      <v-card-text class="text--primary py-1">
        <div class="d-flex flex-row flex-nowrap align-baseline">
          <div class="subtitle-1 font-weight-black">{{ info['record_name'] }}</div>
          <v-spacer></v-spacer>
          <div class="caption">
            <span class="font-weight-black">ID:</span>
            {{ info['uid'] }}
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
            <span class="font-weight-black">record Leader:</span>
            {{ info['record_leader'] || 'Not assigned' }}
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "GeneralItem",
  props: {
    info: Object,
  },
  methods: {
    ...mapActions("InfoModule", [
      "set_info_data",
      "change_preview_navigation_drawer",
    ]),
    ...mapActions("GeneralListModule", ["push_data_to_active"]),
    updateInfo() {
      this.push_data_to_active(this.info);
      this.change_preview_navigation_drawer(true);
    }
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