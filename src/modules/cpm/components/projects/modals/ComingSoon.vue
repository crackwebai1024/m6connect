<template>
  <v-dialog
    v-model="dialog"
    persistent
    width="500"
  >
    <v-card>
      <v-card-title
        class="blue headline lighten-2"
        primary-title
        style="color: white;"
      >
        Coming Soon
      </v-card-title>

      <v-card-text>
        This feature is on it's way
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="red"
          flat
          @click="$emit('close-dialog')"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['html', 'dialog']
}
</script>

<style type="scss" scoped>

</style>
