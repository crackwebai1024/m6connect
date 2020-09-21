<template>
    <v-container class="py-5 d-flex flex-wrap relative justify-start white rounded card-custom-shadow panel-container">
        <div class="card-content__tag absolute red white--text d-flex justify-center align-center text-body-1 font-weight-regular">
          {{ info['record_type'] }}
        </div>
        <div class="d-flex">
          <div class="company-image pl-5">
              <img alt="" class="mt-2 rounded-circle" width="100" height="100" :src="info['record_image_url']">
          </div>
          <div class="pl-5">
              <p class="text-h5 font-weight-regular mt-1 mb-0">{{ info['record_name'] }} {{ info['version'] }}</p>
              <span class="text-h6 font-weight-regular mb-0">{{ info['company'] }}</span><br>
              <span class="text-h6 font-weight-regular mb-1">Version: {{ info['version'] }}</span>
          </div>
        </div>
        <span class="text-h6 font-weight-regular mb-0 w-full pl-5 mt-4">{{ info['company'] }}</span>
        <span class="text-h6 font-weight-regular mb-1 w-full pl-5">Version: {{ info['version'] }}</span>
        <div class="w-full pl-5 mt-5 mb-2 d-flex align-center">
            <span class="text-body-2 font-weight-regular mb-0 mr-3">AKA</span>
            <div class="d-flex justify-center flex-wrap">
              <v-chip
                v-for="aka in info['aka']"
                :key="'aka-' + aka"
                class="mx-1 text-body-2"
                color="grey lighten-3"
              >
                {{ aka }}
              </v-chip>
            </div>
        </div>
        <div class="w-full pl-5 d-flex align-center">
            <span class="text-body-2 font-weight-regular mb-0 mr-3">FKA</span>
            <div class="d-flex justify-center flex-wrap">
              <v-chip
                v-for="fka in info['fka']"
                :key="'fka-' + fka"
                class="mx-1 text-body-2"
                color="grey lighten-3"
              >
                {{ fka }}
              </v-chip>
            </div>
        </div>
    </v-container>
</template>
<script>
export default {
  components: {
  },
  props: {
    info: Object,
  },
  name: "ITAppsSummary",
  data: () => ({
  }),
  computed: {
  },
  methods: {
  }
};
</script>

<style lang="scss">
.panel-container {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.list-items {
  list-style: none;
}
.company-image {
    position: relative;
    &:after {
        height: 22px;
        width: 22px;
        border-radius: 100%;
        background: #81DF06;
        bottom: 0;
        content: "";
        position: absolute;
        right: 2px;
        top: 13px;
    }
}
</style>