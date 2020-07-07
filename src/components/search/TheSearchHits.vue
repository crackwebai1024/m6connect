<template>
  <div class="search-hits">
    <v-container
      class="d-flex flex-wrap mt-4"
      fluid
    >
      <div class="item-wrapper">
        <add-item-button />
      </div>
      <div
        v-for="n in 14"
        :key="n"
        class="item-wrapper mb-4"
      >
        <search-hit-card
          :hit="hit"
        />
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SearchHitCard from './SearchHitCard.vue'
import AddItemButton from './AddItemButton.vue'

@Component({
  components: {
    SearchHitCard,
    AddItemButton
  }
})
export default class TheSearchHits extends Vue {
  hit = {
    title: 'Title',
    website: 'Website',
    phone: 'Phone',
    img: './assets/imgs/img1.jpg',
    logo: './assets/imgs/logo1.jpg'
  }
}
</script>

<style scoped lang="sass">
@import '@/css/_variables.sass'

.search-hits
  background-color: $blue200

.item-wrapper
  width: 20%
  padding-right: 0.5rem
  padding-left: 0.5rem
</style>
