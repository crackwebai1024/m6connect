<template>
  <div class="search">
    <the-toolbar
      page-name="M6Connect"
    />
    <the-search-filter />
    <the-search-hits />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TheToolbar from '@toolbar/TheToolbar.vue'
import TheSearchFilter from '@search/Filter/TheSearchFilter.vue'
import TheSearchHits from '@search/TheSearchHits.vue'

@Component({
  components: {
    TheToolbar,
    TheSearchFilter,
    TheSearchHits
  }
})
export default class SearchIndex extends Vue {
}
</script>

<style scoped lang="sass">
@import '@/css/_variables.sass'

.search
  min-height: 100%
  background-color: $blue200
</style>
