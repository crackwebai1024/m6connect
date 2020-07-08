<template>
  <div class="search-filter">
    <v-container fluid>
      <v-row justify="space-between px-2">
        <v-col>
          <h1 class="h1">
            M6Companies
          </h1>
          <p class="mb-0 subtitle-1">
            Lorem ipsum dolor sit amet consectetur.
          </p>
        </v-col>
        <v-col class="align-center d-flex justify-end">
          <search-dropdown />
          <layout-dropdown />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TheToolbar from '@toolbar/TheToolbar.vue'
import SearchDropdown from './SearchDropdown.vue'
import LayoutDropdown from './LayoutDropdown.vue'

@Component({
  components: {
    TheToolbar,
    SearchDropdown,
    LayoutDropdown
  }
})
export default class TheSearchFilter extends Vue {}
</script>

<style scoped lang="sass">
@import '@/css/_variables.sass'

.search-filter
  background: #fff
  color: $blue600
</style>
