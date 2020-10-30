<template>
    <div class="white py-3 px-4 mb-3">
        <h3 class="grey--text text--darken-3 spacing-tight font-weight-bold">{{ title }}</h3>
        <div class="overflow-hidden">
            <div class="d-flex align-center my-3" v-for="(item, index) in items" :key="'item-' + index">
                <v-icon class="grey--text text--darken-3" size="22">mdi-clipboard-file-outline</v-icon>
                <p class="ml-3 w-4/5 text-body-2 black--text mb-0">{{ item }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Locations'
    },
    items: {
      type: Array,
      default: () => ['Omaha, NE', 'El Paso, TX', 'Austin TX']
    }
  },
  data: () => ({
  }),
  name: "PanelDetails",
  computed: {
  },
  methods: {
  }
};
</script>

<style lang="scss">
</style>