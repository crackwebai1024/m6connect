<template>
  <v-row class="d-flex justify-center ma-0 mb-2 pa-0 w-full">
    <v-col
      class="d-flex flex-column pa-0 pr-1"
      cols="5"
    >
      <slot name="leftPanel" />
    </v-col>
    <v-col
      class="pa-0 pl-1"
      cols="7"
    >
      <slot name="rightPanel" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'PanelTwoColumns',
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
}
</script>
