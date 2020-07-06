<template>
  <div>
    <the-toolbar
      page-name="M6Companies"
    />
    this is the search module
  </div>
</template>

<script lang="ts">
import TheToolbar from '@toolbar/TheToolbar.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    TheToolbar
  }
})
export default class SearchIndex extends Vue {

}
</script>
