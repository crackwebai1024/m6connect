<template>
  <div class>
    <div>
      <drawer-navigator>
        <div style="width: 100%;">
          <div style="position: relative;">
            <v-img
              max-height="264"
              :src="!infoData.projecj_id ? infoData.imageUrl : infoData.projet_image_url"
            >
              <div
                class="m6-secondary-grey px-3 py-1"
                v-if="infoData.projecj_id"
                style="position:absolute; bottom: 0; right: 0;"
              >{{ infoData.phase }}</div>
            </v-img>
          </div>

          <div class="pa-3 m6-secondary-grey">
            <h2 class="font-weight-black text-center">
              <div>{{!infoData.projecj_id ? infoData.name : infoData.project_name}}</div>
            </h2>
            <div class="caption text-center font-weight-bold">
              <div>Project ID: {{!infoData.projecj_id ? infoData.contactPhone : infoData.projecj_id}}</div>
            </div>
          </div>
          <project />
        </div>
      </drawer-navigator>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Project from "@/components/Home/Info/Project";
import DrawerNavigator from "@/components/Home/DrawerNavigator";

export default {
  components: {
    Project,
    DrawerNavigator,
  },
  name: "ProjectInfo",
  computed: {
    ...mapGetters(["get_info_data"]),
    infoData() {
        let info = this.get_info_data()[this.stayColumn]
        console.log(info)
        return info
    }
  },
  props: {
    stayColumn: String,
  },
  methods: {
    printData() {
      console.log(this.stayColumn);
    },
  },
};
</script>