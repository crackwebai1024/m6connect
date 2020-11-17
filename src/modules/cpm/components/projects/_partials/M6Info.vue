<template>
  <v-dialog
    persistent
    :value="true"
    :width="600"
  >
    <v-card>
      <v-card-title class="info title white--text">
        <v-row align="center">
          <v-col class="shrink">
            {{ title }}
          </v-col>
          <v-spacer />
          <v-col class="shrink">
            <v-icon
              light
              @click="close"
            >
              mdi-close
            </v-icon>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="vertical-scroll">
        <slot />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'M6Info',

  props: {
    title: {
      type: String,
      required: true
    }
  },

  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
