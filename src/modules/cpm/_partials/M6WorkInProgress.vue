<template>
  <v-dialog
    v-model="showing"
    max-width="480"
    @input="closeModal"
  >
    <v-card color="#006699">
      <v-card-title>
        <span class="display-1 white--text">
          {{ title }}
        </span>
      </v-card-title>
      <v-card-text class="headline white--text">
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />

        <v-btn
          color="white"
          flat="flat"
          @click="closeModal"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'M6WorkInProgress',
  props: {
    title: {
      type: String,
      default: 'Coming soon...'
    },
    message: {
      type: String,
      default: 'We are working hard to give you a better experience'
    },
    show: {
      type: [Boolean, Number, String],
      required: true
    }
  },
  data() {
    return {
      showing: false
    }
  },
  watch: {
    show(v) {
      this.showing = v
    },

    showing(v) {
      if (!v) {
        this.closeModal()
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    }
  }
}
</script>
