<template>
  <v-card tile :height="info.height || 'inherit'" class="pa-3">
    <v-row no-gutters class="fill-height" align="center" :justify="slot ? 'start' : 'center'">
      <div class="d-flex">
        <v-icon left>{{info.icon}}</v-icon>
        <div class="font-weight-black header-title">{{ info.title }}</div>
      </div>
      <v-spacer v-if="slot"></v-spacer>
      <div v-if="slot">
        <slot></slot>
      </div>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: "HeaderComponent",
  props: {
    info: Object,
    slot: {
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