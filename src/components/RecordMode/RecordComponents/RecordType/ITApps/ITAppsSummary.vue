<template>
    <v-container class="py-5 d-flex relative justify-start white rounded card-custom-shadow panel-container">
        <div class="card-content__tag absolute red white--text d-flex justify-center align-center text-body-1 font-weight-regular">
          {{ info['record_type'] }}
        </div>
        <div class="company-image pl-5">
            <img alt="" class="mt-2 rounded-circle" width="100" height="100" :src="info['record_image_url']">
        </div>
        <div class="pl-5">
            <p class="text-h5 font-weight-regular mb-1">{{ info['record_name'] }} {{ info['version'] }}</p>
            <ul class="list-items pl-0">
                <li class="font-weight-light text-body-2">{{ info['company'] }}</li>
                <li class="font-weight-light text-body-2">Status: {{ info['client_status'] }}</li>
                <li class="font-weight-light text-body-2">Version: {{ info['version'] }}</li>
                <li class="font-weight-light text-body-2">Software</li>
                <li class="font-weight-light text-body-2">N/A</li>
            </ul>
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
        right: 22px;
        top: 5px;
    }
}
</style>