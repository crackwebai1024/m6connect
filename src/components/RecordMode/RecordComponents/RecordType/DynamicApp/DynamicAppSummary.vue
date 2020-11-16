<template>
    <v-container class="py-5 d-flex flex-wrap relative justify-start white rounded card-custom-shadow panel-container">
        <div class="card-content__tag absolute red white--text d-flex justify-center align-center text-body-1 font-weight-regular">
          {{ apps.filter(app => app.id === info['app_id'])[0]['title'] }}
        </div>
        <div class="d-flex">
          <div class="pl-5">
              <p class="text-h5 font-weight-regular mt-1 mb-0">{{ info['title'] }} </p>
              <span class="text-h6 font-weight-regular mb-0">{{ info['app_number'] }}</span><br>
          </div>
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