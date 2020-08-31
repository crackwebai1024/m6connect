<template>
  <div
    opacity="0"
    class="d-flex align-end"
    style="width: 100vw; height: 100vh; position: fixed; left:0; top: 0; pointer-events: none;"
  >
    <v-card tile width="100vw" height="85vh" class="transparent elevation-0">
      <v-row no-gutters class="fill-height">
        <v-col cols="3" class="py-0 px-1">
          <div
            class="white fill-height elevation-3"
            v-if="!active_previews[0] == false"
            style="pointer-events: auto;"
          >
            <preview-Selector style="pointer-events: auto;" :type="active_previews[0].record_type" :data="active_previews[0]"></preview-Selector>
          </div>
        </v-col>
        <v-col cols="3" class="py-0 px-1">
          <div
            class="white fill-height elevation-3"
            v-if="!active_previews[1] == false"
            style="pointer-events: auto;"
          >
            <preview-Selector style="pointer-events: auto;" :type="active_previews[1].record_type" :data="active_previews[1]"></preview-Selector>
          </div>
        </v-col>
        <v-col style="width: 90px; height: 100vh; position: fixed; top: 0; right: 0;" class="pb-3">
          <v-row
            no-gutters
            style="position: relative;"
            class="flex-column fill-height"
            align="center"
            justify="end"
          >
            <div
              v-for="(item, index) in idle_previews"
              class="mt-3 "
              style="position: relative; pointer-events: auto;"
              :key="index">
              <v-tooltip left transition="slide-x-reverse-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-avatar size="80"
                    @click="show_preview_of_idle(item)"
                    class="cursor-hover"
                    v-bind="attrs"
                    v-on="on">
                    <img :src="item[item['image_url_type']] || ''" alt="record_url" />
                  </v-avatar>
                </template>
                <span>{{item.record_name}}</span>
              </v-tooltip>
              <v-avatar
                size="30"
                class="pointer"
                color="grey lighten-1"
                style="position: absolute; top: 0; right: 0; z-index: 99; pointer-events: auto;"
                @click="removeFromIdle(item.uid)"
              >
                <v-icon color="white">mdi-close</v-icon>
              </v-avatar>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import PreviewSelector from "@/components/Shared/PreviewSelector";
import _ from "lodash";

// Store
import { mapActions, mapGetters } from "vuex";

export default {
  name: "general-overlay",
  components: {
    PreviewSelector,
  },
  methods: {
    ...mapActions("GeneralListModule", ["remove_from_idle", "show_preview_of_idle"]),
    removeFromIdle(id) {
      this.remove_from_idle(id);
    },
  },
  computed: {
    ...mapGetters("GeneralListModule", [
      "get_active_previews",
      "get_idle_previews",
    ]),
    active_previews() {
      let ap = this.get_active_previews();
      return ap;
    },
    idle_previews() {
      let ip = _.reverse(this.get_idle_previews());
      return ip;
    },
  },
};
</script>

<style scoped lang="scss">
</style>