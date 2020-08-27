<template>
  <v-card class="pa-3" tile :height="info.height || 'inherit'">
    <v-row no-gutters class="fill-height mb-3" align="center" justify="start">
      <!-- <v-icon left>{{info.icon}}</v-icon> -->
      <div class="caption">{{ info.title }}</div>
      <v-spacer></v-spacer>
      <slot v-if="hasslot" align="center" class="text-lg-h6" name="select"></slot>
    </v-row>
    <v-row class="mx-2">
      <slot name="input"></slot>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: "HeaderComponent",
  props: {
    info: Object,
    hasslot: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.header-title {
  font-size: 1.6em;
  line-height: 1;
}
</style>