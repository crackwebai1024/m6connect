<template>
  <v-app id="m6App">
    <v-content>
      <router-view :key="$route.path" />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  data: () => ({
    //
  })
})
</script>

<style lang="scss">
  @import '@/m6.scss';
</style>
