<template>
  <v-card
    class="hit mb-4"
    height="13rem"
    light
    width="19%"
  >
    <v-img
      class="bg-img"
      :src="hit.img"
    />
    <div class="d-flex details pa-3">
      <v-avatar
        class="flex-shrink-0"
        height="4rem"
        width="4rem"
      >
        <img :src="hit.logo">
      </v-avatar>
      <div class="d-flex flex-column pl-3">
        <!-- title  -->
        <span class="title">
          {{ hit.title }}
        </span>
        <span class="contact">{{ hit.website }}</span>
        <span class="contact">{{ hit.phone }}</span>
      </div>
      <v-btn
        absolute
        class="edit-btn"
        color="#fff"
        height="1.75rem"
        icon
        rounded
        width="1.75rem"
      >
        <v-icon :size="18">
          edit
        </v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  props: {
    hit: {
      type: Object,
      required: true
    }
  }
})
export default class SearchHitCard extends Vue {}
</script>

<style lang="sass" scoped>
.hit
  position: relative
  color: #fff

  .bg-img
    position: absolute
    top: 0
    bottom: 0
    right: 0
    left: 0

  .details
    position: absolute
    bottom: 0
    left: 0
    right: 0
    background-color: rgba(42, 77, 105, 0.73)

  .title
    font-size: 1.25rem
    font-weight: bold
    line-height: 1.4

  .contact
    font-size: 0.75rem
    line-height: 1.4

  .edit-btn
    bottom: 0.5rem
    right: 0.5rem
</style>
