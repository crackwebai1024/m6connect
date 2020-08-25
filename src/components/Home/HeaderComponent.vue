<template>
  <v-card class="pa-3" tile :height="info.height || 'inherit'">
    <v-row no-gutters class="fill-height" align="center" justify="start">
      <v-col cols="7" class="d-flex">
        <v-icon left>{{info.icon}}</v-icon>
        <div class=" text-lg-h6">{{ info.title }}</div>
      </v-col>
      <v-col cols="5" class="d-flex" v-if="hasslot">
        <slot align="center" class=" text-lg-h6" name="select"></slot>
      </v-col>
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