<template>
  <component
    :is="rootComponent"
    class="m6-card-dialog mb-2 card-custom-shadow white rounded"
    :class="{ 'ma-0': !dialog }"
    column
    fill-height
    fullscreen
    name="row"
    :value="dialog"
    @keydown.27="dialog = false"
  >
    <v-toolbar
      elevation="0"
      class="step3 font-weight-medium rounded-t"
      :color="'white'"
      dark
      :height="50"
      @dblclick="doubleClick"
    >
      <v-icon
        v-show="dialog"
        class="pointer grey--text text--darken-1"
        @click="dialog = false"
      >
        mdi-close
      </v-icon>

      <v-tooltip
        v-if="titleTooltip"
        right
      >
        <template v-slot:activator="{ on }">
          <span
            class="subheading"
            v-on="on"
          >
            {{ title }}
          </span>
        </template>

        <span class="grey lighten-3 rounded pa-1">{{ titleTooltip }}</span>
      </v-tooltip>

      <span
        v-else
        class="mb-0 subheading"
      >
        {{ title }}
      </span>

      <v-spacer />

      <slot name="after:title" />
    </v-toolbar>
    <v-divider class="grey lighten-3" />

    <v-card
      elevation="0"
      :style="{
        height: cardHeight
      }"
    >
      <v-card-text
        :class="`card-container ${cardTextClass}`"
        :style="{
          height: contentHeight,
          'min-height': minHeight,
          'max-height': maxHeight,
          overflow: 'auto'
        }"
      >
        <slot />
      </v-card-text>
    </v-card>
  </component>
</template>

<script>
export default {
  name: 'M6CardDialog',

  props: {
    cardTextClass: {
      type: String,
      default: ''
    },

    cardHeight: {
      type: String,
      default: '100%'
    },

    contentHeight: {
      type: String,
      default: 'auto'
    },

    expandable: {
      type: Boolean,
      default: true
    },

    maxHeight: {
      type: String,
      default: '98vh'
    },

    minHeight: {
      type: String,
      default: '200px'
    },

    titleTooltip: {
      type: [Number, String],
      default: ''
    },

    title: {
      type: String,
      default: ''
    },

    toolbarColor: {
      type: String,
      default: '#4caf50'
    },

    toolbarHeight: {
      type: [Number, String],
      default: '28px'
    }
  },

  data: () => ({
    dialog: false
  }),
  computed: {
    rootComponent() {
      return this.dialog ? 'v-dialog' : 'div'
    }
  },
  watch: {
    dialog() {
      this.$emit('fullscreen', this.dialog)
    }
  },
  methods: {
    doubleClick() {
      if (this.expandable) {
        this.dialog = !this.dialog
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.m6-card-dialog {
  .card-container {
    padding: 17px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .v-toolbar {
    transform: none !important;
  }
}
.subheading {
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
}
.vue-portal-target {
  display: flex;
}
</style>
