<template>
    <div class="mb-3 card-custom-shadow white rounded pa-10 relative">
      <div v-if="companyData['tagType']" :class="tagColor + 'card-content__tag absolute white--text d-flex justify-center align-center text-body-1 font-weight-regular'">
        {{ companyData['type'] }}
      </div>
      <div class="d-flex mb-6 align-center">
        <img alt="" class="mt-2 rounded-circle" width="80" height="80" :src="companyData['record_image_url']">
        <p class="ml-8 text-h5 font-weight-regular mt-1 mb-0">{{ companyData['title'] }}</p>
      </div>
      <v-row class="d-flex ma-0">
        <v-col cols="6" class="pa-0">
          <div class="d-flex align-center mb-2">
            <v-icon class="black--text" size="20">mdi-email-outline</v-icon>
            <p class="mb-0 ml-2 body-2">{{ companyData['email'] }}</p>
          </div>
          <div class="d-flex align-center mb-2">
            <v-icon class="black--text" size="20">mdi-earth</v-icon>
            <p class="mb-0 ml-2 body-2">{{ companyData['url'] }}</p>
          </div>
        </v-col>
        <v-col cols="6" class="pa-0">
          <div class="d-flex align-center mb-2">
            <v-icon class="black--text" size="20">mdi-phone</v-icon>
            <p class="mb-0 ml-2 body-2">{{ companyData['phone'] }}</p>
          </div>
        </v-col>
      </v-row>
      <div class="d-flex flex-wrap mt-2">
        <v-chip
        v-for="(tag, index) in companyData['tags']"
        :key="'tagcompany-' + index"
        class="my-1 mr-1 text-body-2"
        color="grey lighten-3"
        >
        {{ tag }}
        </v-chip>
      </div>
    </div>
</template>
<script>

export default {
  name: 'CompanyItem',
  props: {
    companyData: Object,
  },
  data: () => ({
  }),
  computed: {
    tagColor() {
      return this.companyData['type'] === 'Vendor' ? 'indigo ' : 'teal accent-3 ';
    }
  },
  methods: {
  },
};
</script>
