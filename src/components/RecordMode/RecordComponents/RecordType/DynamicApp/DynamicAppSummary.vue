<template>
  <v-container class="card-custom-shadow d-flex flex-wrap justify-start panel-container py-5 relative rounded white">
    <div
      v-show="info['prefix']"
      class="absolute align-center card-content__tag d-flex font-weight-regular justify-center red text-body-1 white--text"
    >
      {{ info['prefix'] ? info['prefix'] : apps.filter(app => app.id === info['app_id'])[0]['prefix'] }}
    </div>
    <div class="d-flex">
      <v-row
        class="pl-5"
        no-gutters
      >
        <v-col cols="2">
          <v-img
            v-if="info.image"
            :alt="info.image"
            class="d-inline-block rounded w-full"
            max-height="100px"
            :src="info.image"
          />
          <v-img
            v-else-if="info.iconLink"
            :alt="info.iconLink"
            class="d-inline-block rounded w-full"
            max-height="100px"
            :src="info.iconLink"
          />

          <v-icon
            v-else
            class="d-inline-block"
            size="100"
          >
            mdi-store
          </v-icon>
        </v-col>
        <v-col cols="10 px-5">
          <v-row>
            <v-col cols="12">
              <p class="font-weight-regular mb-0 mt-1 text-h5">
                {{ info['title'] }}
              </p>
            </v-col>
            <v-col cols="12">
              <span class="font-weight-regular mb-0 text-h6">{{ info['record_number'] }}</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <span class="font-weight-regular mb-0 mt-4 pl-5 text-h6 w-full">{{ info['description'] }}</span>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DynamicAppSummary',
  components: {
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters('DynamicAppsModule', {
      apps: 'getApps'
    })
  }
}
</script>
