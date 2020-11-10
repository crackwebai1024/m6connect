<template>
  <div class="text-center">
    <v-dialog
      v-model="show"
      width="500"
    >
      <v-card>
        <v-card-title
          :class="'headline ' + color + ' lighten-2'"
          primary-title
          style="color: white;"
        >
          {{ title }}
        </v-card-title>

        <v-card-text>
          {{ text }}
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="$emit('close')"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script >
export default {
  props: {
    title: {
      required: true,
      default: ''
    },
    text: {
      required: true,
      default: ''
    },
    color: {
      default: 'gray'
    },
    show: {
      default: false
    }
  }
}
</script>
