<template>
  <v-row class="pa-0 ma-0 mb-2 d-flex justify-center w-full">
    <v-col cols="5" class="pa-0 pr-1 d-flex flex-column justify-center">
      <slot name="leftPanel"/>
    </v-col>
    <v-col cols="7" class="pa-0 pl-1">
      <slot name="rightPanel"/>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "PanelTwoColumns",
  components: {
  },
  props: {
  },
  data: () => ({
  }),
  computed: {
  },
  methods: {
  }
};
</script>
