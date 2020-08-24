<template>
  <v-card class="pa-3" tile :height="info.height || 'inherit'">
    <v-row no-gutters class="fill-height" align="center" :justify="hasslot ? 'start' : 'center'">
      <div class="d-flex">
        <v-icon left>{{info.icon}}</v-icon>
        <div class=" text-lg-h6">{{ info.title }}</div>
      </div>
      <v-spacer v-if="hasslot"></v-spacer>
      <div v-if="hasslot">
        <slot name="select"></slot>
      </div>
    </v-row>
    <v-row>
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