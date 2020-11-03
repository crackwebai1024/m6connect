<template>
  <v-container
    class="pa-0"
    fill-height
    fluid
  >
    <v-layout fill-height>
      <v-flex
        v-if="!withoutAside"
        fill-height
        shrink
      >
        <v-layout fill-height>
          <v-card :color="asideColor">
            <h1
              class="display-2 ma-3 text-xs-center white--text"
              v-text="asideTitle"
            />

            <v-layout
              :style="`width: ${asideWidth}px`"
              wrap
            >
              <slot name="aside" />
            </v-layout>
          </v-card>
        </v-layout>
      </v-flex>

      <v-flex :style="`width: calc(100% - ${withoutAside ? 0 : asideWidth}px)`">
        <slot />
      </v-flex>
    </v-layout>

    <m6-loading :loading="loading" />
  </v-container>
</template>

<script>
export default {
  name: 'M6Show',

  props: {
    asideColor: {
      type: String,
      default: '#3374BD'
    },

    asideTitle: {
      type: [Number, String],
      default: ''
    },

    asideWidth: {
      type: [Number, String],
      default: 400
    },

    loading: {
      type: Boolean,
      default: false
    },

    withoutAside: {
      type: Boolean,
      default: false
    }
  }
}
</script>

