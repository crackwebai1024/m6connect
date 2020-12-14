<template>
  <v-card class="elevation-0">
    <v-card-title class="headline">
      Delete {{ element }}
    </v-card-title>

    <v-card-text>
      Proceed
    </v-card-text>

    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="green darken-1"
        outline
        @click="res(false)"
      >
        Cancel
      </v-btn>
      <v-btn
        color="green darken-1"
        outline
        @click="res(true)"
      >
        Remove
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'DeleteDialog',
  props: {
    element: String
  },
  methods: {
    res(a) {
      this.$emit('closeDeleteModal', a)
    }
  }
}
</script>
