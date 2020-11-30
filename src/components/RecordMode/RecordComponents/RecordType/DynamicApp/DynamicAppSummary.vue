<template>
    <v-container class="py-5 d-flex flex-wrap relative justify-start white rounded card-custom-shadow panel-container">
        <div class="card-content__tag absolute red white--text d-flex justify-center align-center text-body-1 font-weight-regular">
          {{ info['prefix'] ? info['prefix'] : apps.filter(app => app.id === info['app_id'])[0]['prefix'] }}
        </div>
        <div class="d-flex">
          <v-row  no-gutters class="pl-5">
            <v-col cols="2">
              <v-img
                v-if="info.image"
                :alt="info.image" 
                class="rounded d-inline-block w-full" 
                max-height="100px"
                :src="info.image"
              />
              <v-img
                v-else-if="info.iconLink"
                :alt="info.iconLink" 
                class="rounded d-inline-block w-full" 
                max-height="100px"
                :src="info.iconLink"
              />

              <v-icon size="180" v-else class="d-inline-block">mdi-store</v-icon>
            </v-col>
            <v-col cols="10 px-5">
              <v-row>
                <v-col cols="12">
                  <p class="text-h5 font-weight-regular mt-1 mb-0">{{ info['title'] }} </p>
                </v-col>
                <v-col cols="12">
                  <span class=" text-h6 font-weight-regular mb-0">{{ info['record_number'] }}</span>
                </v-col>  
              </v-row>
            </v-col>
          </v-row>
        </div>
        <span class="text-h6 font-weight-regular mb-0 w-full pl-5 mt-4">{{ info['description'] }}</span>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
  },
  props: {
    info: {
        type: Object,
        default: {}
    },
  },
  name: "DynamicAppSummary",
  data: () => ({
  }),
  computed: {
    ...mapGetters('DynamicAppsModule', {
      apps: 'getApps'
    })
  },
  methods: {
  }
};
</script>